import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar ,useColorScheme } from 'react-native';
import Routes from './src/Navigation/Routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {enableLatestRenderer} from 'react-native-maps';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/Utils/aws-exports'


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
  
  return (
    <>
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
    <StatusBar />
    <NavigationContainer>
      {<Routes />}
    </NavigationContainer>
    </PaperProvider>
    </>

  )
}
export default App;


