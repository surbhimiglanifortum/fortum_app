import React, { useState, useEffect } from 'react'
import { StyleSheet, useColorScheme, View, TouchableOpacity, ScrollView } from 'react-native'
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
import { useQuery } from 'react-query'

const RechargeWallet = ({ route }) => {

  const scheme = useColorScheme()
  const navigation = useNavigation()

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const [amount, setAmount] = useState({ value: '', error: '' });
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
    if (amount.value == '') {
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
        // setSnack({ message: 'Something Went Wrong Please Try After Some Time.', open: true, color: 'success' })
        alert('Something Went Wrong Please Try After Some Time.')
        setLoadingSign(false)
      }
    } catch (error) {
      console.log("RechargeWallet Catch Block", error)
      setLoadingSign(false)
    }
  }

  return (
    <CommonView>
      <ScrollView >
        <Header showText={'Recharge Wallet'} />
        <DenseCard style={{ marginTop: 20 }}>
          <View style={styles.row}>
            <CommonCard style={{ padding: 20 }}>
              <CommonText showText={'-'} customstyles={[{ color: colors.greyText }]} fontSize={20} bold />
            </CommonCard>
            <View style={[styles.row, { flex: 1, justifyContent: 'center' }]}>
              <CommonText showText={'₹'} customstyles={styles.rupeeText} fontSize={25} />
              <LinearInput
                value={amount.value}
                onChange={(text) => { setAmount({ value: text, error: '' }) }}
                placeholderText={'50'}
                style={styles.input}
                keyboardType={'number-pad'}
              />
            </View>
            <CommonCard style={{ padding: 20, backgroundColor: colors.green }} >
              <CommonText showText={'+'} customstyles={[{ color: colors.white }]} fontSize={20} bold />
            </CommonCard>
          </View>
          {amount.error != '' && <CommonText showText={amount.error} fontSize={14} customstyles={{ color: colors.red, marginLeft: 15, marginVertical: 10 }} />}
        </DenseCard>


        <View style={styles.row}>
          <TouchableOpacity onPress={() => {
            setAmount({ value: '50', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 50'} />
            </CommonCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setAmount({ value: '100', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 100'} />
            </CommonCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setAmount({ value: '120', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 120'} />
            </CommonCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setAmount({ value: '150', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 150'} />
            </CommonCard>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => {
            setAmount({ value: '200', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 200'} />
            </CommonCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setAmount({ value: '300', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 300'} />
            </CommonCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setAmount({ value: '400', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 400'} />
            </CommonCard>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setAmount({ value: '500', error: '' })
          }}>
            <CommonCard style={styles.column}>
              <CommonText showText={'₹ 500'} />
            </CommonCard>
          </TouchableOpacity>
        </View>

        <DenseCard>
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
      <View style={[styles.row, { justifyContent: 'space-evenly' }]}>
        <WhiteButton showText={'Cancel'} style={{ flex: 1, marginRight: 5 }} />
        <Button showText={'Recharge'} style={{ flex: 1, marginLeft: 5 }} onPress={rechargeWallet} onLoading={loadingSign} />
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
    justifyContent: 'space-around',
    alignItems: "center"
  },
  column: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  rupeeText: {
    marginTop: -5
  }
})

export default RechargeWallet