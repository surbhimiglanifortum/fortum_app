import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import CommonView from '../../../Component/CommonView'
import Button from '../../../Component/Button/Button'
import DenseCard from '../../../Component/Card/DenseCard'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import { useSelector, useDispatch } from 'react-redux'
import { AddToRedux } from '../../../Redux/AddToRedux'
import * as Types from '../../../Redux/Types'
import { getUserDetails, getPaymentOption, payAsYouGo, walletBalanceEnquiry, checkOrderId, blockAmount, qrCodeService } from '../../../Services/Api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CommonCard from '../../../Component/Card/CommonCard'
import RadioBtn from '../../../Component/Button/RadioButton'
import colors from '../../../Utils/colors'
import routes from '../../../Utils/routes'
import LinearInput from '../../../Component/Textinput/linearInput'
import Loader from '../../../Component/Loader'
import Textinput from '../../../Component/Textinput/Textinput'

const PayMinimum = ({ route }) => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const gstState = mUserDetails?.defaultState
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
    const [orderExist, setOrderExist] = useState(false)
    const [isShow, setShow] = useState(true)
    const [locDetails, setLocDetails] = useState(route?.params?.locDetails)
    const [loading, setLoading] = useState(false)
    const [showBtn, setShowBtn] = useState(true)
    const [isLoader, setLoader] = useState(false)
    const [amount, setAmount] = useState({ value: evDetails?.connectors[0]?.pricing?.min_balance.toString(), error: '' })

    const qrLocationData = async () => {
        try {
            const payload = {
                username: mUserDetails?.username
            }
            const r = await qrCodeService(route?.params?.locid, payload)
            console.log("check Response", r.data)
            var data = r.data;
            data = {
                ...r.data, address: {
                    "city": r.data?.city,
                    "street": r.data?.address,
                    "countryIsoCode": "IND",
                    "postalCode": r.data?.postal_code
                }
            }
            console.log("Check Response Data 123", data)
            setLocDetails(data)
        } catch (error) {
            console.log("Check Error in fatch QR location", error)
        }
    }

    const checkWalletBalance = () => {
        setLoader(true)
        setMode('CLOSED_WALLET')
        setShowBtn(true)
        setPin({ value: '', error: '' })
        if (userData?.balance < evDetails?.connectors[0]?.pricing?.min_balance) {
            setMsg("Your wallet balance is low. Please select other option or add money in your wallet.")
            setWalletBalance(userData?.balance)
            setWallet(false)
            setColorText(colors.red)
            setGoodToGo(false)
            setLoader(false)
            setShowBtn(false)
        } else {
            setColorText(colors.green)
            setMsg('You are ready to charge')
            setWalletBalance(userData?.balance)
            setWallet(true)
            setGoodToGo(true)
            setLoader(false)
            setShowBtn(true)
        }
    }

    const checkPrepaidCardBalance = async () => {
        setGoodToGo(false)
        setLoader(true)
        setPin({ value: '', error: '' })
        console.log("Check Minimum Balance", amount)
        try {
            const res = await walletBalanceEnquiry({ username: mUserDetails?.username })
            setPrepaidCardBalance(res.data?.response?.Cards[0].Balance)
            if (res.data?.response?.Cards[0].Balance < amount.value) {
                setAskPin(false)
                setColorText(colors.red)
                setMsg("Your wallet balance is low to start charger. Please load money in your card.")
                setGoodToGo(false)
                setShowBtn(false)
                setLoader(false)
            }
            else {
                setAskPin(true)
                setShowBtn(true)
                setLoader(false)
            }
        } catch (error) {
            console.log("Check Prepaid Card Balance Error", error)
            setLoader(false)
        }
    }

    const blockMinBalance = async () => {
        if (amount.value == '') {
            setAmount({ value: amount.value, error: 'Please enter the amount or amount to be paid here.' })
            return
        }
        if (amount.value > prepaidCardBalance) {
            setAmount({ value: amount.value, error: 'Amount is not greater than the available card balance.' })
            return
        }
        if (amount.value < evDetails?.connectors[0]?.pricing?.min_balance) {
            setAmount({ value: amount.value, error: 'Enter same as amount to be paid or more.' })
            return
        }
        if (pin.value.length < 6) {
            setPin({ value: pin.value, error: "Please enter correct card pin." })
            return
        }

        setLoadingSign(true)
        try {
            setMsg('')
            const payload = {
                username: mUserDetails?.username,
                CardPin: pin.value,
                Amount: amount
            }

            console.log("Check Payload", payload)
            const res = await blockAmount(payload);
            setLoadingSign(true)
            console.log("Check PreAuth", res.data)
            if (res.data.success) {
                dispatch(AddToRedux(res.data, Types.PINELABAUTH))
                setAskPin(false)
                setMsg('You are ready to charge')
                setGoodToGo(true)
                navigation.replace(routes.OngoingDetails, {
                    locDetails: locDetails,
                    evDetails: evDetails,
                    paymentMethod: mode,
                    CardPin: pin.value,
                    PreAuthCode: res?.data?.PreAuthCode
                })
            } else {
                setMsg(res.data.message)
                setGoodToGo(false)
                setColorText(colors.red)
            }
            setLoadingSign(false)
        } catch (error) {
            setLoadingSign(false)
            console.log("Check Response from blockMinBalance error", error)
        }
    }

    const checkOrderIdStatus = async () => {
        setGoodToGo(false)
        setMode('PAY_AS_U_GO')
        setMsg('')
        setWallet(true)
        setShowBtn(true)
        setLoader(true)
        const payload = {
            evses_uid: evDetails?.uid
        }
        try {
            const isOrderExist = await checkOrderId(mUserDetails?.username, payload)
            console.log("isOrderExist", isOrderExist.data)
            if (isOrderExist.data.response.success) {
                setPayAsYouGoOrderId(isOrderExist.data.response.order_id)
                setGoodToGo(true)
                setMsg('You are ready to charge')
                setColorText(colors.green)
            }
            setOrderExist(isOrderExist.data.response.success)
            setLoader(false)
        } catch (error) {
            console.log("isOrderExist catch block", error)
            setLoader(false)
        }
    }

    const userDetails = async () => {
        const result = await getUserDetails()
        if (result.data) {
            setUserData(result.data)
            setWalletBalance(result?.data?.balance)
            dispatch(AddToRedux(result.data, Types.USERDETAILS))
        }
    }

    useEffect(() => {
        userDetails()
        checkOrderIdStatus()
    }, [isFocused])

    useEffect(() => {
        paymentOptions()
        fatchPinelabWalletBalance()
        if (route?.params?.callFrom) {
            qrLocationData()
        }
    }, [])

    const prepaidCard = () => {
        setMode('PREPAID_CARD')
        setWallet(true)
        setMsg('')
        setShowBtn(true)
        checkPrepaidCardBalance()
    }

    const paymentOptions = async () => {
        setRefreshing(true)
        try {
            const result = await getPaymentOption(mUserDetails?.username)
            console.log("Check Payment Method", result?.data)
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
            setColorText(colors.green)
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
            amount: amount.value,
            evses_uid: evDetails?.uid
        }

        if (amount.value < evDetails?.connectors[0]?.pricing?.min_balance) {
            setAmount({ value: amount.value, error: 'Enter same as amount to be paid or more.' })
            setLoadingSign(false)
            return
        }

        try {
            const result = await payAsYouGo(username, payload)
            console.log("payAsYouGoMode try block", result.data)

            if (result.data) {
                setPayAsYouGoOrderId(result.data.JusPayCallback.order_id)
                navigation.navigate(routes.PaymentScreenJuspay, {
                    callFrom: 'PaymentOption',
                    locDetails: locDetails,
                    evDetails: evDetails,
                    paymentMethod: mode,
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

    const fatchPinelabWalletBalance = async () => {
        try {
            const res = await walletBalanceEnquiry({ username: mUserDetails?.username })
            setPrepaidCardBalance(res.data?.response?.Cards[0].Balance)
        } catch (error) {
            console.log("Error in fatch pinelab wallet balance", error)
        }
    }

    const handleClick = (mode) => {
        switch (mode) {
            case 'CLOSED_WALLET':
                navigation.replace(routes.OngoingDetails, {
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
                blockMinBalance()
                // setLoadingSign(false)
                break;
            default:
                console.log("In Default Case", mode)
        }
    }

    return (
        <CommonView style={{ position: 'relative' }}>
            <Header showText={'Payment Options'} />
            {
                refreshing ?
                    <Loader modalOpen={refreshing} /> :
                    <>
                        <DenseCard>
                            <View style={styles.wrapper}>
                                <CommonText showText={'Amount to be paid'} customstyles={{ flex: 1 }} fontSize={14} regular />
                                <CommonText showText={`₹ ${evDetails?.connectors[0]?.pricing?.min_balance}`} fontSize={14} />
                            </View>
                        </DenseCard>

                        {(mode == "PREPAID_CARD" || mode == "PAY_AS_U_GO") &&
                            <View>
                                <CommonText showText={'Enter Amount'} customstyles={{ marginLeft: 15 }} />
                                <View style={{ marginHorizontal: 10 }} >
                                    <Textinput
                                        placeholder={"Enter Amount Here"}
                                        onChange={(text) => setAmount({ value: text, error: '' })}
                                        value={amount.value}
                                        keyboardType={'numeric'}
                                    />
                                </View>
                            </View>
                        }

                        {
                            amount.error && <CommonText showText={amount.error} customstyles={{ color: colors.red, marginLeft: 10, marginBottom: 10 }} regular fontSize={12} />
                        }


                        <View>
                            <CommonCard style={styles.wrapper}>
                                <TouchableOpacity onPress={checkWalletBalance} style={{ flex: 1 }}>
                                    <CommonText showText={'Prepaid Wallet'} />
                                    <CommonText showText={`Available Balance : ₹ ${walletBalance}`} fontSize={12} regular />
                                </TouchableOpacity>
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
                                <CommonCard >
                                    <TouchableOpacity style={styles.wrapper} onPress={checkOrderIdStatus}>
                                        <CommonText showText={'Debit Card / Credit Card / UPI'} customstyles={{ flex: 1 }} />
                                        <RadioBtn
                                            value="PAY_AS_U_GO"
                                            status={mode === 'PAY_AS_U_GO' ? 'checked' : 'unchecked'}
                                            onPress={checkOrderIdStatus}
                                        />
                                    </TouchableOpacity>
                                </CommonCard>
                            }

                            {
                                allowMode.includes('PREPAID_CARD') &&
                                <CommonCard style={styles.wrapper}>
                                    <TouchableOpacity onPress={prepaidCard} style={{ flex: 1 }}>
                                        <CommonText showText={'Prepaid Card'} customstyles={{ flex: 1 }} />
                                        {(prepaidCardBalance != undefined || prepaidCardBalance != '') && <CommonText showText={`Available Balance : ₹ ${prepaidCardBalance}`} fontSize={12} regular />}
                                    </TouchableOpacity>
                                    <RadioBtn
                                        value="PREPAID_CARD"
                                        status={mode === 'PREPAID_CARD' ? 'checked' : 'unchecked'}
                                        onPress={prepaidCard}
                                    />
                                </CommonCard>
                            }

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

                            {
                                mode == 'PREPAID_CARD' && pin.error != '' &&
                                <CommonText showText={pin.error} customstyles={[{ color: colors.red }, styles.text]} fontSize={14} regular />
                            }

                            <Loader modalOpen={isLoader} />

                        </View>

                        {
                            showBtn && <View style={styles.fixedContainer}>
                                <Button onLoading={loadingSign} showText={goodToGo ? 'Next' : 'Make Payment'} onPress={() => {
                                    goodToGo && mode == 'PAY_AS_U_GO' ? navigation.replace(routes.OngoingDetails, {
                                        locDetails: locDetails,
                                        evDetails: evDetails,
                                        paymentMethod: mode,
                                        payAsYouGoOrderId: payAsYouGoOrderId
                                    }) :
                                        handleClick(mode)
                                }
                                }
                                />
                            </View>
                        }
                    </>}
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