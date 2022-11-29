import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, NativeEventEmitter, NativeModules } from 'react-native';
import Routes from './src/Navigation/Routes';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { enableLatestRenderer } from 'react-native-maps';
import { Amplify, Auth, Hub } from 'aws-amplify'
import awsconfig from './src/Utils/aws-exports'
import { QueryClient, QueryClientProvider } from 'react-query'
import SnackContext from './src/Utils/context/SnackbarContext';
import colors from './src/Utils/colors';
import CommonModal from './src/Component/Modal/CommonModal';
import { configureStore, persistor } from "./src/Redux/store";
import { Provider, connect, ReactReduxContext } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import HyperSdkReact from 'hyper-sdk-react';
import RatingModal from './src/Component/Modal/RatingModal'
import YouSavedModal from './src/Component/Modal/YouSavedModal'


Amplify.configure(awsconfig)

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

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
  console.log(scheme,'....................schememmeemmeemm')
  enableLatestRenderer();

  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(true)
  const [loggedin, setloggedin] = useState(false)
  const [openCommonModal, setOpenCommonModal] = useState({ isVisible: false, message: "" })
  const [showFeedBackModal, setShowFeedbackModel] = useState({ "isVisible": false, "locid": "", "evseid": "", onPress: () => { } })
  const [showYouSavedkModal, setShowYouSavedModel] = useState({ "isVisible": false, "locid": "", "evseid": "", onPress: () => { } })

  useEffect(() => {
    const loginCheck = async () => {
      try {
        const result = await Auth.currentAuthenticatedUser();
        if (result.signInUserSession) {
          setloggedin(true)
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    loginCheck()
  }, [])

  useEffect(() => {
    const initiate_payload = {
      requestId: uuidv4(),
      service: 'in.juspay.hyperpay',
      payload: {
        action: 'initiate',
        merchantId: 'fortum',
        clientId: 'fortum',
        environment: 'production',
      },
    };
    HyperSdkReact.createHyperServices();
    HyperSdkReact.initiate(JSON.stringify(initiate_payload));
  }, [])

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);
    const eventListener = eventEmitter.addListener('HyperEvent', resp => {
      const data = JSON.parse(resp);
      const event = data.event || '';
      switch (event) {
        case 'initiate_result':
          console.log('Initiate result', data);
          break;
        default:
          console.log('Initiate default result', data);
      }
    });
    return () => {
      eventListener.remove();
    };
  }, []);

  const [currentLocation, setCurrentLocation] = useState({})
  const [mLocationsPayload, mSetLocationsPayload] = useState({ onlyAvailableConnectors: false })

  return (
    <>
      <SnackContext.Provider value={{ currentLocation, setCurrentLocation, mLocationsPayload, mSetLocationsPayload, setOpenCommonModal, openCommonModal, setShowFeedbackModel, showYouSavedkModal, setShowYouSavedModel }}>
        <Provider store={configureStore}>
          <PersistGate persistor={persistor} loading={null}>
            <QueryClientProvider client={queryClient} contextSharing={true}>
              <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
                <StatusBar backgroundColor={scheme === 'dark' ? colors.backgroundDark : colors.lightBackGround} barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
                <NavigationContainer>
                  <RatingModal isModalVisible={showFeedBackModal} setShowFeedbackModel={setShowFeedbackModel} />
                  <YouSavedModal openYouSavedModal={showYouSavedkModal} setOpenYouSavedModal={setShowYouSavedModel} />

                  {!loading && <Routes loggedin={loggedin} />}

                </NavigationContainer>
              </PaperProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>

      </SnackContext.Provider>
      <CommonModal openCommonModal={openCommonModal} setOpenCommonModal={setOpenCommonModal} />
    </>
  )
}

export default App;