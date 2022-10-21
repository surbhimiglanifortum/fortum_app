import { View, Text, StyleSheet, ScrollView, SafeAreaView, useColorScheme } from 'react-native'
import React from 'react'
import Header from '../../Component/Header/Header'
import CommonText from '../../Component/Text/CommonText'
import BlackText from '../../Component/Text/BlackText'
import Card from '../../Component/Card/Card'
import WalletCard from '../../Component/Card/WalletCard'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'
import Charger from '../../assests/svg/charger'

const Wallet = () => {
  const scheme = useColorScheme()
  const navigation=useNavigation()
const RechargeButtonHandler=()=>{
navigation.navigate(routes.RechargeWallet)
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Header showText={'Wallet'} />
        <ScrollView>
          {/* card */}
          <WalletCard onPress={RechargeButtonHandler} />
          <View style={styles.text}>
            {scheme == 'dark' ? <CommonText showText={'Transcation History'} fontSize={15} /> : <BlackText showText={'Transcation History'} fontSize={15} />}
          </View>
          {
            [1, 1, 1, 1, 1, 1, 1, , 1].map((item, i) => {
              return (
                <Card Svg={Charger} />
              )
            })
          }
        </ScrollView>
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
  text: {
    marginVertical: 15
  }
})

export default Wallet