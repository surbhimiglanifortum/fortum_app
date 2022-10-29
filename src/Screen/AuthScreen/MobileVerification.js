import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import CommonText from '../../Component/Text/CommonText';
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import OtpTextinput from '../../Component/Textinput/OtpTextinput';
import Textinput from '../../Component/Textinput/Textinput'
import { Auth, Hub } from 'aws-amplify';
import { generateSHA } from '../../Utils/HelperCommonFunctions'
import axios from 'axios'
import appconfig from '../../Utils/appconfig'
import * as ApiAction from '../../Services/Api'
import { useDispatch } from 'react-redux';

const MobileVerification = ({ route }) => {

    const dispatch = useDispatch();

    const navigation = useNavigation()
    const scheme = useColorScheme();

    // OTP
    const [userInput, setUserInput] = useState('9699')
    const [loading, setLoading] = useState(false)
    const { mobile_number, email_id, signin, user } = route.params;



    async function sendOTP(number) {
        const dateIso = new Date().toISOString()
        const counter = Math.floor(Math.random() * (999 - 100)) + 100
        const hash = generateSHA(number, dateIso, counter.toString());
        console.log("akjshsadhhdsahdaj")
        console.log({ number: number, hash: hash, dateiso: dateIso, counter: counter })

        const url = appconfig.TOTAL_BASE_URL + '/sendotp'
        try {
            const result = await axios.post(url, { number: number, hash: hash, dateiso: dateIso, counter: counter.toString() })
            console.log("Axios result is ", result.status, result.data, result)
            return result.data
        } catch (e) {
            console.log("Error occurred while sending OTP")
            return { sent: false, message: 'Server error' }
        }
    }


    useEffect(() => {
        // signin =>  user validation is remaining
        if (!signin) {
            sendOTP(mobile_number.replace('+91', '')).then(e => {

            }).catch(err => {

            })
        }


    }, [])


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
        if (!signin) {
            verifyOTP(mobile_number.replace("+91", ""), userInput).then(async r => {
                console.log("verifyOTP", r)
                if (r?.verified) {
                    // SIgnup to cognito
                    const cognitoResult = await Auth.signUp({
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
                    })

                    loginSuccess()
                } else {
                    // failed to verify OTP
                }
            })
        } else {
            
            try {
                await Auth.sendCustomChallengeAnswer(user, userInput)

                    .then(e => {
                        console.log("response", e)
                        loginSuccess()
                    }).catch(e => {
                        console.log("Error", e)
                    });

            } catch (e) {
                // Handle 3 error thrown for 3 incorrect attempts. 
                console.log("response", e)
            }
        }

    }

    const loginSuccess = async () => {
        const data = await Auth.currentAuthenticatedUser();
        if (data) {
            const result = await ApiAction.getUserDetails()
            if (result.data) {
                dispatch(AddToRedux(result.data, Types.USERDETAILS))
            } else {
                throw { code: "UserNotFound" }
            }
            navigation.navigate(routes.dashboard)

        } else {
            // show wrong otp message
            throw { code: "UserNotFound" }
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
                        <CommonText showText={'Mobile Verification'} fontSize={20} />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Please enter the verification code sent to '} fontSize={15} />
                        <View style={styles.centerText}>
                            <CommonText showText={email_id} fontSize={15} />
                            <TouchableOpacity >
                                <CommonText showText={' Edit'} fontSize={15} />
                            </TouchableOpacity>
                        </View>
                        <Textinput value={userInput} onChange={setUserInput} />

                        <View style={styles.otpContainer}>
                            <OtpTextinput />
                            <OtpTextinput />
                            <OtpTextinput />
                            <OtpTextinput />
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