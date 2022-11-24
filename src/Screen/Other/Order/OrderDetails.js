import { View, SafeAreaView, StyleSheet, useColorScheme, Image, } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import DenseCard from '../../../Component/Card/DenseCard/index'
import IconCard from '../../../Component/Card/IconCard'
import OrderGreenSvg from '../../../assests/svg/OrderGreenSvg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import StoreGreenSvg from '../../../assests/svg/StoreGreenSvg'
import WhiteButton from '../../../Component/Button/WhiteButton'
import Button from '../../../Component/Button/Button'
import { GetFormatedDate, GetFormatedDateOnly } from '../../../Utils/utils'
import { scale } from 'react-native-size-matters'
// import { GetFormatedDate } from '../../../Utils/utils'
const OrderDetails = ({ route }) => {

  const paramsData = route?.params?.dataItem?.item
  const scheme = useColorScheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        <Header showText={paramsData?.id} customstyles={{ width: scale(200) }} />
        <DenseCard style={styles.card}>
          <View style={styles.keyInner}>
            <View style={styles.keyInner1}>
              <IconCard Svg={OrderGreenSvg} />
              <CommonText showText={'Order Id'} customstyles={styles.textCon} />
            </View>
            <CommonText showText={paramsData?.order?.id} fontSize={14} />
          </View>
          <View style={styles.keyInner}>
            <View style={styles.keyInner1}>
              <View style={styles.icon}>
                <AntDesign name='calendar' size={25} color={colors.green} />
              </View>
              <CommonText showText={'Date'} customstyles={styles.textCon} />
            </View>
            <CommonText showText={GetFormatedDateOnly(paramsData?.orderdate)} fontSize={14} />
          </View>
        </DenseCard>
        <CommonText showText={'   Items'} fontSize={18} customstyles={styles.text} />
        <DenseCard style={styles.card}>
          <View style={styles.keyInner}>
            <View style={styles.keyInner1}>
              <IconCard Svg={StoreGreenSvg} />
              <CommonText showText={'Name'} customstyles={styles.textCon} />
            </View>
            <CommonText showText={`₹ ${'1400'}`} />
          </View>
        </DenseCard>
        <CommonText showText={'   Order Summary'} customstyles={styles.text} />
        <DenseCard style={styles.card}>
          {/* <View style={styles.keyInner}>
            <CommonText showText={'Price'} />
            <CommonText showText={`₹ ${paramsData?.order?.amount || '0'}`} />
          </View> */}
          {/* <View style={styles.keyInner}>
            <CommonText showText={'Cost'} />
            <CommonText showText={`₹ ${'1200'}`} />
          </View>
          <View style={styles.keyInner}>
            <CommonText showText={'Amount of CGST (0%)'} />
            <CommonText showText={`₹ ${'100'}`} />
          </View>
          <View style={styles.keyInner}>
            <CommonText showText={'Amount of SGST (0%)'} />
            <CommonText showText={`₹ ${'100'}`} />
          </View> */}
          <View style={styles.keyInner}>
            <CommonText showText={'Total'} customstyles={styles.text} />
            <CommonText showText={`₹ ${paramsData?.order?.amount || '0'}`} customstyles={styles.text} />
          </View>
        </DenseCard>
      </View>
      <View style={styles.btnCon}>
        <WhiteButton showText={'Help'} style={{ width: '35%' }} />
        <Button showText={'Download Invoice'} style={{ width: '100%' }} />
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center'
  },
  card: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  keyInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between'
  },
  btnCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  keyInner1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCon: {
    marginLeft: 14,
  },
  textType: { marginVertical: 10, },
  icon: { paddingVertical: 8, paddingHorizontal: 8, borderRadius: 6, backgroundColor: colors.lightgreen },
  text: { marginTop: 15 },
})



export default OrderDetails