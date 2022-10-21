// import 'react-native-gesture-handler';
import React, {  } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screen/Dashboard/Dashboard';
import OnboardingScreen from '../Screen/Onboarding/OnboardingScreen';
import OngoingDetails from '../Screen/Charging/OngoingDetails/OngoingDetails';
import TaxInvoice from '../Screen/Charging/TaxInvoice/TaxInvoice';
import routes from '../Utils/routes';
import Login from '../Screen/AuthScreen/Login';
import Signup from '../Screen/AuthScreen/Signup';
import Verification from '../Screen/AuthScreen/Verification';
import RechargeWallet from '../Screen/Wallet/RechargeWallet';
import Profile from '../Screen/Other/Profile';
import EvModal from '../Screen/Other/EvModal/EvModal';
import AddEvModal from '../Screen/Other/EvModal/AddEvModal';
import SelectVehicle from '../Screen/Other/EvModal/SelectVehicle';
import Preference from '../Screen/Other/Preferences/Preference';



const Stack = createNativeStackNavigator();

const Routes = ({  }) => {
    return (
        <Stack.Navigator initialRouteName={routes.login} >
            <Stack.Screen name={routes.dashboard} component={Dashboard} options={{headerShown:false}}/>
           <Stack.Screen name={routes.onboarding} component={OnboardingScreen} options={{headerShown:false}}/>
           <Stack.Screen name={routes.OngoingDetails} component={OngoingDetails} options={{headerShown:false}}/>
           <Stack.Screen name={routes.taxInvoice} component={TaxInvoice} options={{headerShown:false}}/>
           <Stack.Screen name={routes.login} component={Login} options={{headerShown:false}}  />
           <Stack.Screen name={routes.Signup} component={Signup} options={{headerShown:false}}  />
           <Stack.Screen name={routes.Verification} component={Verification} options={{headerShown:false}}  />
           <Stack.Screen name={routes.RechargeWallet} component={RechargeWallet} options={{headerShown:false}}  />
           <Stack.Screen name={routes.Profile} component={Profile} options={{headerShown:false}}  />
           <Stack.Screen name={routes.EvModal} component={EvModal} options={{headerShown:false}}  />
           <Stack.Screen name={routes.AddEvModal} component={AddEvModal} options={{headerShown:false}}  />
           <Stack.Screen name={routes.SelectVehicle} component={SelectVehicle} options={{headerShown:false}}  />
           <Stack.Screen name={routes.Preference} component={Preference} options={{headerShown:false}}  />

        </Stack.Navigator>
    );
};



export default Routes
