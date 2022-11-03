import React, { useEffect, useState, useContext } from 'react'
import { View, Text, BackHandler, ActivityIndicator, NativeModules, NativeEventEmitter } from 'react-native'
import HyperSdkReact from 'hyper-sdk-react';
// import SnackContext from '../../Context/SnackbarContext';
import colors from '../../Utils/colors';
import { appConfig } from "../../../appConfig";
import axios from 'axios'
import CommonText from '../../Component/Text/CommonText'
import routes from '../../Utils/routes'
import SnackContext from '../../Utils/context/SnackbarContext'

let eventListener;
let clientId = "fortum"
let merchantId = "fortum"
let merchantKeyId = "10563"
let amount = ''
let orderId = ''
let customerId = ''
let mobile_number = ''
let email_address = ''
let return_url = ''
let juspay_process_payload = {}
let orderStatus

const PaymentScreenJuspay = (props) => {

    const { setOpenCommonModal } = useContext(SnackContext);

    const [isLoading, setIsLoading] = useState(true)
    const [payAsYouGoStatus, setPayAsYouGoStatus] = useState('')
    const [message, setMessage] = useState('Getting Payment Options...')
    let pollSessionCount = 0
    // params needed
    // amount, mobile,email
    customerId = props.route.params.email_address
    mobile_number = props.route.params.mobile_number
    email_address = props.route.params.email_address
    return_url = props.route.params.callback_url
    amount = props.route.params.amount
    orderId = props.route.params.orderid
    juspay_process_payload = props.route.params.juspay_process_payload
    orderStatus = props.route?.params?.orderStatus
    // isWallet = props.route.params.isWallet

    console.log('Check Naviagtion Props', props.route.params)
    console.log('Check orderStatus Props', orderStatus)
    console.log("Order Status", orderStatus, props.route?.params?.orderStatus)


    if (orderStatus != undefined) {
        console.log("Hello Here")
    } else {
        console.log('Hello Where')
    }

    const startPaymentLatest = () => {
        console.log("juspay_process_payload", juspay_process_payload)
        HyperSdkReact.process(JSON.stringify(juspay_process_payload.sdk_payload));
    }

    const paymentSuccess = () => {
        if (props.route.params.showYouSavedFunction != undefined) {
            props.route.params.showYouSavedFunction()
        } else {
            // setSnack({ message: 'Payment Successful!', open: true, color: 'success' })
            alert('Payment Successful!')
        }
    }

    const paymentFail = (message) => {
        setOpenCommonModal({ isVisible: true, message: message })
    }

    useEffect(() => {
        if (orderStatus == undefined || props.route?.params?.orderStatus == undefined) {
            console.log("Order Status payAsYouGoStatus", payAsYouGoStatus)
        } else {
            orderStatus(payAsYouGoStatus)
        }
    }, [payAsYouGoStatus])

    useEffect(() => {
        //     //setIsLoading(true)
        //     paymentParam = props.route.params
        //     console.warn("append_param >>", props.route.params)
        const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);
        eventListener = eventEmitter.addListener('HyperEvent', (resp) => {
            console.warn("loader::-- ", resp)
            const parsedResp = JSON.parse(resp)
            const event = parsedResp.event || '';
            switch (event) {
                case 'initiate_result':
                    // this was already handled in homescreen where initiate was called
                    console.log("Juspay Event", event)
                    break;
                case 'hide_loader':
                    // stop the processing loader
                    setIsLoading(false)
                    break;
                //block:start:handle-process-result
                case 'process_result':
                    const error = parsedResp.error || false;
                    const innerPayload = parsedResp.payload || {};
                    const status = innerPayload.status || '';
                    const pi = innerPayload.paymentInstrument || '';
                    const pig = innerPayload.paymentInstrumentGroup || '';
                    const errorCode = parsedResp.errorCode || '';
                    const errorMessage = parsedResp.errorMessage || '';
                    console.log("Error SDK Response", errorCode + " - " + errorMessage + " - " + status)
                    if (!error) {
                        // txn success, status should be "charged"
                        //block:start:check-order-status
                        // call orderStatus once to verify (false positives)
                        //block:end:check-order-status
                        //block:start:display-payment-status
                        poll_session()
                        //block:end:display-payment-status
                    } else {
                        switch (status) {
                            case 'backpressed':
                                console.log("Calling Here 2")
                                paymentFail('Back button pressed, checking transaction status at PG')
                                props.navigation.goBack()
                                // poll_session()
                                break
                            case 'charged':
                                poll_session()
                                break;

                            case 'user_aborted':
                                // user initiated a txn and pressed back
                                // poll order status
                                props.navigation.goBack()
                                console.log("Two")
                                paymentFail('Transaction cancelled, please retry the payment.')
                                // poll_session()
                                break;
                            case 'pending_vbv':
                            case 'authorizing':
                                // txn in pending state
                                // poll order status until backend says fail or success
                                props.navigation.goBack()
                                poll_session()
                                break;
                            case 'authorization_failed':
                            case 'authentication_failed':
                            case 'api_failure':
                                // txn failed
                                // poll orderStatus to verify (false negatives)
                                //block:start:display-payment-status
                                props.navigation.goBack()
                                poll_session()
                                //block:end:display-payment-status
                                break;

                            case 'new':
                                // txn failed
                                // poll orderStatus to verify (false negatives)
                                //block:start:display-payment-status

                                poll_session()
                                //block:end:display-payment-status
                                break;

                            default:
                                poll_session()
                                console.log("Here error cases")
                                switch (errorCode) {
                                    case "JP_001":
                                    case "JP_004":
                                    case "JP_007":
                                    case "JP_008":
                                    case "JP_010":
                                    case "JP_011":
                                    case "JP_014":
                                    case "JP_016":
                                    case "JP_017":
                                        paymentFail('Something went wrong. Please retry.')
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    case "JP_002":
                                        console.log("Calling Here 3")
                                        // paymentFail(errorMessage)
                                        // poll_session()
                                        // paymentFail('Payment Failed. Please retry for payment')
                                        props.navigation.goBack()
                                        // console.log("Juspay Error Code", errorCode);
                                        break;

                                    case "JP_003":
                                        paymentFail('Payment Failed Due To Wrong Bank Details. Please retry for payment')
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    case "JP_005":
                                        paymentFail('No internet. Please retry for payment')
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    case "JP_006":
                                        paymentFail('Waiting for payment status.')
                                        // Invoke the Juspay Order Status API to check the status.
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    case "JP_009":
                                        paymentFail('Invalid OTP. Please retry.')
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    case "JP_012":
                                        paymentFail('Transaction Failed. Please retry.')
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    case "JP_015":
                                        paymentFail('Cred App is not present on your device.')
                                        console.log("Juspay Error Code", errorCode);
                                        props.navigation.goBack()
                                        break;

                                    default:
                                        console.log("Default in the juspay error codes switch block", parsedResp);
                                        break;
                                }
                        }

                        // if txn was attempted, pi and pig would be non-empty
                        // can be used to show in UI if you are into that
                        // errorMessage can also be shown in UI
                    }
                    break;
                //block:end:handle-process-result
                default:

            }
        });

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        startPaymentLatest()
        return () => {
            eventListener.remove();
            BackHandler.removeEventListener('hardwareBackPress', () => null)
        }
    }, [])

    function handleBackPress() {
        return !HyperSdkReact.isNull() && HyperSdkReact.onBackPressed();
    }

    let pollTimeOut

    const poll_session = async () => {
        try {
            setIsLoading(true)
            setMessage("Confirming payment, Please do not press back")
            console.log("Check Location of Juspay One", juspay_process_payload.order_id)
            await getOrderStatus()
            console.log("Check Location of Juspay Two", juspay_process_payload.order_id)
        } catch (error) {
            handlePollStatus('#ERRROR')
        }
    }


    const getOrderStatus = async () => {
        console.log("Polling", pollSessionCount)
        const result = await axios.post(appConfig.BASE_URL + '/juspay/webhook', { "id": juspay_process_payload.order_id })
        console.log("check of web ook repsonse", result.data)
        if (result.data.orderStatus.status == 'CHARGED') {
            //charged payment success
            setPayAsYouGoStatus(result.data.orderStatus.status)
            handlePollStatus(result.data.orderStatus.status)
            if (pollTimeOut) {
                clearTimeout(pollTimeOut)
            }
        } else {
            console.log(pollSessionCount)

            if (pollSessionCount > 1) {
                console.log("on if", pollTimeOut)
                handlePollStatus(result.data.orderStatus.status)
                if (pollTimeOut) {
                    clearTimeout(pollTimeOut)
                }
            } else {
                console.log("on else", pollTimeOut)
                if (!pollTimeOut) {
                    pollTimeOut = setInterval(getOrderStatus, 2000);
                }
            }
            pollSessionCount = pollSessionCount + 1
        }
    }

    const handlePollStatus = (status) => {
        console.log("handlePollStatus", status)
        status = status.toLowerCase()
        // setPayAsYouGoStatus(status)
        switch (status) {
            case 'backpressed':
                // user back-pressed from PP without initiating any txn
                paymentFail('Transaction cancelled, please retry the payment.')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                break;

            case 'charged':
                paymentSuccess()
                // props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'MapStack' }],
                // });
                if (props.route.params?.callFrom === 'payPendingInvoice') {
                    props.navigation.pop(2)
                } if (props.route.params?.callFrom === 'SelectPaymentMode') {
                    props.navigation.pop(1)
                } if (props.route.params?.callFrom === 'RechargerWallet') {
                    props.navigation.navigate(routes.RechargeDone)
                } else {
                    props.navigation.goBack()
                }
                break;

            case 'user_aborted':
                // user initiated a txn and pressed back
                // poll order status
                console.log("ONE")
                paymentFail('Transaction cancelled, please retry the payment.')
                poll_session()
                // props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'MapStack' }],
                // });
                props.navigation.goBack()
                break;

            case 'pending_vbv':
                paymentFail('Authentication is in progress')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                break;

            case 'pending_vbv':
                paymentFail('Authentication is in progress')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                break;
            case 'authorizing':
                // txn in pending state
                // poll order status until backend says fail or success
                paymentFail('Transaction status is pending from bank')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                break;

            case 'authorization_failed':
                paymentFail('User completed authentication, but the bank refused the transaction')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                //block:end:display-payment-status
                break;
            case 'authentication_failed':
                paymentFail('User did not complete authentication')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                //block:end:display-payment-status
                break;
            case 'api_failure':
                // txn failed
                // poll orderStatus to verify (false negatives)
                //block:start:display-payment-status
                paymentFail('Bank Refused the transaction')
                // props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'MapStack' }],
                // });
                props.navigation.goBack()
                //block:end:display-payment-status
                break;

            case 'new':
                // txn failed
                // poll orderStatus to verify (false negatives)
                //block:start:display-payment-status
                paymentFail('Transaction not created')
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'MapStack' }],
                });
                //block:end:display-payment-status
                break;

            case 'juspay_declined':
                paymentFail('User input is not accepted by the underlying PG')

            case 'juspay_declined':
                paymentFail('User input is not accepted by the underlying PG')

            default:
                paymentFail('Something went wrong!!!')
                props.navigation.goBack()
                break;
        }
    }

    return (
        <View style={{ backgroundColor: colors.green, flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {
                isLoading ?
                    <>
                        <ActivityIndicator size='large' color={'#fff'} />
                        <CommonText fontSize={20} customstyles={{ color: colors.white, textAlign: 'center' }} showText={message} />
                    </>
                    : null
            }
        </View>
    )

}
export default PaymentScreenJuspay
