import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../Component/Header/Header'
import SettingCard from '../../Component/Card/SettingCard'
import ElectricCarSvg from '../../assests/svg/ElectricCarSvg'
import StoreSvg from '../../assests/svg/StoreSvg'
import ChargingSvg from '../../assests/svg/ChargingSvg'
import OrderSvg from '../../assests/svg/OrderSvg'
import PaymentSvg from '../../assests/svg/PaymentSvg'
import ReferSvg from '../../assests/svg/ReferSvg'
import PasswordSvg from '../../assests/svg/PasswordSvg'
import HelpSvg from '../../assests/svg/HelpSvg'
import PrefrenceSvg from '../../assests/svg/PrefrenceSvg'
import LogoutSvg from '../../assests/svg/LogoutSvg'
import colors from '../../Utils/colors'
import CommonText from '../../Component/Text/CommonText'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'
import { useSelector } from 'react-redux'
import CommonView from '../../Component/CommonView'
const Other = () => {
  const userDetailsData = useSelector((state) => state.userTypeReducer)
  console.log(userDetailsData, '.....................................redux data')
  const scheme = useColorScheme()
  const navigation = useNavigation()
  const EditProfileHandler = () => {
    navigation.navigate(routes.Profile,{userDetailsData:userDetailsData})
  }
  const evModalHandler = () => {
    navigation.navigate(routes.EvModal)
  }
  const logoutHandler = () => {
    navigation.navigate(routes.login)

  }
  const preferenceHandler = () => {
    navigation.navigate(routes.Preference)
  }
  const supportHandler = () => {
    navigation.navigate(routes.Support)
  }
  const changePasswordHandler = () => {
    navigation.navigate(routes.ChangePassword)
  }
  const referandEarnHandler = () => {
    navigation.navigate(routes.ReferAndEarn)
  }
  const paymentMethodHandler = () => {
    navigation.navigate(routes.PaymentMethod)
  }
  const orderHandler = () => {
    navigation.navigate(routes.Order)
  }
  const chargingKeyHandler = () => {
    navigation.navigate(routes.ChargingKey)
  }
  const storeHandler = () => {
    navigation.navigate(routes.Store)
  }

  return (
    <CommonView style={styles.conatainer}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <Header showText={'More Settings'} />
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.imgContainer}>
              <Image />
            </TouchableOpacity>
            <View style={styles.leftConatainer}>
             <CommonText showText={`${userDetailsData.userDetails.first_name} ${userDetailsData.userDetails.last_name
                }`} fontSize={20} /> 
              <TouchableOpacity style={styles.editButton} onPress={EditProfileHandler} >
                <CommonText showText={'Edit Profile'} fontSize={18} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <SettingCard showText={'Ev Modals'} fontSize={15} Svg={ElectricCarSvg} onPress={evModalHandler} />
            <SettingCard showText={'Store'} fontSize={15} Svg={StoreSvg} onPress={storeHandler} />
            <SettingCard showText={'Charging Keys'} fontSize={15} Svg={ChargingSvg} onPress={chargingKeyHandler} />
            <SettingCard showText={'Orders'} fontSize={15} Svg={OrderSvg} onPress={orderHandler} />
            <SettingCard showText={'Payment Method'} fontSize={15} Svg={PaymentSvg} onPress={paymentMethodHandler} />
            <SettingCard showText={'Refer & Earn'} fontSize={15} Svg={ReferSvg} onPress={referandEarnHandler} />
            <SettingCard showText={'Change Password'} fontSize={15} Svg={PasswordSvg} onPress={changePasswordHandler} />
            <SettingCard showText={'Support'} fontSize={15} Svg={HelpSvg} onPress={supportHandler} />
            <SettingCard showText={'Preference'} fontSize={15} Svg={PrefrenceSvg} onPress={preferenceHandler} />
            <SettingCard showText={'Logout'} fontSize={15} Svg={LogoutSvg} onPress={logoutHandler} />
          </View>
        </View>
      </ScrollView>
    </CommonView>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50
  },
  imgContainer: {
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: colors.white
  },
  leftConatainer: {
    marginLeft: 10
  },
  editButton: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: colors.white,
    borderColor: colors.green,
    marginTop: 10,
    elevation: 5
  }
})

export default Other