import { View, StyleSheet, useColorScheme, } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
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
import { GetFormatedDate } from '../../../Utils/utils'
import { scale } from 'react-native-size-matters'
import CommonView from '../../../Component/CommonView/index'
import { payUnpaidOrder, orderDetails } from '../../../Services/Api'
import { useSelector } from 'react-redux'
import routes from '../../../Utils/routes'
import SnackContext from '../../../Utils/context/SnackbarContext'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'
import CalendarSvg from '../../../assests/svg/CalendarSvg'
import OrderSvg from '../../../assests/svg/OrderSvg'
import StoreSvg from '../../../assests/svg/StoreSvg'

const OrderDetails = ({ route }) => {

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
  const { setOpenCommonModal } = useContext(SnackContext);

  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const scheme = useColorScheme()

  const paramsData = route?.params?.dataItem?.item

  console.log("Check Order ID", paramsData)

  const [isLoading, setLoading] = useState(false)
  const [isPaid, setPaid] = useState(paramsData?.paid)

  const payUnpaid = async () => {
    setLoading(true)
    try {
      const result = await payUnpaidOrder(paramsData?.id, mUserDetails?.username)
      setPaid(result?.data?.success)
      if (result.data?.success && result.data?.juspay_sdk_payload?.order_id) {
        navigation.navigate(routes.PaymentScreenJuspay, {
          amount: "",
          email_address: "",
          orderid: "",
          mobile_number: "",
          description: 'Unpaid Order',
          callback_url: "",
          juspay_process_payload: result.data?.juspay_sdk_payload
        })
      } else {
        setOpenCommonModal({
          isVisible: true, message: result.data?.message || "Something went wrong. Please try after sometimes.", onOkPress: () => {
            console.log("OkPressed")
          }
        })
      }
      setLoading(false)
    } catch (error) {
      console.log("Check Order Error", error)
      setLoading(false)
    }
  }

  const getOrderDetails = async () => {
    try {
      const result = await orderDetails(paramsData?.id)
      console.log("Check Result of order", result.data?.data)
      setPaid(result.data?.data[0]?.paid)
    } catch (error) {
      console.log("Check Order Error", error)
    }
  }

  useEffect(() => {
    getOrderDetails()
  }, [isFocused])

  return (
    <CommonView>
      <View style={styles.innerContainer}>
        <Header showText={paramsData?.id} customstyles={{ width: scale(200), }} />
        <DenseCard style={styles.card} margin={1}>
          <View style={styles.keyInner}>
            <View style={styles.keyInner1}>
              <CommonIconCard Svg={OrderSvg} />
              <CommonText showText={'Order Id'} customstyles={styles.textCon} />
            </View>
            <CommonText showText={paramsData?.order?.id} fontSize={14} />
          </View>
          <View style={styles.keyInner}>
            <View style={styles.keyInner1}>

              <CommonIconCard Svg={CalendarSvg} />
              <CommonText showText={'Date'} customstyles={styles.textCon} />
            </View>
            <CommonText showText={GetFormatedDate(paramsData?.orderdate)} fontSize={14} />
          </View>
        </DenseCard>
        <CommonText showText={'Items'} fontSize={18} customstyles={styles.text} />
        <DenseCard style={styles.card} margin={1}>
          {
            paramsData?.itemDetailsObjects ? paramsData?.itemDetailsObjects?.map((item, index) => {
              return (
                <View style={styles.keyInner}>
                  <View style={styles.keyInner1}>
                    <CommonIconCard Svg={StoreSvg} />
                    <CommonText showText={item?.name} customstyles={styles.textCon} />
                  </View>
                  <CommonText showText={`??? ${item?.price || '0'}`} />
                </View>
              )
            })
              :
              Object.keys(paramsData?.cartObj).map((item, index) => {
                return (
                  <View style={styles.keyInner}>
                    <View style={styles.keyInner1}>
                      <IconCard Svg={StoreGreenSvg} />
                      <CommonText showText={item} customstyles={styles.textCon} />
                    </View>
                    {/* <CommonText showText={`??? ${item?.price || '0'}`} /> */}
                  </View>
                )
              })
          }
        </DenseCard>

        <CommonText showText={'Order Summary'} customstyles={styles.text} />
        <DenseCard style={styles.card} margin={1}>
          {/* <View style={styles.keyInner}>
            <CommonText showText={'Price'} />
            <CommonText showText={`??? ${paramsData?.order?.amount || '0'}`} />
          </View> */}
          {/* <View style={styles.keyInner}>
            <CommonText showText={'Cost'} />
            <CommonText showText={`??? ${'1200'}`} />
          </View>
          <View style={styles.keyInner}>
            <CommonText showText={'Amount of CGST (0%)'} />
            <CommonText showText={`??? ${'100'}`} />
          </View>
          <View style={styles.keyInner}>
            <CommonText showText={'Amount of SGST (0%)'} />
            <CommonText showText={`??? ${'100'}`} />
          </View> */}
          <View style={styles.keyInner}>
            <CommonText showText={'Total'} customstyles={styles.text} />
            <CommonText showText={`??? ${paramsData?.order?.amount / 100 || '0'}`} customstyles={styles.text} />
          </View>
        </DenseCard>
      </View>

      {/* {
        paramsData?.paid ?
          <View style={styles.btnCon}>
            <WhiteButton showText={'Help'} style={{ width: '35%' }} />
            <Button showText={'Download Invoice'} style={{ width: '100%' }} />
          </View> : <Button showText={'Pay'} />
      } */}

      {
        !isPaid && <Button showText={'Pay'} onPress={payUnpaid} onLoading={isLoading} />
      }


      {/* ----Order details session paid later implement and also download invoice and help btn implemt */}

    </CommonView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
  },
  card: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
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
  icon: { paddingVertical: 15, paddingHorizontal: 15, borderRadius: 12, backgroundColor: colors.lightgreen },
  text: { marginTop: 15 },
})



export default OrderDetails