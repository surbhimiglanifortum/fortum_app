import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import Routes from './src/Navigation/Routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { enableLatestRenderer } from 'react-native-maps';
import { QueryClient, QueryClientProvider } from 'react-query'


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

  return (
    <>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
          <StatusBar />
          <NavigationContainer>
            {<Routes />}
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </>

  )
}
export default App;


