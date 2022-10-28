import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import CommonText from '../../Component/Text/CommonText';
import BlackText from '../../Component/Text/BlackText';
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import OtpTextinput from '../../Component/Textinput/OtpTextinput';
import Textinput from '../../Component/Textinput/Textinput'
import { Auth, Hub } from 'aws-amplify';


const Verification = ({ route }) => {

    const navigation = useNavigation()
    const scheme = useColorScheme();
    const otpField1 = useRef(null);
    const otpField2 = useRef(null);
    const otpField3 = useRef(null);
    const otpField4 = useRef(null);

    const [userInput, setUserInput] = useState('101299')
    const [userInput1, setUserInput1] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const [userInput3, setUserInput3] = useState('')
    const [userInput4, setUserInput4] = useState('')

    const { email_id, signin, user } = route.params;


    const VerifyButtonHandler = async () => {
        if (!signin) {
            try {
                const result = await Auth.confirmSignUp(email_id, userInput);

                if (result === "SUCCESS") {
                    navigation.navigate(routes.MobileVerification, { ...route.params })
                } else {
                    // show error message
                }
            } catch (error) {
                console.log('error confirming sign up', error);
                // show error message
            }
        } else {
            try {
                const cognitoUser = await Auth.sendCustomChallengeAnswer(user, userInput)
                    .then(e => {
                        console.log("response", e)

                    }).catch(e => {
                        console.log("Error", e)
                    });


                const data = await Auth.currentAuthenticatedUser();
                if (data) {
                    navigation.navigate(routes.dashboard)
                } else {
                    // show wrong otp message
                }
            } catch (e) {
                // Handle 3 error thrown for 3 incorrect attempts. 
                console.log("response", e)
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
                        {scheme == 'dark' ? <CommonText showText={'Email Verification'} fontSize={20} /> : <BlackText showText={'Email Verification'} fontSize={20} />}
                    </View>
                    <View style={styles.textinputConatiner}>
                        {scheme == 'dark' ? <CommonText showText={'Please enter the verification code sent to '} fontSize={15} /> : <BlackText showText={'Please enter the verification code sent to '} fontSize={15} />}
                        <View style={styles.centerText}>
                            {scheme == 'dark' ? <CommonText showText={email_id} fontSize={15} /> : <BlackText showText={email_id} fontSize={15} />}
                            <TouchableOpacity >
                                {scheme == 'dark' ? <CommonText showText={' Edit'} fontSize={15} /> : <BlackText showText={' Edit'} fontSize={15} />}
                            </TouchableOpacity>
                        </View>
                        <Textinput value={userInput} onChange={setUserInput} />
                        <View style={styles.otpContainer}>
                            <OtpTextinput refData={otpField1}  value={userInput1} onChange={(pin1)=>{
                                setUserInput1(pin1);
                                if(pin1!== ''){
                                    otpField2.current.focus();
                                }
                                }}  />
                            <OtpTextinput refData={otpField2} value={userInput2} onChange={(pin2)=>{
                                setUserInput2(pin2);
                                if(pin2!== ''){
                                    otpField3.current.focus();
                                }
                                }}  />
                            <OtpTextinput refData={otpField3}  value={userInput3} onChange={(pin3)=>{
                                setUserInput3(pin3);
                                if(pin3!== ''){
                                    otpField4.current.focus();
                                }
                                }}  />
                            <OtpTextinput refData={otpField4}  value={userInput4} onChange={(pin4)=>{
                                setUserInput4(pin4);
                                if(pin4!== ''){
                                    otpField4.current.focus();
                                }
                                }}  />
                            
                        </View>
                        <View style={styles.resendContainer}>
                           <CommonText showText={'Didn’t receive the code?  '} fontSize={15} /> 
                            <TouchableOpacity >
                                <CommonText showText={'Resend'} fontSize={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Button onPress={VerifyButtonHandler} showText={'Verify'} />
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