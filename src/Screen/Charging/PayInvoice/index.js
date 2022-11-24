import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import CommonView from '../../../Component/CommonView'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import colors from '../../../Utils/colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getUserDetails } from '../../../Services/Api'
import { useSelector, useDispatch } from 'react-redux'
import { AddToRedux } from '../../../Redux/AddToRedux';
import Button from '../../../Component/Button/Button'
import routes from '../../../Utils/routes'
import * as Types from '../../../Redux/Types'
import { getPaymentOption, getAllUnpaid, unpaidPayByJuspay, unpaidPayByWallet, walletBalanceEnquiry, unpaidPayByCard } from '../../../Services/Api'
import RadioBtn from '../../../Component/Button/RadioButton'
import SnackContext from '../../../Utils/context/SnackbarContext'
import CommonCard from '../../../Component/Card/CommonCard'
import DenseCard from '../../../Component/Card/DenseCard'
import CryptoJS from 'crypto-js'
import LinearInput from '../../../Component/Textinput/linearInput'
import { encryptedPassword } from '../../../Utils/globalDefines'


const PayInvoice = ({ route }) => {

    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const { setOpenCommonModal } = useContext(SnackContext);

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const gstState = mUserDetails?.defaultState

    const [mode, setMode] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [msg, setMsg] = useState('')
    const [isWallet, setWallet] = useState(true)
    const [userData, setUserData] = useState({})
    const [walletBalance, setWalletBalance] = useState(mUserDetails?.balance)
    const [allowMode, setAllowMode] = useState([])
    const [loadingSign, setLoadingSign] = useState(false)
    const [askPin, setAskPin] = useState(false)
    const [pin, setPin] = useState({ value: '', error: '' });
    const [prepaidCardBalance, setPrepaidCardBalance] = useState('')

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
        fatchPinelabWalletBalance()
    }, [])

    useEffect(() => {
        setRefreshing(true)
        getUserDetails().then((res) => {
            if (mode === 'CLOSED_WALLET') {
                if (res.data?.balance < route.params?.amount) {
                    setMsg("Your wallet balance is low. Please select other option or add money in your wallet.")
                    setWalletBalance(res?.data?.balance)
                    setWallet(false)
                    setRefreshing(false)
                } else {
                    setWalletBalance(res?.data?.balance)
                    setMsg('')
                    setWallet(true)
                    setRefreshing(false)
                }
            }
        }).catch((error) => {
            console.log("Error in Updating Balance", error)
        })

    }, [isFocused])

    const checkWalletBalance = () => {
        setMode('CLOSED_WALLET')
        setPin({ value: '', error: '' })
        setRefreshing(true)
        if (userData?.balance < route.params.amount) {
            setMsg("Your wallet balance is low. Please select other option or add money in your wallet.")
            setWalletBalance(userData?.balance)
            setWallet(false)
            setRefreshing(false)
        } else {
            setMsg('')
            setWalletBalance(userData?.balance)
            setWallet(true)
            setRefreshing(false)
        }
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


    const payAsYouGoMode = async () => {
        setMode('PAY_AS_U_GO')
        setWallet(true)
        setMsg('')
        setPin({ value: '', error: '' })
    }

    const prepaidCard = () => {
        setMode('PREPAID_CARD')
        setWallet(true)
        setMsg('')
        checkPrepaidCardBalance()
    }

    const checkPrepaidCardBalance = async () => {
        try {
            const res = await walletBalanceEnquiry({ username: mUserDetails?.username })
            setPrepaidCardBalance(res.data?.response?.Cards[0].Balance)
            if (res.data?.response?.Cards[0].Balance < route.params?.amount) {
                setMsg("Your wallet balance is low to start charger. Please load money in your card.")
            }
            else {
                setAskPin(true)
            }
        } catch (error) {
            console.log("Check Prepaid Card Balance Error", error)
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

    const payClick = (mode, session_id) => {
        switch (mode) {
            case 'CLOSED_WALLET':
                payByWallet(session_id)
                break;
            case 'PAY_AS_U_GO':
                payByJuspay(session_id)
                break;
            case 'PREPAID_CARD':
                payByCard(session_id)
                break;
            default:
                console.log("In Default Case", mode)
        }
    }

    const getUnpaidSession = (mode) => {
        setLoadingSign(true)
        getAllUnpaid(mUserDetails?.username).then((r) => {
            if (Array.isArray(r.data) && r.data.length > 0) {
                payClick(mode, r.data[0].session_id)
                setLoadingSign(false)
                setRefreshing(false)
            } else {
                setLoadingSign(false)
            }
        }).catch(error => {
            setLoadingSign(false)
            console.log("Error getUnpaidSession", error)
        })
    }

    const payByJuspay = (session_id) => {
        setLoadingSign(true)
        unpaidPayByJuspay(session_id).then((res) => {
            if (res.data.success) {
                navigation.navigate(routes.PaymentScreenJuspay, {
                    callFrom: 'payPendingInvoice',
                    amount: 0,
                    email_address: '',
                    orderid: '',
                    mobile_number: '',
                    description: 'Pending Invoice Payment',
                    callback_url: '',
                    juspay_process_payload: res.data.JusPayCallback
                })
            }
            setLoadingSign(false)
        }).catch((error) => {
            setLoadingSign(false)
            console.log('Error payByJuspay', error)
        })
    }

    const payByWallet = (session_id) => {
        setLoadingSign(true)
        unpaidPayByWallet(session_id).then((res) => {
            if (res.data.success) {
                setOpenCommonModal({
                    isVisible: true, message: res.data?.message, onOkPress: () => {
                        navigation.pop(1)
                    }
                })
            }
            setLoadingSign(false)
        }).catch((error) => {
            setLoadingSign(false)
        })
    }

    const payByCard = async (session_id) => {
        if (pin.value.length < 6) {
            setPin({ value: pin.value, error: "Please enter correct card pin." })
            return
        }

        setLoadingSign(true)
        var encrypted = CryptoJS.AES.encrypt(pin.value, encryptedPassword).toString();
        const payload = {
            secret_code: encrypted,
            username: mUserDetails?.username
        }

        unpaidPayByCard(session_id, payload).then((res) => {
            console.log("Pay By Card", res.data)
            if (res.data.success) {
                setOpenCommonModal({
                    isVisible: true, message: res.data?.message, onOkPress: () => {
                        navigation.pop(1)
                    }
                })
            }
            setLoadingSign(false)
        }).catch((error) => {
            setLoadingSign(false)
            console.log("Pay By Card Error", error)
        })
    }

    return (
        <CommonView>
            <Header showText={'Pay Invoice'} />
            {refreshing && <ActivityIndicator size={'small'} color={colors.black} style={{ position: 'absolute', alignSelf: 'center', backgroundColor: colors.white, padding: 10 }} />}
            <DenseCard padding={5}>
                <View style={styles.wrapper}>
                    <CommonText showText={'Pending Amount'} customstyles={{ flex: 1 }} />
                    <CommonText showText={`₹ ${route.params?.amount}`} />
                </View>
            </DenseCard>
            <View>
                <CommonCard style={styles.wrapper}>
                    <View style={{ flex: 1 }}>
                        <CommonText showText={'Prepaid Wallet'} regular />
                        <CommonText showText={`Balance : ₹ ${walletBalance}`} fontSize={12} regular />
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
                            routeDirection: "payPendingInvoice",
                            gstState: gstState
                        })} />
                    )
                }

                {
                    allowMode.includes('PAY_AS_U_GO') &&
                    <CommonCard style={styles.wrapper}>
                        <CommonText showText={'Debit Card / Credit Card / UPI'} regular customstyles={{ flex: 1 }} />
                        <RadioBtn
                            value="PAY_AS_U_GO"
                            status={mode === 'PAY_AS_U_GO' ? 'checked' : 'unchecked'}
                            onPress={payAsYouGoMode}
                        />
                    </CommonCard>
                }

                {
                    allowMode.includes('PREPAID_CARD') &&
                    <CommonCard style={styles.wrapper}>
                        <View style={{ flex: 1 }}>
                            <CommonText showText={'Prepaid Card'} regular customstyles={{ flex: 1 }} />
                            {(prepaidCardBalance != undefined && prepaidCardBalance != '') && <CommonText showText={`Available Balance : ₹ ${prepaidCardBalance}`} fontSize={12} regular />}
                        </View>
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
                    <CommonText showText={msg} customstyles={styles.text} fontSize={14} regular />
                }

                {
                    pin.error != '' &&
                    <CommonText showText={pin.error} customstyles={[{ color: colorText }, styles.text]} fontSize={14} regular />
                }

            </View>

            <View style={styles.bottomBox}>
                <Button
                    onPress={() => getUnpaidSession(mode)}
                    showText={"Pay"}
                    onLoading={loadingSign}
                    disable={!isWallet ? true : false}
                    bg={!isWallet ? colors.grey : colors.green}
                />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center'
    },
    bottomBox: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 12
    },
    text: {
        color: colors.red,
        textAlign: 'center'
    }
})

export default PayInvoice