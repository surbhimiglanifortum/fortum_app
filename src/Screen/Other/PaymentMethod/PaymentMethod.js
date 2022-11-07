import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import WalletSvg from '../../../assests/svg/wallet'
import Button from '../../../Component/Button/Button'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import routes from '../../../Utils/routes'
import CommonCard from '../../../Component/Card/CommonCard'
import WalletLight from '../../../assests/svg/Wallet_light'
import RupeeLight from '../../../assests/svg/Ruppe_light'
import CardLight from '../../../assests/svg/Card_light'

const PaymentMethod = () => {

  const navigation = useNavigation()
  const scheme = useColorScheme()
  const fortumChargeCardHandler = () => {
    navigation.navigate(routes.FortumChargeAndDriveCard)
  }
  const walletCardHandler = (tabName) => {
    console.log(tabName, '.................tab')
    navigation.navigate(routes.dashboard, { tabName })
  }
  const [tabName, setTabName] = useState('wallet')
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {/* <Header /> */}
          <Header showText={'Payment Method'} />

          <CommonText showText={'Tell us how you want to pay and then you are ready to start charging'} fontSize={14} regular customstyles={{ marginVertical: 20 }} />

          {/* Pay As you go card */}
          <CommonCard style={styles.card}>
            <View style={styles.card}>
              <IconCardLarge Svg={RupeeLight} />
              <CommonText showText={'Pay As You Go'} fontSize={15} />
            </View>
            <AntDesign name='right' color={colors.black} size={20} />
          </CommonCard>

          {/* Fortum charge card */}
          <CommonCard style={styles.card} onPress={fortumChargeCardHandler}>
            <View style={styles.card}>
              <IconCardLarge Svg={CardLight} />
              <View style={styles.middleContainer}>
                <CommonText showText={'Fortum Charge & Drive Card'} fontSize={15} />
                <CommonText showText={'Activate your prepaid card'} fontSize={12} />
              </View>
            </View>
            <AntDesign name='right' color={colors.black} size={20} />
          </CommonCard>

          {/* Wallet */}
          <CommonCard style={styles.card} onPress={() => { walletCardHandler(tabName) }}>
            <View style={styles.card}>
              <IconCardLarge Svg={WalletLight} />
              <View style={styles.middleContainer}>
                <CommonText showText={'Wallet'} fontSize={15} />
                <CommonText showText={'Balance : ₹1400 '} fontSize={15} />
              </View>
            </View>
            <AntDesign name='right' color={colors.black} size={20} />
          </CommonCard>
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
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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