import { View, StyleSheet, TouchableOpacity, useColorScheme, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
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
import { useNavigation, useIsFocused } from '@react-navigation/native'
import routes from '../../Utils/routes'
import { useSelector, useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify'
import CommonView from '../../Component/CommonView'
import BackBtnTab from '../../Component/Button/BackBtnTab'
import ProfileSvg from '../../assests/svg/ProfileSvg'
import YouSavedModal from '../../Component/Modal/YouSavedModal'
import RatingModal from '../../Component/Modal/RatingModal'
import { getUserDetails } from '../../Services/Api'
import { AddToRedux } from '../../Redux/AddToRedux'
import * as Types from '../../Redux/Types'
import Header from '../../Component/Header/Header'

const Other = ({ setSelectedTab }) => {

  const userDetailsData = useSelector((state) => state.userTypeReducer)
  const scheme = useColorScheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const EditProfileHandler = () => {
    navigation.navigate(routes.Profile, { userDetailsData: userDetailsData })
  }

  const evModalHandler = () => {
    navigation.navigate(routes.EvModal)
  }

  const logoutHandler = async () => {
    await Auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: routes.dashboard }],
    });

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
  const backhandler = () => {
    setSelectedTab('home')
  }

  const userDetailsUpdated = async () => {
    const result = await getUserDetails()
    if (result.data) {
      dispatch(AddToRedux(result.data, Types.USERDETAILS))
    }
  }

  useEffect(() => {
    userDetailsUpdated()
  }, [isFocused])


  return (
    <CommonView >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Header showText={"More Settings"} onPress={backhandler} />
          <View style={styles.profileContainer}>
            {/* <TouchableOpacity style={[styles.imgContainer, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight, }]}>
              <ProfileSvg fill={scheme == 'dark' ? colors.darkIcon : colors.lightIcon} />
            </TouchableOpacity> */}

            {/* <View style={styles.leftConatainer}> */}
            {(userDetailsData?.userDetails?.first_name || userDetailsData?.userDetails?.first_name) && <CommonText showText={`${userDetailsData?.userDetails?.first_name} ${userDetailsData?.userDetails?.last_name}`} fontSize={18} semibold />}
            <TouchableOpacity style={[styles.editButton, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight, }]} onPress={EditProfileHandler} >
              <CommonText showText={'Edit Profile'} customstyles={styles.editText} />
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <View>
            {/* <SettingCard showText={'Ev Modals'} fontSize={15} Svg={ElectricCarSvg} onPress={evModalHandler} /> */}
            <SettingCard showText={'Store'} fontSize={15} Svg={StoreSvg} onPress={storeHandler} />
            {/* <SettingCard showText={'Charging Keys'} fontSize={15} Svg={ChargingSvg} onPress={chargingKeyHandler} /> */}
            <SettingCard showText={'Orders'} fontSize={15} Svg={OrderSvg} onPress={orderHandler} />
            <SettingCard showText={'Payment Method'} fontSize={15} Svg={PaymentSvg} onPress={paymentMethodHandler} />
            {/* <SettingCard showText={'Refer & Earn'} fontSize={15} Svg={ReferSvg} onPress={referandEarnHandler} /> */}
            {/* <SettingCard showText={'Change Password'} fontSize={15} Svg={PasswordSvg} onPress={changePasswordHandler} /> */}
            <SettingCard showText={'Support'} fontSize={15} Svg={HelpSvg} onPress={supportHandler} />
            {/* <SettingCard showText={'Preference'} fontSize={15} Svg={PrefrenceSvg} onPress={preferenceHandler} /> */}
            <SettingCard showText={'Logout'} fontSize={15} Svg={LogoutSvg} onPress={logoutHandler} />
          </View>
        </View>
      </ScrollView>
      {/* <YouSavedModal />
      <RatingModal /> */}
    </CommonView>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 12,
    justifyContent: 'space-between'
  },
  imgContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  leftConatainer: {
    marginLeft: 10
  },
  editButton: {
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderColor: colors.borderGreen,
    marginTop: 10,
    elevation: 5,
  },
  editText: {
    textAlign: 'center',
    fontSize: 14
  },
})

export default Other