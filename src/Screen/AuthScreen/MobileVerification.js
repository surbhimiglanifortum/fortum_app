import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView, Platform } from 'react-native'
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

    let { mobile_number, email_id, signin } = route.params;
    let user = route.params?.user

    const isAndroid = Platform.OS === 'android';

    const { setOpenCommonModal } = useContext(SnackContext);
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const scheme = useColorScheme();

    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);

    const [otpArray, setOtpArray] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false)

    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    // OTP
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
        const otp = otpArray.join('');
        if (!otp || otp == "" || otp.length < 4) {
            setOpenCommonModal({ isVisible: true, message: "Enter OTP" })
            return
        }
        setLoading(true)
        if (!signin) {
            verifyOTP(mobile_number.replace("+91", ""), otp).then(async r => {
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
                    .then(async e => {
                        console.log(e)
                        if (e.signInUserSession) {
                            loginSuccess()
                        } else {
                            // enter valid OTP
                            setOpenCommonModal({ isVisible: true, message: "OTP is wrong please re enter " })
                        }
                    }).catch(e => {
                        console.log("ERROR", e)
                        setOpenCommonModal({ isVisible: true, message: e.message })
                    });
                setLoading(false)

            } catch (e) {
                // Handle 3 error thrown for 3 incorrect attempts. 
                console.log("ERROR", e)
                setOpenCommonModal({ isVisible: true, message: e.message })
                setLoading(false)
            }
        }

    }

    const loginSuccess = async () => {
        const data = await Auth.currentAuthenticatedUser();
        console.log("Login data", data)
        if (data.signInUserSession) {
            const result = await ApiAction.getUserDetails()
            if (result.data) {
                dispatch(AddToRedux(result.data, Types.USERDETAILS))
                navigation.reset({
                    index: 0,
                    routes: [{ name: routes.dashboard }],
                });
                return
            } else {
                try {
                    const result_ = await Auth.currentAuthenticatedUser();
                    const result = await ApiAction.registerNoPhone(result_.attributes.email.toLowerCase(), {}, { first_name, last_name })
                    navigation.reset({
                        index: 0,
                        routes: [{ name: routes.dashboard }],
                    });
                    // user created at backend if not exisits
                } catch (error) {
                    setOpenCommonModal({ isVisible: true, message: "Unable to Create User" })
                }
            }
        }
        setOpenCommonModal({ isVisible: true, message: "Something Went wrong!!!" })
    }

    const onResendClick = async () => {
        setLoading(true)
        if (!signin) {
            // not signed
            ApiAction.sendOTP(mobile_number.replace('+91', '')).then(e => {
                setOpenCommonModal({ isVisible: true, message: "OTP Sent!!!" })
            }).catch(err => {
                setOpenCommonModal({ isVisible: true, message: err.message })
            })
        } else {
            //  signed in 
            route.params.user = await Auth.signIn(("+91" + mobile_number).trim());
            setOpenCommonModal({ isVisible: true, message: "OTP Sent!!!" })
        }

        setLoading(false)
    }

    const onPhoneEdit = () => {
        navigation.goBack()
    }

    const onOtpKeyPress = index => {
        return ({ nativeEvent: { key: value } }) => {
            if (value === 'Backspace' && otpArray[index] === '') {
                if (index === 1) {
                    firstTextInputRef.current.focus();
                } else if (index === 2) {
                    secondTextInputRef.current.focus();
                } else if (index === 3) {
                    thirdTextInputRef.current.focus();
                }

                if (isAndroid && index > 0) {
                    const otpArrayCopy = otpArray.concat();
                    otpArrayCopy[index - 1] = '';
                    setOtpArray(otpArrayCopy);
                }
            }
        };
    };

    const onOtpChange = index => {
        return value => {
            if (isNaN(Number(value))) {
                return;
            }
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);

            if (value !== '') {
                if (index === 0) {
                    secondTextInputRef.current.focus();
                } else if (index === 1) {
                    thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    fourthTextInputRef.current.focus();
                }
            }
        };
    };


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
                        <CommonText regular showText={'Please enter the verification code sent to '} fontSize={15} />
                        <View style={styles.centerText}>
                            <CommonText regular showText={mobile_number} fontSize={15} />
                            {signin && <TouchableOpacity onPress={onPhoneEdit} >
                                <CommonText customstyles={{ textDecorationLine: 'underline' }} showText={' Edit'} fontSize={15} />
                            </TouchableOpacity>}

                        </View>
                        <View style={styles.otpContainer}>
                            {[
                                firstTextInputRef,
                                secondTextInputRef,
                                thirdTextInputRef,
                                fourthTextInputRef,
                            ].map((textInputRef, index) => (
                                <OtpTextinput
                                    value={otpArray[index]}
                                    onKeyPress={onOtpKeyPress(index)}
                                    onChange={onOtpChange(index)}
                                    keyboardType={'numeric'}
                                    maxLength={1}
                                    style={[styles.otpText]}
                                    autoFocus={index === 0 ? true : undefined}
                                    refData={refCallback(textInputRef)}
                                    key={index}
                                />
                            ))}
                        </View>
                        <View style={styles.resendContainer}>
                            <CommonText regular showText={'Didn’t receive the code?  '} fontSize={14} />
                            <TouchableOpacity onPress={onResendClick} >
                                <CommonText customstyles={{ textDecorationLine: 'underline' }} showText={`Resend`} fontSize={14} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button onPress={VerifyButtonHandler} showText={'Verify'} onLoading={loading} />
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