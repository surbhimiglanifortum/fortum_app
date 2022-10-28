import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import SettingCard from '../../../Component/Card/SettingCard'
import WalletSvg from '../../../assests/svg/wallet'
import Button from '../../../Component/Button/Button'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BlackText from '../../../Component/Text/BlackText'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import routes from '../../../Utils/routes'
const PaymentMethod = () => {

  const navigation = useNavigation()
  const scheme = useColorScheme()
  const fortumChargeCardHandler = () => {
    navigation.navigate(routes.FortumChargeAndDriveCard)
  }
  const walletCardHandler = (tabName) => {
    console.log(tabName, '.................tab')
    navigation.navigate(routes.dashboard, {tabName})
  }
  const [tabName, setTabName] = useState('wallet')
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {/* <Header /> */}
          <Header showText={'Payment Method'} />
          <View style={styles.headerText}>
            <CommonText showText={'Tell us how you want to pay and then you are ready to start charging'} fontSize={15} />
          </View>
          {/* Pay As you go card */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.leftContainer}>
              <IconCardLarge Svg={WalletSvg} />
              <View style={styles.middleContainer}>
                <BlackText showText={'Pay As You Go'} fontSize={15} />

              </View>
            </View>
            <AntDesign name='right' color={colors.black} size={20} />
          </TouchableOpacity>

          {/* Fortum charge card */}
          <TouchableOpacity style={styles.card} onPress={fortumChargeCardHandler}>
            <View style={styles.leftContainer}>
              <IconCardLarge Svg={WalletSvg} />
              <View style={styles.middleContainer}>
                <BlackText showText={'Fortum Charge & Drive Card'} fontSize={15} />
                <BlackText showText={'Activate your prepaid card'} fontSize={12} />
              </View>
            </View>
            <AntDesign name='right' color={colors.black} size={20} />
          </TouchableOpacity>

          {/* Wallet */}
          <TouchableOpacity style={styles.card} onPress={() => { walletCardHandler(tabName) }}>
            <View style={styles.leftContainer}>
              <IconCardLarge Svg={WalletSvg} />
              <View style={styles.middleContainer}>
                <BlackText showText={'Wallet'} fontSize={15} />
                <BlackText showText={'Balance : ₹1400 '} fontSize={15} />
              </View>
            </View>
            <AntDesign name='right' color={colors.black} size={20} />
          </TouchableOpacity>



        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button showText={'Add Payment Method'} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 20

  },
  headerText: {
    marginVertical: 25,

  },
  btnContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15
  }, card: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.05,
    elevation: 4,
    marginVertical: 5,
    backgroundColor: '#FFF',
    marginVertical: 10
  },
  leftContainer: { flexDirection: 'row', alignItems: 'center' },
  middleContainer: { marginLeft: 15 },
  deleteIcon: {
    elevation: 10,
    backgroundColor: '#FFF', paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
})

export default PaymentMethod