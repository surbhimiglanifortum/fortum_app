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
import { getChargerMapObject } from '../../../Utils/helperFuncations/ChargerMapConfig'

const OngoingDetails = ({ route }) => {

  const navigation = useNavigation()
  const scheme = useColorScheme()
  const stopButtonHandler = () => {
    navigation.navigate(routes.taxInvoice)
  }

  const locDetails = route?.params?.locDetails
  const evDetails = route.params?.evDetails

  console.log("Check OnGoing Perameter", route.params?.evDetails)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        <Header showText={'Charging'} />
        <View style={styles.textCon}>
          <CommonText showText={locDetails?.name} />
          <CommonText showText={`${locDetails?.address?.city} ${locDetails?.address?.street} ${locDetails?.address?.postalCode}`} fontSize={14} />
        </View>
        <View style={styles.topCard}>
          <Charger1 />
          <CommonText
            showText={getChargerMapObject(evDetails?.connectors[0]?.standard).name + ' - ' + (evDetails?.connectors[0]?.amperage * evDetails?.connectors[0]?.voltage / 1000).toFixed(2) + 'kW\nPrice : Rs. ' + parseFloat(evDetails?.connectors[0]?.pricing?.price).toFixed(2) + '/' + (evDetails?.connectors[0]?.pricing?.type === "TIME" ? "min" : evDetails?.connectors[0]?.pricing?.type === "FLAT" ? "flat" : "kWh+GST")}
            fontSize={15}
            customstyles={{ marginLeft: 10 }}
          />
        </View>
        <View style={styles.middleCard}>
          <View style={styles.middleInner}>
            <CommonText showText={'Time'} fontSize={18} />
          </View>
          <View style={styles.timeContainer}>
            <View>
              <TimeTextinput showText={'12'} />
              <CommonText showText={'  Hours'} />
            </View>
            <View>
              <CommonText showText={':'} />
            </View>
            <View>
              <TimeTextinput showText={'12'} />
              <CommonText showText={' Minutes'} />
            </View>
            <View>
              <CommonText showText={':'} />
            </View>
            <View>
              <TimeTextinput showText={'02'} />
              <CommonText showText={' Seconds'} />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.topCard}>
          <IconCardWithoutBg Svg={ReportSvg} backgroundColor={colors.red} />
          <RedText showText={'Report'} fontSize={18} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topCard}>
          <IconCard Svg={SupportSvg} backgroundColor={colors.red} />
          <CommonText showText={'Support'} fontSize={18} margin={10} />
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
    alignItems: 'flex-start',
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
  bottomButon: {
    marginTop: 100
  }
})

export default OngoingDetails