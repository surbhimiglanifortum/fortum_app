import { View, Text, useColorScheme, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import AddButton from '../../Component/Button/AddButton'
import AddMoneyButton from '../../Component/Button/AddMoneyButton'
import Button from '../../Component/Button/Button'
import WhiteButton from '../../Component/Button/WhiteButton'
import Slider from '@react-native-community/slider';
import CommonText from '../../Component/Text/CommonText'
const RechargeWallet = () => {

  const scheme = useColorScheme()
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        <Header showText={'Wallet Recharge'} />
        <View style={styles.card}>
          <View style={styles.innerCard}>
            <AddButton backgroundColor={colors.white} iconName={'minus'} color={colors.black} />
            <CommonText showText={'₹50'} fontSize={25} />
            <AddButton backgroundColor={colors.greenBackground} iconName={'plus'} color={colors.white} />
          </View>
          <View>
          <Slider
            style={{ width: '100%', height: 60 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={colors.green}
            maximumTrackTintColor="#000000"
          />
          </View>
        </View>

        <View style={styles.moneyButton}>
          {
            [1, 1, 1, 1, 1, 1, 1, 1].map((item, ind) => {
              return (
                <AddMoneyButton backgroundColor={colors.white} showText={'₹50'} fontSize={20} />
              )
            })
          }
          {/* <AddMoneyButton backgroundColor={colors.white} showText={'₹100'} fontSize={20}/>
          <AddMoneyButton backgroundColor={colors.white}  showText={'₹50'} fontSize={20}/>
          <AddMoneyButton backgroundColor={colors.white}  showText={'₹50'} fontSize={20}/>
          <AddMoneyButton backgroundColor={colors.white} showText={'₹50'} fontSize={20} />
          <AddMoneyButton backgroundColor={colors.white}  showText={'₹50'} fontSize={20}/>
          <AddMoneyButton backgroundColor={colors.white}  showText={'₹50'} fontSize={20}/>
          <AddMoneyButton backgroundColor={colors.white} showText={'₹50'} fontSize={20} /> */}
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <WhiteButton backgroundColor={colors.white} showText={'Cancel'} color={colors.black} />
          </View>
          <View style={styles.buttonInner}>
            <Button backgroundColor={colors.white} showText={'Recharge'} color={colors.white} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20
  },
  card: {
    // borderWidth: 1,
    backgroundColor: colors.white,
    // justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,

  },
  innerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:10
  },
  moneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 25
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 280
    // position:'absolute',
  },
  buttonInner: { width: '47%' },


})

export default RechargeWallet