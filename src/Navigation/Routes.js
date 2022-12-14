import React, { } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screen/Dashboard/Dashboard';
import OnboardingScreen from '../Screen/Onboarding/OnboardingScreen';
import OngoingDetails from '../Screen/Charging/OngoingDetails/OngoingDetails';
import TaxInvoice from '../Screen/Charging/TaxInvoice/TaxInvoice';
import routes from '../Utils/routes';
import Login from '../Screen/AuthScreen/Login';
import Signup from '../Screen/AuthScreen/Signup';
import Verification from '../Screen/AuthScreen/Verification';
import MobileVerification from '../Screen/AuthScreen/MobileVerification';
import RechargeWallet from '../Screen/Wallet/RechargeWallet';
import Profile from '../Screen/Other/Profile';
import EvModal from '../Screen/Other/EvModal/EvModal';
import AddEvModal from '../Screen/Other/EvModal/AddEvModal';
import SelectVehicle from '../Screen/Other/EvModal/SelectVehicle';
import Preference from '../Screen/Other/Preferences/Preference';
import Favoruite from '../Screen/Home/Favoruite';
import SearchLocation from '../Screen/Home/SearchLocation';
import ChargingStation from '../Screen/Home/ChargingStation';
import ChargingStationList from '../Screen/Home/ChargingStationList';
import Support from '../Screen/Other/Support/Support';
import ChangePassword from '../Screen/Other/ChangePassword';
import ReferAndEarn from '../Screen/Other/ReferAndEarn/ReferAndEarn';
import PaymentMethod from '../Screen/Other/PaymentMethod/PaymentMethod';
import Order from '../Screen/Other/Order/Order';
import ChargingKey from '../Screen/Other/ChargingKey/ChargingKey';
import Store from '../Screen/Other/Store/Store';
import OrderDetails from '../Screen/Other/Order/OrderDetails';
import FortumChargeAndDriveCard from '../Screen/Other/PaymentMethod/FortumChargeAndDriveCard';
import ActivateCard from '../Screen/Other/PaymentMethod/ActivateCard';
import CompleteKYC from '../Screen/Other/PaymentMethod/CompleteKYC';
import Passbook from '../Screen/Other/PaymentMethod/Passbook/Passbook';
import MyCart from '../Screen/Other/Store/MyCart';
import PaymentScreenJuspay from '../Screen/Juspay/PaymentScreenJuspay'
import StoreDetails from '../Screen/Other/Store/StoreDetails';
import MobileInput from '../Screen/AuthScreen/MobileInput'
import RechargeDone from '../Screen/Wallet/RechargeDone'
import PayInvoice from '../Screen/Charging/PayInvoice'
import ChargingKeyDetails from '../Screen/Other/ChargingKey/ChargingKeyDetails';
import FaqPage from '../Screen/Other/Support/FaqPage';
import DeliveryAddress from '../Screen/Other/DeliveryAddress'
import PayMinimum from '../Screen/Charging/PayMinimum';
import OrderPlaced from '../Screen/Other/Store/OrderPlaced'
import AddAddress from '../Screen/Other/AddAddress';
import CardDetails from '../Screen/Other/PaymentMethod/CardDetails'
import AddPinelabMoney from '../Screen/Other/PaymentMethod/AddPinelabMoney'
import Pinelab from '../Screen/Other/PaymentMethod/Pinelab'
import AddMoneyDone from '../Screen/Other/PaymentMethod/AddMoneyDone';
import OrderCard from '../Screen/Other/PaymentMethod/OrderCard';
import CardOrderConfirmed from '../Screen/Other/PaymentMethod/CardOrderConfimed'
import QrScanner from '../Screen/Home/QrScanner';
import KycDone from '../Screen/Other/PaymentMethod/KycDone';
import ReportPage from '../Screen/Other/Support/ReportPage';
import JoinHandsWith from '../Screen/Other/JoinHandsWith/JoinHandsWith';

const Stack = createNativeStackNavigator();

