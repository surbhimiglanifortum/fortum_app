import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState, useContext } from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import CommonText from '../../Component/Text/CommonText';
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import OtpTextinput from '../../Component/Textinput/OtpTextinput';
import Textinput from '../../Component/Textinput/Textinput'
import { Auth, Hub } from 'aws-amplify';
import * as ApiAction from '../../Services/Api'
import { useDispatch } from 'react-redux';
import * as Types from '../../Redux/Types'
import { AddToRedux } from '../../Redux/AddToRedux';
import CommonModal from '../../Component/Modal/CommonModal';
import SnackContext from '../../Utils/context/SnackbarContext'

const Verification = ({ route }) => {

    const navigation = useNavigation()
    const scheme = useColorScheme();
    const otpField1 = useRef(null);
    const otpField2 = useRef(null);
    const otpField3 = useRef(null);
    const otpField4 = useRef(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInput] = useState('101299')
    const [userInput1, setUserInput1] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const [userInput3, setUserInput3] = useState('')
    const [userInput4, setUserInput4] = useState('')
    let otpConcatData = userInput1.concat(userInput2).concat(userInput3).concat(userInput4)


    const { setOpenCommonModal } = useContext(SnackContext);


    const { email_id, signin, user, mobile_number } = route.params;

    const VerifyButtonHandler = async () => {
        setLoading(true)

        if (!signin) {
            try {

                Auth.sendCustomChallengeAnswer(user, otpConcatData).then(success => {
                    if (success.signInUserSession) {
                        
                        ApiAction.sendOTP(mobile_number.replace('+91', '')).then(e => {
                            loginSuccess(false)
                            if (e.data.sent) {
                                navigation.navigate(routes.MobileVerification, { ...route.params })
                            } else {
                                setOpenCommonModal({ isVisible: true, message: e.data.message })
                            }
                        }).catch(err => {
                            setOpenCommonModal({ isVisible: true, message: err })
                            loginSuccess(false)
                            console.log("errror", err)
                        })
                    } else {
                        loginSuccess(false)
                        // enter valid OTP   
                        setOpenCommonModal({ isVisible: true, message: "OTP is wrong please re enter " })
                    }
                }).catch(error => {
                    // Somethong went wrong
                    setOpenCommonModal({ isVisible: true, message: error.message })
                    console.log("Something went wrong", error)
                })
            } catch (error) {
                console.log('Something went wrong', error);
                // show error message
                loginSuccess(false)
                setOpenCommonModal({ isVisible: true, message: "Something Went Wrong!!!" })
            }
        } else {
            try {
                Auth.sendCustomChallengeAnswer(user, otpConcatData).then(success => {
                
                    if (success.signInUserSession) {
                        loginSuccess()
                    } else {
                        // enter valid OTP
                        setOpenCommonModal({ isVisible: true, message: "OTP is wrong please re enter " })
                    }
                    loginSuccess(false)
                }).catch(error => {
                    // Somethong went wrong
                    console.log("Something went wrong", error)
                    setOpenCommonModal({ isVisible: true, message: "Something Went Wrong!!!" })
                    loginSuccess(false)
                })

            } catch (error) {
                //// Somethong went wrong
                loginSuccess(false)
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

                    navigation.navigate(routes.dashboard)
                }
            } else {
                // show wrong otp message
                try {
                    const result = await ApiAction.registerNoPhone(data.attributes.email, {})
                    // user created at backend if not exisits
                } catch (error) {
                    setOpenCommonModal({ isVisible: true, message: "Unable to Create User" })
                }
            }


        }
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.imageContainer}>
                        <CarLogo />
                    </View>
                    <View>
                        <CommonText showText={'Email Verification'} fontSize={20} />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Please enter the verification code sent to '} fontSize={15} />
                        <View style={styles.centerText}>
                            <CommonText showText={email_id} fontSize={15} />
                            <TouchableOpacity >
                                <CommonText showText={' Edit'} fontSize={15} />
                            </TouchableOpacity>
                        </View>
                        {/* <Textinput value={userInput} onChange={setUserInput} /> */}
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
                            <CommonText showText={'Didn’t receive the code?  '} fontSize={15} />
                            <TouchableOpacity >
                                <CommonText showText={'Resend'} fontSize={15} />
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
        marginTop: 130
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


export default Verification