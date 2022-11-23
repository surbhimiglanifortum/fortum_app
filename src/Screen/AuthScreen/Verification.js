import { View, StyleSheet, useColorScheme, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useRef, useState, useContext } from 'react'
import CarLogo from '../../assests/svg/CarLogo';
import CommonText from '../../Component/Text/CommonText';
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import OtpTextinput from '../../Component/Textinput/OtpTextinput';
import { Auth } from 'aws-amplify';
import * as ApiAction from '../../Services/Api'
import { useDispatch } from 'react-redux';
import * as Types from '../../Redux/Types'
import { AddToRedux } from '../../Redux/AddToRedux';
import SnackContext from '../../Utils/context/SnackbarContext'
import CommonView from '../../Component/CommonView'

const Verification = ({ route }) => {

    const { email_id, signin, user, mobile_number, first_name, last_name } = route.params;

    const isAndroid = Platform.OS === 'android';

    const { setOpenCommonModal } = useContext(SnackContext);
    const navigation = useNavigation()
    const scheme = useColorScheme();
    const dispatch = useDispatch();

    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);

    const [loading, setLoading] = useState(false)
    const [otpArray, setOtpArray] = useState(['', '', '', '']);

    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    const VerifyButtonHandler = async () => {
        const otp = otpArray.join('');
        if (!otp || otp == "" || otp.length < 4) {
            setOpenCommonModal({ isVisible: true, message: "Enter OTP" })
            return
        }
        setLoading(true)
        if (!signin) {
            try {

                Auth.sendCustomChallengeAnswer(user, otp).then(success => {
                    console.log("sendCustomChallengeAnswer", success)
                    if (success.signInUserSession) {

                        ApiAction.sendOTP(mobile_number.replace('+91', '')).then(e => {
                            loginSuccess(false)
                            if (e.data.sent) {
                                navigation.replace(routes.MobileVerification, { ...route.params })
                            } else {
                                setOpenCommonModal({
                                    isVisible: true, message: e.data.message, onOkPress: () => navigation.replace(routes.MobileInput, { email_id: email_id })
                                })

                            }
                            setLoading(false)
                        }).catch(err => {
                            setOpenCommonModal({ isVisible: true, message: err })
                            loginSuccess(false)
                            console.log("errror", err)
                        })
                    } else {
                        setLoading(false)
                        // enter valid OTP   
                        setOpenCommonModal({ isVisible: true, message: "OTP is wrong please re enter " })
                    }
                }).catch(error => {
                    // Somethong went wrong
                    setOpenCommonModal({ isVisible: true, message: error.message })
                    setLoading(false)
                    console.log("Something went wrong", error)
                })
            } catch (error) {
                console.log('Something went wrong', error);
                // show error message
                // loginSuccess(false)
                setLoading(false)
                setOpenCommonModal({ isVisible: true, message: "Something Went Wrong!!!" })
            }
        } else {
            try {
                Auth.sendCustomChallengeAnswer(user, otp).then(success => {
                    if (success.signInUserSession) {
                        loginSuccess()
                    } else {
                        // enter valid OTP
                        setOpenCommonModal({ isVisible: true, message: "OTP is wrong please re enter " })
                    }
                    setLoading(false)
                }).catch(error => {
                    // Somethong went wrong
                    console.log("Something went wrong", error)
                    setOpenCommonModal({ isVisible: true, message: "Something Went Wrong!!!" })
                    setLoading(false)
                    // loginSuccess(false)
                })

            } catch (error) {
                //// Somethong went wrong
                // loginSuccess(false)
                setLoading(false)
                console.log("Something went wrong", error)
            }
        }
    }

    const loginSuccess = async (navigateToDashboard = true) => {
        const data = await Auth.currentAuthenticatedUser();
        if (data.signInUserSession) {
            const result = await ApiAction.getUserDetails()
            if (result?.data) {
                dispatch(AddToRedux(result.data, Types.USERDETAILS))
                if (navigateToDashboard) {

                    navigation.reset({
                        index: 0,
                        routes: [{ name: routes.dashboard }],
                    });
                }
            } else {
                // show wrong otp message
                try {
                    const result = await ApiAction.registerNoPhone(data.attributes.email.toLowerCase(), {}, { first_name, last_name })

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
    }

    const onResendClick = async () => {
        setLoading(true)
        //  signed in 
        route.params.user = await Auth.signIn((email_id).trim());
        setOpenCommonModal({ isVisible: true, message: "OTP Sent!!!" })
        setLoading(false)
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
        <CommonView>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <CarLogo />
                </View>
                <View>
                    <CommonText showText={'Email Verification'} fontSize={24} black />
                </View>
                <View style={styles.textinputConatiner}>
                    <CommonText regular showText={'Please enter the verification code sent to '} fontSize={14} />
                    <View style={styles.centerText}>
                        <CommonText regular showText={email_id} fontSize={14} />
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <CommonText customstyles={{ textDecorationLine: 'underline', marginLeft: 2 }} showText={'Edit'} fontSize={14} />
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={onResendClick}  >
                            <CommonText customstyles={{ textDecorationLine: 'underline' }} showText={'Resend'} fontSize={14} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Button onPress={VerifyButtonHandler} showText={'Verify'} onLoading={loading} />
            </ScrollView>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    textinputConatiner: {
        marginVertical: 15
    },
    centerText: {
        marginTop: 20,
        alignItems: 'center'
    },
    imageContainer: {
        marginVertical: 45,
        alignItems: 'center'
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    centerText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35
    },
    btn: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    }
})


export default Verification