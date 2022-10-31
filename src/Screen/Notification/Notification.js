import { View, Text, StyleSheet, ScrollView, SafeAreaView, } from 'react-native'
import React from 'react'
import Header from '../../Component/Header/Header'
import CommonText from '../../Component/Text/CommonText'
import colors from '../../Utils/colors'
import IconCardLarge from '../../Component/Card/IconCardLarge'
import StoreGreenSvg from '../../assests/svg/StoreGreenSvg'


const Notification = () => {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Header showText={'Notifications'} />

        {/* Card Container today */}
        <View style={styles.cardContainer}>
          <CommonText showText={'Today'} />
          <View style={styles.card}>
            <IconCardLarge Svg={StoreGreenSvg} />
            <View style={{ width: '85%' }}>
              <CommonText showText={'Notification 1'} fontSize={18} margin={10} />
              <CommonText showText={'Reach the charger and start charge your EV Real time '} fontSize={14} margin={10} />
            </View>
          </View>
        </View>

        {/* Card Container  */}
        <View style={styles.cardContainer}>
          <CommonText showText={'12/06/2022'} />
          <View style={styles.card}>
            <IconCardLarge Svg={StoreGreenSvg} />
            <View style={{ width: '85%' }}>
              <CommonText showText={'Notification 1'} fontSize={18} margin={10} />
              <CommonText showText={'Reach the charger and start charge your EV Real time '} fontSize={14} margin={10} />
            </View>
          </View>
        </View>
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
  cardContainer: {
    marginVertical: 30
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10
  },

})


export default Notification