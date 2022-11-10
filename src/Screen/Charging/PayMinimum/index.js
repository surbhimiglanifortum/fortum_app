import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import CommonView from '../../../Component/CommonView'
import Button from '../../../Component/Button/Button'
import DenseCard from '../../../Component/Card/DenseCard'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import { useSelector, useDispatch } from 'react-redux'
import { AddToRedux } from '../../../Redux/AddToRedux'
import * as Types from '../../../Redux/Types'
import { getUserDetails, getPaymentOption, payAsYouGo, walletBalanceEnquiry } from '../../../Services/Api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CommonCard from '../../../Component/Card/CommonCard'
import RadioBtn from '../../../Component/Button/RadioButton'
import colors from '../../../Utils/colors'
import routes from '../../../Utils/routes'
import LinearInput from '../../../Component/Textinput/linearInput'

const PayMinimum = ({ route }) => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const gstState = mUserDetails?.defaultState
    const locDetails = route?.params?.locDetails
    const evDetails = route.params?.evDetails

    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const [walletBalance, setWalletBalance] = useState(mUserDetails?.balance)
    const [mode, setMode] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [userData, setUserData] = useState({})
    const [msg, setMsg] = useState('')
    const [isWallet, setWallet] = useState(true)
    const [allowMode, setAllowMode] = useState([])
    const [loadingSign, setLoadingSign] = useState(false)
    const [goodToGo, setGoodToGo] = useState(false)
    const [payAsYouGoOrderId, setPayAsYouGoOrderId] = useState('')
    const [payAsYouGoOrderStatus, setPayAsYouGoOrderStatus] = useState('')
    const [askPin, setAskPin] = useState(false)
    const [pin, setPin] = useState({ value: '', error: '' });
    const [prepaidCardBalance, setPrepaidCardBalance] = useState('')
    const [colorText, setColorText] = useState('red')

    const checkWalletBalance = () => {
        setMode('CLOSED_WALLET')
        setRefreshing(true)
        if (userData?.balance < evDetails?.connectors[0]?.pricing?.min_balance) {
            setMsg("Your wallet balance is low. Please select other option or add money in your wallet.")
            setWalletBalance(userData?.balance)
            setWallet(false)
            setRefreshing(false)
            setColorText(colors.red)
        } else {
            setColorText(colors.green)
            setMsg('You are ready to charge')
            setWalletBalance(userData?.balance)
            setWallet(true)
            setRefreshing(false)
        }
    }

    const checkPrepaidCardBalance = async () => {
        // setModalVisible(true)
        setGoodToGo(false)
        setRefreshing(true)
        try {
            const res = await walletBalanceEnquiry({ username: mUserDetails?.username })
            setPrepaidCardBalance(res.data?.response?.Cards[0].Balance)
            if (res.data?.response?.Cards[0].Balance < evDetails?.connectors[0]?.pricing?.min_balance) {
                setMsg("Your wallet balance is low to start charger. Please load money in your card.")
                setGoodToGo(false)
            }
            else {
                setAskPin(true)
            }
            setRefreshing(false)
        } catch (error) {
            console.log("Check Prepaid Card Balance Error", error)
            setRefreshing(false)
        }
    }

    const userDetails = async () => {
        const result = await getUserDetails()
        if (result.data) {
            setUserData(result.data)
            dispatch(AddToRedux(result.data, Types.USERDETAILS))
        }
    }

    useEffect(() => {
        userDetails()
    }, [isFocused])

    useEffect(() => {
        paymentOptions()
    }, [])

    const prepaidCard = () => {
        setMode('PREPAID_CARD')
        setWallet(true)
        setMsg('')
        checkPrepaidCardBalance()
    }

    const paymentOptions = async () => {
        setRefreshing(true)
        try {
            const result = await getPaymentOption(mUserDetails?.username)
            if (result.data.result?.allPaymentOptions.length > 0) {
                setAllowMode(result.data.result?.allPaymentOptions)
                setMode(result.data.result?.customerPaymentOption)
            }
            setRefreshing(false)
        } catch (error) {
            setRefreshing(false)
        }
    }

    const orderStatus = (data) => {
        console.log("LOGS DATA FROM CHILD", data);
        setPayAsYouGoOrderStatus(data)
        if (data === "CHARGED") {
            setShow(false)
            setMsg("You are ready to charge.")
        }
    }

    const payAsYouGoMode = async () => {
        setMode('PAY_AS_U_GO')
        setMsg('')
        setWallet(true)
        setLoadingSign(true)
        setGoodToGo(false)
        const username = mUserDetails?.username
        const payload = {
            amount: evDetails?.connectors[0]?.pricing?.min_balance.toString(),
            evses_uid: evDetails?.uid
        }
        try {
            const result = await payAsYouGo(username, payload)
            console.log("payAsYouGoMode try block", result.data)
            if (result.data) {
                setPayAsYouGoOrderId(result.data.JusPayCallback.order_id)
                navigation.navigate(routes.PaymentScreenJuspay, {
                    amount: 0,
                    email_address: '',
                    orderid: '',
                    mobile_number: '',
                    description: 'Pay as you go',
                    callback_url: '',
                    juspay_process_payload: result.data.JusPayCallback,
                    orderStatus: orderStatus
                })
            }
            setLoadingSign(false)
        } catch (error) {
            console.log("payAsYouGoMode catch block", error)
            setLoadingSign(false)
        }
    }

    const handleClick = (mode) => {
        switch (mode) {
            case 'CLOSED_WALLET':
                navigation.navigate(routes.OngoingDetails, {
                    locDetails: locDetails,
                    evDetails: evDetails,
                    paymentMethod: mode
                })
                break;
            case 'PAY_AS_U_GO':
                payAsYouGoMode()
                break;
            case 'PREPAID_CARD':
                console.log("Check Prepaid Card Selection")
                setLoadingSign(false)
                break;
            default:
                console.log("In Default Case", mode)
        }
    }

    return (
        <CommonView style={{ position: 'relative' }}>
            <Header showText={'Payment Option'} />

            <DenseCard>
                <View style={styles.wrapper}>
                    <CommonText showText={'Amount to be paid'} customstyles={{ flex: 1 }} fontSize={14} regular />
                    <CommonText showText={`₹ ${evDetails?.connectors[0]?.pricing?.min_balance}`} fontSize={14} />
                </View>
            </DenseCard>

            <View>
                <CommonCard style={styles.wrapper}>
                    <View style={{ flex: 1 }}>
                        <CommonText showText={'Prepaid Wallet'} />
                        <CommonText showText={`Available Balance : ₹ ${walletBalance}`} fontSize={12} regular />
                    </View>
                    <RadioBtn
                        value="CLOSED_WALLET"
                        status={mode === 'CLOSED_WALLET' ? 'checked' : 'unchecked'}
                        onPress={checkWalletBalance}
                    />
                </CommonCard>

                {allowMode.includes('CLOSED_WALLET') &&
                    (
                        !isWallet &&
                        <Button showText={'Add Money'} onPress={() => navigation.navigate(routes.RechargeWallet, {
                            routeDirection: "SelectPaymentMode",
                            minBalance: evDetails?.connectors[0]?.pricing?.min_balance,
                            gstState: gstState
                        })} />
                    )
                }

                {
                    allowMode.includes('PAY_AS_U_GO') &&
                    <CommonCard style={styles.wrapper}>
                        <CommonText showText={'Debit Card / Credit Card / UPI'} customstyles={{ flex: 1 }} />
                        <RadioBtn
                            value="PAY_AS_U_GO"
                            status={mode === 'PAY_AS_U_GO' ? 'checked' : 'unchecked'}
                            onPress={payAsYouGoMode}
                        />
                    </CommonCard>
                }

                {
                    !allowMode.includes('PREPAID_CARD') &&
                    <CommonCard style={styles.wrapper}>
                        <View style={{ flex: 1 }}>
                            <CommonText showText={'Prepaid Card'} customstyles={{ flex: 1 }} />
                            {(prepaidCardBalance != undefined && prepaidCardBalance != '') && <CommonText showText={`Available Balance : ₹ ${prepaidCardBalance}`} fontSize={12} regular />}
                        </View>
                        <RadioBtn
                            value="PREPAID_CARD"
                            status={mode === 'PREPAID_CARD' ? 'checked' : 'unchecked'}
                            onPress={prepaidCard}
                        />
                    </CommonCard>
                }

                {console.log("Check Mode", mode, "check pin", askPin)}

                {
                    (mode == "PREPAID_CARD" && askPin) &&
                    <View style={{ width: '60%', alignSelf: 'center' }}>
                        <LinearInput
                            style={{ textAlign: 'center', borderBottomWidth: 1, borderBottomColor: colors.backgroundDark, paddingHorizontal: 10 }}
                            placeholderText="Please Enter Card Pin Here"
                            value={pin.value}
                            onChange={text => setPin({ value: text, error: '' })}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={6}
                        />
                    </View>
                }

                {
                    msg != '' &&
                    <CommonText showText={msg} customstyles={[{ color: colorText }, styles.text]} fontSize={14} regular />
                }

            </View>

            <View style={styles.fixedContainer}>
                <Button showText={'Make Payment'} onPress={() => handleClick(mode)} />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomBox: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 12
    },
    text: {
        textAlign: 'center',
        marginTop: 30
    },
    fixedContainer: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        width: '100%'
    }
})

export default PayMinimum