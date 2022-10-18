// import 'react-native-gesture-handler';
import React, {  } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screen/Dashboard/Dashboard';
import OnboardingScreen from '../Screen/Onboarding/OnboardingScreen';
import OngoingDetails from '../Screen/Charging/OngoingDetails/OngoingDetails';
import TaxInvoice from '../Screen/Charging/TaxInvoice/TaxInvoice';
import routes from '../Utils/routes';



const Stack = createNativeStackNavigator();

const Routes = ({  }) => {
    return (
        <Stack.Navigator >
           
            <Stack.Screen name={routes.dashboard} component={Dashboard} options={{headerShown:false}}/>
           <Stack.Screen name={routes.onboarding} component={OnboardingScreen} options={{headerShown:false}}/>
           <Stack.Screen name='OngoingDeatils' component={OngoingDetails} options={{headerShown:true}}/>
           <Stack.Screen name={routes.taxInvoice} component={TaxInvoice} options={{headerShown:false}}/>

            

        </Stack.Navigator>
    );
};



export default Routes
