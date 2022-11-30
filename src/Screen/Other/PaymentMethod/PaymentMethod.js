import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import routes from '../../../Utils/routes'
import CommonCard from '../../../Component/Card/CommonCard'
import WalletLight from '../../../assests/svg/Wallet_light'
import RupeeLight from '../../../assests/svg/Ruppe_light'
import CardLight from '../../../assests/svg/Card_light'
import CommonView from '../../../Component/CommonView'
import { useSelector, useDispatch } from 'react-redux'
import { walletBalanceEnquiry, getUserDetails } from '../../../Services/Api'
import { AddToRedux } from '../../../Redux/AddToRedux'
import * as Types from '../../../Redux/Types'
import SettingCard from '../../../Component/Card/SettingCard'
import PaymentSvg from '../../../assests/svg/PaymentSvg'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'
import WalletSvg from '../../../assests/svg/wallet'
import RupeesSvg from '../../../assests/svg/RupeesSvg'

const PaymentMethod = () => {

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const navigation = useNavigation()
  const scheme = useColorScheme()
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const fortumChargeCardHandler = () => {
    if (mUserDetails?.pinelabs_account)
      navigation.navigate(routes.Pinelab)
    else
      navigation.navigate(routes.FortumChargeAndDriveCard)
  }

  const walletCardHandler = (tabName) => {
    console.log("Pressed Wallet")
    navigation.navigate(routes.RechargeWallet, { tabName })
  }

  const [tabName, setTabName] = useState('wallet')
  const [balance, setBalance] = useState('0')
  const [gstState, setGstState] = useState('')
  const [pinelabData, setPineLabData] = useState({})
  const [refreshing, setRefreshing] = useState(false)
  const [isAccount, setAccount] = useState()


  const getWalletBalance = async () => {
    setRefreshing(true)
    try {
      const result = await walletBalanceEnquiry({ username: mUserDetails?.username })
      setPineLabData(result.data?.response?.Cards[0])
      setRefreshing(false)
      return result.data?.response?.Cards[0].Balance
    } catch (error) {
      console.log("Response of pinelab wallet Balance Error", error)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    getDetails()
    getWalletBalance()
  }, [])

  useEffect(() => {
    getDetails()
    getWalletBalance()
  }, [isFocused])

  const getDetails = async () => {
    const result = await getUserDetails();
    if (result.data) {
      setBalance(result.data?.balance)
      dispatch(AddToRedux(result.data, Types.USERDETAILS))
    }
  }

  return (
    <CommonView>
      <ScrollView>

        <Header showText={'Payment Method'} />

        <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
          <CommonText showText={'Tell us how you want to pay and then you '} fontSize={16} regular customstyles={{}} />
          <CommonText showText={'are ready to start charging '} fontSize={16} regular customstyles={{}} />
        </View>

        <CommonCard>
          <TouchableOpacity>
            <View style={styles.card}>
              <View style={styles.card}>
                <CommonIconCard Svg={RupeesSvg} />
                <CommonText showText={'Pay As You Go'} fontSize={14} customstyles={{ marginLeft: 10, flex: 0.9 }} black />
              </View>
              <AntDesign name='right' color={scheme == 'dark' ? colors.white : colors.black} size={20} />
            </View>
          </TouchableOpacity>
        </CommonCard>

        {/* <SettingCard showText={'Pay As You Go'} Svg={RupeeLight} />
        <SettingCard showText={'Fortum Charge & Drive Card'} Svg={PaymentSvg} />
        <SettingCard showText={'Pay As You Go'} Svg={RupeeLight} /> */}

        <CommonCard>
          <TouchableOpacity onPress={fortumChargeCardHandler}>
            <CommonText customstyles={styles.highlightedText} showText={'New'} medium fontSize={12} />
            <View style={styles.card}>
              <View style={styles.card}>
                <CommonIconCard Svg={PaymentSvg} />
                <View style={{ marginLeft: 10, flex: 0.9 }}>
                  <CommonText showText={'Fortum Charge & Drive Card'} fontSize={14} black />
                  {
                    mUserDetails?.pinelabs_account ?
                      <CommonText showText={`Card Balance : ₹ ${pinelabData?.Balance || '0'}`} fontSize={12} regular /> :
                      <CommonText showText={'Activate your prepaid card'} fontSize={12} regular />
                  }
                </View>
              </View>
              <AntDesign name='right' color={scheme == 'dark' ? colors.white : colors.black} size={20} />
            </View>
          </TouchableOpacity>
        </CommonCard>

        <CommonCard>
          <TouchableOpacity onPress={() => { walletCardHandler(tabName) }}>
            <View style={styles.card}>
              <View style={styles.card}>
                <CommonIconCard Svg={WalletSvg} />
                <View style={{ marginLeft: 10, flex: 0.9 }}>
                  <CommonText showText={'Wallet'} fontSize={14} black />
                  <CommonText showText={`Balance : ₹ ${balance || '0'}`} fontSize={12} regular />
                </View>
              </View>
              <AntDesign name='right' color={scheme == 'dark' ? colors.white : colors.black} size={20} />
            </View>
          </TouchableOpacity>
        </CommonCard>

      </ScrollView>

      {/* <View style={styles.btnContainer}>
        <Button showText={'Add Payment Method'} />
      </View> */}
    </CommonView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    paddingHorizontal: 20
  },
  btnContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  highlightedText: {
    color: colors.white,
    backgroundColor: colors.highlightedBackground,
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -12,
    right: -12
  }
})

export default PaymentMethod