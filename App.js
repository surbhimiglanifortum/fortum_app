import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import Routes from './src/Navigation/Routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { enableLatestRenderer } from 'react-native-maps';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/Utils/aws-exports'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Auth, Hub } from 'aws-amplify';

Amplify.configure(awsconfig)
const App = () => {

  const darkTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1A1A1A",
      accent: "#FAFAFA"
    },
  };

  const lightTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FAFAFA",
      accent: "#1A1A1A",
    },
  };

  const scheme = useColorScheme();
  enableLatestRenderer();

  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(true)
  const [loggedin, setloggedin] = useState(false)
  useEffect(() => {
    const loginCheck = async () => {
      try {
        const result = await Auth.currentAuthenticatedUser();
        console.log("login result ", result)
        if (result) {
          setloggedin(true)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }


    loginCheck()
  }, [])
  return (
    <>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
          <StatusBar />
          <NavigationContainer>
            {!loading && <Routes loggedin={loggedin} />}
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </>
  )
}
export default App;


