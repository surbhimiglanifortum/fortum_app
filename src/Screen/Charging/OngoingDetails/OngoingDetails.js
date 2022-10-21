import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../../Component/Header/Header'
import colors from '../../../Utils/colors'
import BlackText from '../../../Component/Text/BlackText'
import CommonText from '../../../Component/Text/CommonText'
import Charger1 from '../../../assests/svg/charger1'
import TimeTextinput from '../../../Component/Textinput/TimeTextinput'
import IconCardWithoutBg from '../../../Component/Card/IconCardWithoutBg'
import ReportSvg from '../../../assests/svg/ReportSvg'
import RedText from '../../../Component/Text/RedText'
import IconCard from '../../../Component/Card/IconCard'
import SupportSvg from '../../../assests/svg/SupportSvg'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import routes from '../../../Utils/routes'

const OngoingDetails = () => {
const navigation=useNavigation()
  const scheme = useColorScheme()
  const stopButtonHandler =()=>{
    navigation.navigate(routes.taxInvoice)
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        <Header showText={'Charging'} />
        <View style={styles.textCon}>
          <CommonText showText={'Restaurant'} fontSize={15} />
          <CommonText showText={'Annapoorna'} fontSize={20} />
        </View>
        <View style={styles.topCard}>
          <Charger1 />
          <View style={{ marginLeft: 5 }}>
            <BlackText showText={'Charger 1 - CCS-2'} fontSize={15} />
            <BlackText showText={`₹${"14 / 01 min"}`} fontSize={15} />
          </View>
        </View>
        <View style={styles.middleCard}>
          <View style={styles.middleInner}>
            <BlackText showText={'Time'} fontSize={18} />
          </View>
          <View style={styles.timeContainer}>
            <View>
              <TimeTextinput showText={'12'} />
              <BlackText showText={'  Hours'} />
            </View>
            <View>
              <BlackText showText={':'} />
            </View>
            <View>
              <TimeTextinput showText={'12'} />
              <BlackText showText={' Minutes'} />
            </View>
            <View>
              <BlackText showText={':'} />
            </View>
            <View>
              <TimeTextinput showText={'02'} />
              <BlackText showText={' Seconds'} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.topCard}>
          <IconCardWithoutBg Svg={ReportSvg} backgroundColor={colors.red} />
          <RedText showText={'Report'} fontSize={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topCard}>
          <IconCard Svg={SupportSvg} backgroundColor={colors.red} />
          <BlackText showText={'Support'} fontSize={18} margin={10} />
        </TouchableOpacity>
        <View style={styles.bottomButon}>
          <Button showText={'Stop'} onPress={stopButtonHandler} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15
  },
  textCon: {
    marginTop: 60
  },
  topCard: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  middleCard: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  middleInner: {
    alignSelf: 'center'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    marginVertical: 10
  },
  bottomButon:{
    marginTop:100
  }
})

export default OngoingDetails