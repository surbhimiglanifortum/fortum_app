import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
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

        <CommonCard>
          <TouchableOpacity onPress={fortumChargeCardHandler}>
            <CommonText customstyles={styles.highlightedText} showText={'New'} medium fontSize={12} />
            <View style={styles.card}>
              <View style={styles.card}>
                <IconCardLarge Svg={CardLight} />
                <View style={{ marginLeft: 10, flex: 0.9 }}>
                  <CommonText showText={'Fortum Charge & Drive Card'} fontSize={14} black />
                  <CommonText showText={'Activate your prepaid card'} fontSize={12} regular />
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
                  <CommonText showText={'Balance : ₹1400 '} fontSize={12} regular />
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