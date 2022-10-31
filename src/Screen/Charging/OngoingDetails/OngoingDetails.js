import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../Component/Header/Header'
import colors from '../../../Utils/colors'
import CommonText from '../../../Component/Text/CommonText'
import Charger1 from '../../../assests/svg/charger1'
import IconCardWithoutBg from '../../../Component/Card/IconCardWithoutBg'
import IconCard from '../../../Component/Card/IconCard'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import routes from '../../../Utils/routes'
import { getChargerMapObject } from '../../../Utils/helperFuncations/ChargerMapConfig'
import ReportLight from "../../../assests/svg/Report_light"
import CommonCard from "../../../Component/Card/CommonCard"
import SupportLight from '../../../assests/svg/Support_light'
import DenseCard from "../../../Component/Card/DenseCard"
import SelectPaymentMode from '../../../Component/MajorComponents/SelectPaymentMode'
import { useSelector } from 'react-redux'

const OngoingDetails = ({ route }) => {

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const [paymentMethod, setPaymentMethod] = useState('')
  const [msg, setMsg] = useState('')
  const [goodToGo, setGoodToGo] = useState(false)

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
      <ScrollView>
        <View style={styles.innerContainer}>
          <Header showText={'Charging'} />

          <View style={styles.textCon}>
            <CommonText showText={locDetails?.name} customstyles={{ marginBottom: 7 }} regular fontSize={14} />
            <CommonText showText={`${locDetails?.address?.city} ${locDetails?.address?.street} ${locDetails?.address?.postalCode}`} bold />
          </View>

          <DenseCard>
            <View style={styles.topCard}>
              <Charger1 height={40} width={40} />
              <View>
                <CommonText
                  showText={getChargerMapObject(evDetails?.connectors[0]?.standard).name + ' - ' + (evDetails?.connectors[0]?.amperage * evDetails?.connectors[0]?.voltage / 1000).toFixed(2) + 'kW'}
                  fontSize={15}
                  customstyles={{ marginLeft: 10 }}
                  bold
                />
                <CommonText
                  showText={'₹ ' + parseFloat(evDetails?.connectors[0]?.pricing?.price).toFixed(2) + ' / ' + (evDetails?.connectors[0]?.pricing?.type === "TIME" ? "min" : evDetails?.connectors[0]?.pricing?.type === "FLAT" ? "flat" : "kWh+GST")}
                  fontSize={15}
                  customstyles={{ marginLeft: 10, marginTop: 5 }}
                  regular
                />
              </View>
            </View>
          </DenseCard>

          <DenseCard>
            <SelectPaymentMode
              min_balance={route.params?.evDetails?.connectors[0]?.pricing?.min_balance}
              addMoneyPress={() => navigation.navigate(routes.RechargeWallet, {
                routeDirection: "SelectPaymentMode",
                minBalance: route.params?.evDetails?.connectors[0]?.pricing?.min_balance,
                gstState: mUserDetails?.defaultState
              })}
              setPaymentMethod={setPaymentMethod}
              setMsg={setMsg}
              setGoodToGo={setGoodToGo}
            />
            {
              msg != '' &&
              <CommonText showText={msg} regular fontSize={13} customstyles={{ color: colors.red, textAlign: 'center', paddingHorizontal: 10 }} />
            }
          </DenseCard>




          <DenseCard>
            <View style={styles.middleCard}>
              <View style={styles.middleInner}>
                <CommonText showText={'Time'} fontSize={18} />
              </View>
              <View style={styles.timeContainer}>
                <View>
                  <DenseCard>
                    <CommonText showText={'12'} customstyles={{ textAlign: 'center' }} />
                  </DenseCard>
                  <CommonText showText={'  Hours'} />
                </View>
                <CommonText showText={':'} customstyles={{ marginTop: -25 }} fontSize={18} />
                <View>
                  <DenseCard>
                    <CommonText showText={'12'} customstyles={{ textAlign: 'center' }} />
                  </DenseCard>
                  <CommonText showText={' Minutes'} />
                </View>
                <View>
                  <CommonText showText={':'} customstyles={{ marginTop: -25 }} fontSize={18} />
                </View>
                <View>
                  <DenseCard>
                    <CommonText showText={'02'} customstyles={{ textAlign: 'center' }} />
                  </DenseCard>
                  <CommonText showText={' Seconds'} />
                </View>
              </View>
            </View>
          </DenseCard>


          <CommonCard>
            <TouchableOpacity style={styles.topCard}>
              <IconCardWithoutBg Svg={ReportLight} />
              <CommonText showText={'Report'} customstyles={{ color: colors.lightRed, alignSelf: 'center' }} />
            </TouchableOpacity>
          </CommonCard >

          <CommonCard>
            <TouchableOpacity style={styles.topCard}>
              <IconCard Svg={SupportLight} />
              <CommonText showText={'Support'} customstyles={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </CommonCard>

          <View style={styles.bottomButon}>
            <Button showText={'Stop'} onPress={stopButtonHandler} />
          </View>
        </View>
      </ScrollView>
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
    marginTop: 60,
    marginBottom: 20
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
  },
  topCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
})

export default OngoingDetails