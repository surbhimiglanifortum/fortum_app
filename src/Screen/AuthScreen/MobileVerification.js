import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useContext, useRef } from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import CommonText from '../../Component/Text/CommonText';
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import OtpTextinput from '../../Component/Textinput/OtpTextinput';
import { Auth } from 'aws-amplify';
import axios from 'axios'
import appconfig from '../../Utils/appconfig'
import * as ApiAction from '../../Services/Api'
import { useDispatch } from 'react-redux';
import { AddToRedux } from '../../Redux/AddToRedux';
import * as Types from '../../Redux/Types'
import SnackContext from '../../Utils/context/SnackbarContext'

const MobileVerification = ({ route }) => {

    const dispatch = useDispatch();

    const navigation = useNavigation()
    const scheme = useColorScheme();

    const otpField1 = useRef(null);
    const otpField2 = useRef(null);
    const otpField3 = useRef(null);
    const otpField4 = useRef(null);

    const [userInput1, setUserInput1] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const [userInput3, setUserInput3] = useState('')
    const [userInput4, setUserInput4] = useState('')

    let otpConcatData = userInput1.concat(userInput2).concat(userInput3).concat(userInput4)

    const { setOpenCommonModal } = useContext(SnackContext);
    // OTP
    const [loading, setLoading] = useState(false)
    let { mobile_number, email_id, signin } = route.params;
    let user = route.params?.user

    async function verifyOTP(number, otp) {

        const url = appconfig.TOTAL_BASE_URL + '/verifyotp'
        try {
            const result = await axios.post(url, { number, otp })
            console.log("verify otp result is ", result.status, result.data)
            if (result.status === 200) {
                console.log("200 status matchd")
                return result.data
            }

        } catch (e) {
            console.log("Error occurred while sending OTP")
        }

    }


    const VerifyButtonHandler = async () => {
        setLoading(true)
        if (!signin) {
            verifyOTP(mobile_number.replace("+91", ""), otpConcatData).then(async r => {
                console.log("verifyOTP", r)
                if (r?.verified) {
                    // SIgnup to cognito
                    await Auth.signUp({
                        username: "+91" + mobile_number,
                        password: "@Nujyadav123",
                        attributes: {
                            "custom:phoneUser": "true",
                            email: email_id,          // optional
                            phone_number: "+91" + mobile_number,   // optional - E.164 number convention
                            // other custom attributes c
                        },
                        autoSignIn: { // optional - enables auto sign in after user is confirmed
                            enabled: true,
                        }

                    }).catch(e => {
                        console.log("error", e)
                        setOpenCommonModal({ isVisible: true, message: e.message })
                    })

                    await ApiAction.updateUserPhone(email_id, { phone: mobile_number.replace("+91", "") }).
                        then((e) => {
                            loginSuccess()
                        }).catch((err) => {

                            console.log("error in update user phone", err)
                            setOpenCommonModal({ isVisible: true, message: err.message })
                        })
                    setLoading(false)


                } else {
                    setLoading(false)

                    // failed to verify OTP
                    setOpenCommonModal({ isVisible: true, message: "OTP is wrong please re enter " })
                }
            }).catch(err => {
                setLoading(false)
                setOpenCommonModal({ isVisible: true, message: err.message })
            })
        } else {
            try {
                await Auth.sendCustomChallengeAnswer(user, otpConcatData)
                    .then(e => {
                        loginSuccess()
                    }).catch(e => {
                        console.log("ERROR", e)
                        setOpenCommonModal({ isVisible: true, message: e })
                    });
                setLoading(false)

            } catch (e) {
                // Handle 3 error thrown for 3 incorrect attempts. 
                console.log("ERROR", e)
                setOpenCommonModal({ isVisible: true, message: e })
                setLoading(false)
            }
        }

    }

    const loginSuccess = async () => {
        const data = await Auth.currentAuthenticatedUser();
        if (data.signInUserSession) {
            const result = await ApiAction.getUserDetails()
            if (result.data) {
                dispatch(AddToRedux(result.data, Types.USERDETAILS))
                navigation.navigate(routes.dashboard)
                return
            }
        }
        setOpenCommonModal({ isVisible: true, message: "Something Went wrong!!!" })
    }

    const onResendClick = async () => {
        setLoading(true)
        if (!signin) {
            // not signed

        } else {
            //  signed in 
            route.params.user = await Auth.signIn(("+91" + mobile_number).trim());
            setOpenCommonModal({ isVisible: true, message: "OTP Sent!!!" })
        }

        setLoading(false)
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.imageContainer}>
                        <CarLogo />
                    </View>
                    <View>
                        <CommonText showText={'Mobile Verification'} fontSize={20} />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Please enter the verification code sent to '} fontSize={15} />
                        <View style={styles.centerText}>
                            <CommonText showText={mobile_number} fontSize={15} />
                            <TouchableOpacity >
                                <CommonText showText={' Edit'} fontSize={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otpContainer}>
                            <OtpTextinput refData={otpField1} value={userInput1} onChange={(pin1) => {
                                setUserInput1(pin1);
                                if (pin1 !== '') {
                                    otpField2.current.focus();
                                }
                            }} />
                            <OtpTextinput refData={otpField2} value={userInput2} onChange={(pin2) => {
                                setUserInput2(pin2);
                                if (pin2 !== '') {
                                    otpField3.current.focus();
                                }
                            }} />
                            <OtpTextinput refData={otpField3} value={userInput3} onChange={(pin3) => {
                                setUserInput3(pin3);
                                if (pin3 !== '') {
                                    otpField4.current.focus();
                                }
                            }} />
                            <OtpTextinput refData={otpField4} value={userInput4} onChange={(pin4) => {
                                setUserInput4(pin4);
                                if (pin4 !== '') {
                                    otpField4.current.focus();
                                }
                            }} />
                        </View>
                        <View style={styles.resendContainer}>
                            <CommonText regular showText={'Didn’t receive the code?  '} fontSize={14} />
                            <TouchableOpacity onPress={onResendClick} >
                                <CommonText showText={'Resend'} fontSize={14} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Button onPress={VerifyButtonHandler} showText={'Verify'} onLoading={loading} />
                    </TouchableOpacity>

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
        alignSelf: 'center'
    },
    textinputConatiner: {
        marginVertical: 15
    },
    button: {
        marginTop: 80
    },
    centerText: {
        marginTop: 20,
        alignItems: 'center'
    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
    bottomText: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50
    },
    imageContainer: {
        marginVertical: 45
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    centerText: { flexDirection: 'row', alignItems: 'center' },
    resendContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 35 },

})


export default MobileVerification