const Routes = ({ loggedin }) => {
  return (
    <Stack.Navigator initialRouteName={routes.dashboard} >
      <Stack.Screen name={routes.dashboard} component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name={routes.MobileInput} component={MobileInput} options={{ headerShown: false }} />
      <Stack.Screen name={routes.onboarding} component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name={routes.OngoingDetails} component={OngoingDetails} options={{ headerShown: false }} />
      <Stack.Screen name={routes.taxInvoice} component={TaxInvoice} options={{ headerShown: false }} />
      <Stack.Screen name={routes.login} component={Login} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Signup} component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Verification} component={Verification} options={{ headerShown: false }} />
      <Stack.Screen name={routes.MobileVerification} component={MobileVerification} options={{ headerShown: false }} />
      <Stack.Screen name={routes.RechargeWallet} component={RechargeWallet} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Profile} component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name={routes.EvModal} component={EvModal} options={{ headerShown: false }} />
      <Stack.Screen name={routes.AddEvModal} component={AddEvModal} options={{ headerShown: false }} />
      <Stack.Screen name={routes.SelectVehicle} component={SelectVehicle} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Preference} component={Preference} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Favoruite} component={Favoruite} options={{ headerShown: false }} />
      <Stack.Screen name={routes.SearchLocation} component={SearchLocation} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ChargingStation} component={ChargingStation} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ChargingStationList} component={ChargingStationList} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Support} component={Support} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ChangePassword} component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ReferAndEarn} component={ReferAndEarn} options={{ headerShown: false }} />
      <Stack.Screen name={routes.PaymentMethod} component={PaymentMethod} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Order} component={Order} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ChargingKey} component={ChargingKey} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Store} component={Store} options={{ headerShown: false }} />
      <Stack.Screen name={routes.OrderDetails} component={OrderDetails} options={{ headerShown: false }} />
      <Stack.Screen name={routes.FortumChargeAndDriveCard} component={FortumChargeAndDriveCard} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ActivateCard} component={ActivateCard} options={{ headerShown: false }} />
      <Stack.Screen name={routes.CompleteKYC} component={CompleteKYC} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Passbook} component={Passbook} options={{ headerShown: false }} />
      <Stack.Screen name={routes.MyCart} component={MyCart} options={{ headerShown: false }} />
      <Stack.Screen name={routes.PaymentScreenJuspay} component={PaymentScreenJuspay} options={{ headerShown: false }} />
      <Stack.Screen name={routes.StoreDetails} component={StoreDetails} options={{ headerShown: false }} />
      <Stack.Screen name={routes.RechargeDone} component={RechargeDone} options={{ headerShown: false }} />
      <Stack.Screen name={routes.PayInvoice} component={PayInvoice} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ChargingKeyDetails} component={ChargingKeyDetails} options={{ headerShown: false }} />
      <Stack.Screen name={routes.FaqPage} component={FaqPage} options={{ headerShown: false }} />
      <Stack.Screen name={routes.DeliveryAddress} component={DeliveryAddress} options={{ headerShown: false }} />
      <Stack.Screen name={routes.PayMinimum} component={PayMinimum} options={{ headerShown: false }} />
      <Stack.Screen name={routes.OrderPlaced} component={OrderPlaced} options={{ headerShown: false }} />
      <Stack.Screen name={routes.AddAddress} component={AddAddress} options={{ headerShown: false }} />
      <Stack.Screen name={routes.CardDetails} component={CardDetails} options={{ headerShown: false }} />
      <Stack.Screen name={routes.AddPinelabMoney} component={AddPinelabMoney} options={{ headerShown: false }} />
      <Stack.Screen name={routes.Pinelab} component={Pinelab} options={{ headerShown: false }} />
      <Stack.Screen name={routes.AddMoneyDone} component={AddMoneyDone} options={{ headerShown: false }} />
      <Stack.Screen name={routes.OrderCard} component={OrderCard} options={{ headerShown: false }} />
      <Stack.Screen name={routes.CardOrderConfirmed} component={CardOrderConfirmed} options={{ headerShown: false }} />
      <Stack.Screen name={routes.QrScanner} component={QrScanner} options={{ headerShown: false }} />
      <Stack.Screen name={routes.KycDone} component={KycDone} options={{ headerShown: false }} />
      <Stack.Screen name={routes.ReportPage} component={ReportPage} options={{ headerShown: false }} />
      <Stack.Screen name={routes.JoinHandsWith} component={JoinHandsWith} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};



export default Routes
