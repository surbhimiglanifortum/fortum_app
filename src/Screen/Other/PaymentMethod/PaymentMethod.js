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
import { useSelector } from 'react-redux'
import { walletBalanceEnquiry, getUserDetails } from '../../../Services/Api'
import SettingCard from '../../../Component/Card/SettingCard'
import PaymentSvg from '../../../assests/svg/PaymentSvg'

const PaymentMethod = () => {

  const navigation = useNavigation()
  const scheme = useColorScheme()
  const isFocused = useIsFocused()

  const fortumChargeCardHandler = () => {
    navigation.navigate(routes.FortumChargeAndDriveCard)
  }

  const walletCardHandler = (tabName) => {
    navigation.navigate(routes.dashboard, { tabName })
  }

  const [tabName, setTabName] = useState('wallet')
  const [balance, setBalance] = useState('0')
  const [gstState, setGstState] = useState('')
  const [pinelabData, setPineLabData] = useState({})
  const [refreshing, setRefreshing] = useState(false)

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const getWalletBalance = async () => {
    setRefreshing(true)
    try {
      const result = await walletBalanceEnquiry({ username: mUserDetails?.username })
      console.log("Response of pinelab wallet Balance", result.data?.response?.Cards[0].Balance)
      setPineLabData(result.data?.response?.Cards[0])
      setRefreshing(false)
      return result.data?.response?.Cards[0].Balance
    } catch (error) {
      console.log("Response of pinelab wallet Balance", error)
      setRefreshing(false)
    }
  }

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

        <CommonText showText={'Tell us how you want to pay and then you are ready to start charging'} fontSize={14} regular customstyles={{ marginVertical: 20 }} />

        <CommonCard>
          <TouchableOpacity>
            <View style={styles.card}>
              <View style={styles.card}>
                <IconCardLarge Svg={RupeeLight} />
                <CommonText showText={'Pay As You Go'} fontSize={14} customstyles={{ marginLeft: 10, flex: 0.9 }} black />
              </View>
              <AntDesign name='right' color={colors.black} size={20} />
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
                <IconCardLarge Svg={CardLight} />
                <View style={{ marginLeft: 10, flex: 0.9 }}>
                  <CommonText showText={'Fortum Charge & Drive Card'} fontSize={14} black />
                  {
                    !mUserDetails?.pinelab_account ?
                      <CommonText showText={'Activate your prepaid card'} fontSize={12} regular /> :
                      <CommonText showText={`Card Balance : ₹ ${pinelabData?.Balance}`} fontSize={12} regular />
                  }
                </View>
              </View>
              <AntDesign name='right' color={colors.black} size={20} />
            </View>
          </TouchableOpacity>
        </CommonCard>

        <CommonCard onPress={() => { walletCardHandler(tabName) }}>
          <TouchableOpacity>
            <View style={styles.card}>
              <View style={styles.card}>
                <IconCardLarge Svg={WalletLight} />
                <View style={{ marginLeft: 10, flex: 0.9 }}>
                  <CommonText showText={'Wallet'} fontSize={14} black />
                  <CommonText showText={`Balance : ₹ ${balance}`} fontSize={12} regular />
                </View>
              </View>
              <AntDesign name='right' color={colors.black} size={20} />
            </View>
          </TouchableOpacity>
        </CommonCard>

      </ScrollView>

      <View style={styles.btnContainer}>
        <Button showText={'Add Payment Method'} />
      </View>
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