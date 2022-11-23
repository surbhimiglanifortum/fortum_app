import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import { getPaymentOption, payAsYouGo, checkOrderId, walletBalanceEnquiry, blockAmount, getUserDetails } from '../../Services/Api'
import { Picker } from '@react-native-community/picker';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { AddToRedux } from '../../Redux/AddToRedux';
import * as Types from '../../Redux/Types'
import colors from '../../Utils/colors';
import Button from '../Button/Button';
import CommonText from '../Text/CommonText';
import LinearInput from '../Textinput/linearInput';
import routes from '../../Utils/routes';

const SelectPaymentMode = ({ min_balance, addMoneyPress, orderStatus, isShow, setGoodToGo, setPaymentMethod, setPayAsYouGoOrderId, evsesUid, setMsg }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch();

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const [modalVisible, setModalVisible] = useState(false)
    const [mode, setMode] = useState('');
    const [loadingSign, setLoadingSign] = useState(false)
    const [isWallet, setWallet] = useState(true)
    const [allowMode, setAllowMode] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [orderExist, setOrderExist] = useState(false)
    const [askPin, setAskPin] = useState(false)
    const [pin, setPin] = useState({ value: '', error: '' });
    const [prepaidCardBalance, setPrepaidCardBalance] = useState('')
    const [balance, setBalance] = useState('')

    const isFocused = useIsFocused()

    useEffect(async () => {
        getDetails()
        paymentOptions()
    }, [])

    const getDetails = async () => {
        const result = await getUserDetails();
        if (result.data) {
            setBalance(result.data?.balance)
            dispatch(AddToRedux(result.data, Types.USERDETAILS))
        }
    }

    useEffect(() => {
        getDetails()
        checkOrderIdStatus()
    }, [isFocused])

    const paymentOptions = async () => {
        setRefreshing(true)
        try {
            const result = await getPaymentOption(mUserDetails.username)
            console.log("getPaymentOption try block", result.data)
            const data = result.data
            let ref = []
            if (data.result?.allPaymentOptions.length > 0) {
                const modes = data?.result?.allPaymentOptions
                modes.map((object, index) => {
                    if (object === 'CLOSED_WALLET') {
                        ref[index] = { value: object, name: 'Prepaid Wallet' };
                    }
                    if (object === 'PAY_AS_U_GO') {
                        ref[index] = { value: object, name: 'Pay As You Go' };
                    }
                    if (object === 'PREPAID_CARD') {
                        ref[index] = { value: object, name: 'Prepaid Card' };
                    }
                });
                setMode(data.result?.customerPaymentOption)
                if (data.result?.customerPaymentOption === 'PAY_AS_U_GO') {
                    checkOrderIdStatus()
                }
                setPaymentMethod(data.result?.customerPaymentOption)
            }
            setAllowMode(ref)
            setRefreshing(false)
        } catch (error) {
            console.log("getPaymentOption catch block", error)
            setRefreshing(false)
        }
    }

    let minBalance = parseFloat(min_balance)
    let currentBalance = parseFloat(balance)

    const checkWalletBalance = () => {
        setMode('CLOSED_WALLET')
        if (currentBalance < minBalance) {
            setMsg("Your wallet balance is low to start charger. Please recharge your wallet.")
            setWallet(false)
            setGoodToGo(false)
        } else {
            setMsg('You are ready to charge')
            setWallet(true)
            setGoodToGo(true)
        }
    }

    const payAsYouGoMode = async () => {
        // setMode('PAY_AS_U_GO')
        // setMsg('')
        // setWallet(true)
        setLoadingSign(true)
        setGoodToGo(false)
        const username = mUserDetails.username
        const payload = {
            amount: min_balance.toString(),
            evses_uid: evsesUid
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

    const checkOrderIdStatus = async () => {
        setGoodToGo(false)
        setMode('PAY_AS_U_GO')
        setMsg('')
        setWallet(true)
        const payload = {
            evses_uid: evsesUid
        }
        try {
            const isOrderExist = await checkOrderId(username, payload)
            console.log("isOrderExist", isOrderExist.data)
            if (isOrderExist.data.response.success) {
                setPayAsYouGoOrderId(isOrderExist.data.response.order_id)
                setGoodToGo(true)
                setMsg('You are ready to charge')
            }
            setOrderExist(isOrderExist.data.response.success)
        } catch (error) {
            console.log("isOrderExist catch block", error)
        }
    }

    const prepaidCard = () => {
        setMode('PREPAID_CARD')
        setMsg('')
        setWallet(true)
        checkPrepaidCardBalance()
    }

    const checkPrepaidCardBalance = async () => {
        // setModalVisible(true)
        setGoodToGo(false)
        setRefreshing(true)
        try {
            const res = await walletBalanceEnquiry({ username: mUserDetails.username })
            setPrepaidCardBalance(res.data?.response?.Cards[0].Balance)
            if (res.data?.response?.Cards[0].Balance < minBalance) {
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

    useEffect(() => {
        if (pin.value.length == 6) {
            console.log("length is perfect")
            blockMinBalance()
        }
        else {
            console.log("Return because length is short")
            return
        }
    }, [pin.value])

    const blockMinBalance = async () => {
        if (pin.value.length < 6) {
            setPin({ value: pin.value, error: "Please enter correct card pin." })
            return
        }
        try {
            setMsg('')
            setModalVisible(false)
            const payload = {
                username: userDetails.username,
                CardPin: pin.value,
                Amount: minBalance
            }
            const res = await blockAmount(payload);
            console.log("Check Response from blockMinBalance", res.data)
            if (res.data.success) {
                dispatch(AddToRedux(res.data, Types.PINELABAUTH))
                setAskPin(false)
                setMsg('You are ready to charge')
                setGoodToGo(true)
            } else {
                setMsg(res.data.message)
                setGoodToGo(false)
            }
        } catch (error) {
            console.log("Check Response from blockMinBalance error", error)
        }
    }

    const handleClick = (mode) => {
        switch (mode) {
            case 'CLOSED_WALLET':
                // checkWalletBalance()
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

    const checkMode = (mode) => {
        console.log(mode)
        setPaymentMethod(mode)
        switch (mode) {
            case 'CLOSED_WALLET':
                checkWalletBalance()
                break;
            case 'PAY_AS_U_GO':
                checkOrderIdStatus()
                break;
            case 'PREPAID_CARD':
                prepaidCard()
                break;
            default:
                console.log("In Default Case", mode)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                refreshing && <ActivityIndicator color={colors.black} style={{ position: 'absolute', left: 0, right: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }} />
            }

            <CommonText showText={`Pay ₹ ${min_balance} to start charging`} regular fontSize={14} customstyles={{ textAlign: 'center' }} />

            <CommonText showText={'Select Payment Method'} customstyles={{ marginTop: 10 }} />

            <Picker
                selectedValue={mode}
                onValueChange={(itemValue, itemIndex) => checkMode(itemValue)}
                mode={'dropdown'}
                enabled={isShow}
            >
                <Picker.Item label={'Select Payment Method'} />
                {
                    allowMode.map((item, index) => {
                        return (
                            <Picker.Item label={item.name} value={item.value} />
                        )
                    })
                }
            </Picker>

            {
                mode == "CLOSED_WALLET" &&
                < CommonText showText={`Available Wallet Balance : ₹ ${balance}`} regular fontSize={12} customstyles={{ marginLeft: 10 }} />
            }

            {
                mode == "PREPAID_CARD" &&
                < CommonText showText={`Available Card Balance : ₹ ${prepaidCardBalance}`} regular fontSize={12} customstyles={{ marginLeft: 10 }} />
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
                !isWallet ?
                    <>
                        <Button onLoading={loadingSign} showText={'Add Money'} onPress={addMoneyPress} style={{ marginTop: 10 }} />
                    </>
                    :
                    (mode === "PAY_AS_U_GO" && isShow && !orderExist) &&
                    // <CircularNormalButton
                    //     title={'Make Payment'}
                    //     loading={loadingSign}
                    //     click={() => handleClick(mode)}
                    //     disable={loadingSign}
                    //     bg={loadingSign ? AppColors.lightGray : AppColors.txtInputColo}
                    // />
                    <Button showText={'Make Payment'} onPress={() => handleClick(mode)} onLoading={loadingSign} />
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    heading: {
        fontSize: 16,
        marginVertical: 10,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    topHeading: {
        padding: 5,
        textAlign: 'center',
        borderRadius: 8,
        fontSize: 13,
    },
    errorText: {
        padding: 10,
        textAlign: 'center',
        fontSize: 16
    },
    addMoneyBtn: {
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        borderWidth: 2,
        marginVertical: 15
    },
    addMoneyBtnTxt: {
        textAlign: 'center',
    },
    makePaymentBtn: {
        height: 40,
        justifyContent: 'center',
        borderRadius: 8
    },
    makePaymentBtnTxt: {
        textAlign: 'center',
    }
})

export default SelectPaymentMode