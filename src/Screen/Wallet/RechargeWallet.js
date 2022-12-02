import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, useColorScheme, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import CommonView from '../../Component/CommonView'
import DenseCard from '../../Component/Card/DenseCard'
import Header from '../../Component/Header/Header'
import LinearInput from '../../Component/Textinput/linearInput'
import CommonCard from '../../Component/Card/CommonCard'
import CommonText from '../../Component/Text/CommonText'
import colors from '../../Utils/colors'
import WhiteButton from '../../Component/Button/WhiteButton'
import Button from '../../Component/Button/Button'
import { userGstList, walletRecharge } from '../../Services/Api'
import { Picker } from '@react-native-community/picker';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import routes from '../../Utils/routes'
import SnackContext from '../../Utils/context/SnackbarContext'
import { scale } from 'react-native-size-matters'

const RechargeWallet = ({ route }) => {

  const scheme = useColorScheme()
  const navigation = useNavigation()

  const { setOpenCommonModal } = useContext(SnackContext)

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const [amount, setAmount] = useState({ value: '0', error: '' });
  const [gstState, setGstState] = useState('')
  const [gstData, setGstData] = useState([])
  const [loadingSign, setLoadingSign] = useState(false)
  const [gstError, setGstError] = useState('')

  const isFocused = useIsFocused()

  useEffect(() => {
    getGstList()
  }, [isFocused])

  const getGstList = async () => {
    try {
      const res = await userGstList()
      if (res.data) {
        setGstData(res.data)
      }
      res.data.map(item => {
        if (item.state == mUserDetails?.defaultState) {
          setGstState(item)
        }
      })
    } catch (error) {
      console.log("Gst List Error", error)
    }
  }

  const rechargeWallet = async () => {
    if (amount.value == 0) {
      setAmount({ value: '', error: "Please enter Amount." })
      return
    }
    if (gstState === '') {
      setGstError('Please select the state')
      return
    } else {
      setGstError('')
    }

    console.log("Gst Error", gstState, gstError)

    const payload = {
      amount: amount.value,
      stategst: gstState
    }

    const username = mUserDetails?.username

    try {
      setLoadingSign(true)
      const result = await walletRecharge(username, payload)
      console.log("RechargeWallet Try Block", result.data)
      if (result.data?.sdk_payload) {
        navigation.navigate(routes.PaymentScreenJuspay, {
          callFrom: route.params?.routeDirection || 'RechargerWallet',
          amount: 0,
          email_address: '',
          orderid: '',
          mobile_number: '',
          description: 'Add Money In Wallet',
          callback_url: '',
          juspay_process_payload: result.data
        })
        setLoadingSign(false)
      } else {
        setOpenCommonModal({
          isVisible: true, message: 'Something Went Wrong Please Try After Some Time.', onOkPress: () => {
            console.log("OKPRESSED")
          }
        })
        setLoadingSign(false)
      }
    } catch (error) {
      console.log("RechargeWallet Catch Block", error)
      setLoadingSign(false)
    }
  }

  const onChange = e => {
    // const input = e.currentTarget.value;
    if (/^[^!-\/:-@\[-`{-~]+$/.test(e) || e === "") {
      setAmount({ value: e.trim(), error: '' })
    }
  };

  let lazyAmount = [50, 100, 120, 150]
  let lazyAmount2 = [200, 300, 400, 500]

  return (
    <CommonView>
      <ScrollView >
        <Header showText={'Recharge Wallet'} />
        <DenseCard style={{ marginTop: 20 }}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setAmount({ value: ((parseInt(amount.value) - 50) >= 0 ? parseInt(amount.value) - 50 : amount.value).toString(), error: '' })}>
              <CommonCard style={{ padding: 10, height: 50, width: 50, alignItems: 'center', }}>
                <CommonText showText={'-'} customstyles={[{ color: colors.greyText }]} fontSize={20} bold />
              </CommonCard>
            </TouchableOpacity>
            <View style={[styles.row, { flex: 1, justifyContent: 'center' }]}>
              <CommonText showText={'₹'} customstyles={[styles.rupeeText,]} fontSize={25} />
              <LinearInput
                value={amount.value}
                onChange={(text) => onChange(text)}
                placeholderText={'0'}
                style={styles.input}
                keyboardType={'numeric'}
                maxLength={5}
              />
            </View>

            <TouchableOpacity onPress={() => setAmount({ value: (isNaN((parseInt(amount.value) + 50)) == true ? "0" : (parseInt(amount.value) + 50)).toString(), error: '' })}>
              <CommonCard style={{ padding: 10, backgroundColor: colors.green, height: 50, width: 50, alignItems: 'center' }} >
                <CommonText showText={'+'} customstyles={[{ color: colors.white }]} fontSize={20} bold />
              </CommonCard>
            </TouchableOpacity>

          </View>
          {amount.error != '' && <CommonText showText={amount.error} fontSize={14} customstyles={{ color: colors.red, marginLeft: 15, marginVertical: 10 }} />}
        </DenseCard>

        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          {lazyAmount.map((e) => {
            return (
              <TouchableOpacity style={styles.innerRow} onPress={() => {
                setAmount({ value: e.toString(), error: '' })
              }}>
                <CommonCard style={[styles.column]}>
                  <CommonText showText={`₹ ${e}`} />
                </CommonCard>
              </TouchableOpacity>
            )
          })}

        </View>

        <View style={styles.row}>
          {lazyAmount2.map((e) => {
            return (
              <TouchableOpacity style={styles.innerRow} onPress={() => {
                setAmount({ value: e.toString(), error: '' })
              }}>
                <CommonCard>
                  <CommonText showText={`₹ ${e}`} />
                </CommonCard>
              </TouchableOpacity>
            )
          })}
        </View>

        <DenseCard padding={5}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={gstState}
            onValueChange={(itemValue, itemIndex) => {
              console.log('On Change GST', itemValue)
              setGstState(itemValue)
            }}
            mode={'dropdown'}
          >
            <Picker.Item label={'Select State'} value={''} />
            {
              gstData.map((item) => {
                return (
                  <Picker.Item label={item.state} value={item} />
                )
              })
            }
          </Picker>

          {gstError != '' && <CommonText showText={gstError} />}

        </DenseCard>

      </ScrollView>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <View style={{ width: '40%' }}>
          <WhiteButton showText={'Cancel'} onPress={() => navigation.goBack()} />
        </View>
        <View style={{ width: '50%' }}>
          <Button showText={'Recharge'} onPress={rechargeWallet} onLoading={loadingSign} />
        </View>
      </View>
    </CommonView>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    // paddingHorizontal: 16,
    // paddingVertical: 16
    width: scale(60),
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center'
  },
  rupeeText: {
    marginTop: 17
  }
})

export default RechargeWallet