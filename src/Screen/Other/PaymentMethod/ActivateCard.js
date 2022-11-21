import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useContext } from 'react'
import colors from '../../../Utils/colors'
import CommonText from '../../../Component/Text/CommonText'
import Textinput from '../../../Component/Textinput/Textinput'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import OtpTextinput from '../../../Component/Textinput/OtpTextinput'
import Header from '../../../Component/Header/Header'
import routes from '../../../Utils/routes'
import CommonView from '../../../Component/CommonView'
import { useSelector } from 'react-redux'
import { sentKycOtp, resendPinelabOtp, validatePinelabOtp } from '../../../Services/Api'
import SnackContext from '../../../Utils/context/SnackbarContext'

const ActivateCard = () => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const { setOpenCommonModal } = useContext(SnackContext);

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const [name, setName] = useState(mUserDetails?.first_name || '')
    const [lName, setLName] = useState(mUserDetails?.last_name || '')
    const [nameError, setNameError] = useState('')
    const [lNameError, setLNameError] = useState('')
    const [loadingSign, setLoadingSign] = useState(false)
    const [disable, setDisable] = useState(true)
    const [otpError, setOtpError] = useState('')

    const otpField1 = useRef(null);
    const otpField2 = useRef(null);
    const otpField3 = useRef(null);
    const otpField4 = useRef(null);
    const otpField5 = useRef(null);
    const otpField6 = useRef(null);

    const [userInput1, setUserInput1] = useState('')
    const [userInput2, setUserInput2] = useState('')
    const [userInput3, setUserInput3] = useState('')
    const [userInput4, setUserInput4] = useState('')
    const [userInput5, setUserInput5] = useState('')
    const [userInput6, setUserInput6] = useState('')

    let otpConcatData = userInput1.concat(userInput2).concat(userInput3).concat(userInput4).concat(userInput5).concat(userInput6)

    const otpSend = async () => {
        if (name.length < 1) {
            setNameError("Please enter first the name.")
            return
        } else {
            setNameError("")
        }

        if (lName.length < 1) {
            setLNameError("Please enter last the name.")
            return
        } else {
            setLNameError("")
        }

        try {
            setLoadingSign(true)
            const payload = {
                customerName: name + lName,
                mobileNumber: mUserDetails?.phone_number,
                email: mUserDetails?.username
            }
            const result = await sentKycOtp(payload)
            if (result.data?.message) {
                if (result.data?.message === "RequestId Generated successfully") {
                    setDisable(false)
                    setOpenCommonModal({
                        isVisible: true, message: 'OTP send successfully !!!', onOkPress: () => {
                            console.log("OKPressed")
                        }
                    })
                } else {
                    setOpenCommonModal({
                        isVisible: true, message: result.data?.message, onOkPress: () => {
                            console.log("OKPressed")
                        }
                    })
                }
            }
            setLoadingSign(false)
        } catch (error) {
            setLoadingSign(false)
            console.log("Check the pinelab otp api error", error)
        }
    }

    const onResendOtp = async () => {
        if (name.length < 1) {
            setNameError("Please enter the first name.")
            return
        } else {
            setNameError("")
        }

        if (lName.length < 1) {
            setLNameError("Please enter the last name.")
            return
        } else {
            setLNameError("")
        }

        try {
            setLoadingSign(true)
            const payload = {
                email: mUserDetails?.username
            }
            const result = await resendPinelabOtp(payload)
            if (!result.data?.success) {
                setOpenCommonModal({
                    isVisible: true, message: result.data?.message, onOkPress: () => { }
                })
            } else {
                setOpenCommonModal({
                    isVisible: true, message: 'OTP resend successfully !!!', onOkPress: () => { }
                })
            }
            setLoadingSign(false)
        } catch (error) {
            console.log("On Resend OTP error", error)
            setLoadingSign(false)
        }
    }

    const otpValidation = async () => {

        if (userInput1 == '' || userInput2 == '' || userInput3 == '' || userInput4 == '' || userInput5 == '' || userInput6 == '') {
            setOtpError("Please Enter Valid Otp.")
            return;
        }

        try {
            setLoadingSign(true)
            const payload = {
                email: mUserDetails?.username,
                otp: otpConcatData
            }
            const result = await validatePinelabOtp(payload)
            if (result.data?.message) {
                if (result.data?.message?.responseMessage == "Min Kyc OTP Verified Successfully") {
                    navigation.navigate(routes.CompleteKYC, {
                        fName: name,
                        lName: lName,
                        email: mUserDetails?.username,
                        mobileNumber: mUserDetails?.phone_number
                    })
                }
            } else {
                setOpenCommonModal({
                    isVisible: true, message: result.data?.message?.responseMessage || result.data?.message, onOkPress: () => {
                        console.log("OKPressed")
                    }
                })
            }
            setLoadingSign(false)
        } catch (error) {
            setLoadingSign(false)
            console.log("OTP Verification error", error)
        }
    }


    return (
        <CommonView>
            <ScrollView>
                <Header showText={'Activate Card'} />

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'First Name'} fontSize={14} regular />
                    <Textinput value={name} onChange={setName} />
                </View>

                {
                    nameError !== '' &&
                    <CommonText customstyles={styles.errorText} showText={nameError} regular fontSize={12} />
                }

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'Last Name'} fontSize={14} regular />
                    <Textinput value={lName} onChange={setLName} />
                </View>

                {
                    lNameError !== '' &&
                    <CommonText customstyles={styles.errorText} showText={lNameError} regular fontSize={12} />
                }

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'Email ID'} fontSize={14} regular />
                    <Textinput value={mUserDetails?.username} editable={false} />
                </View>

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'Mobile Number'} fontSize={14} regular />
                    <Textinput value={mUserDetails?.phone_number} editable={false} />
                </View>

                <TouchableOpacity style={[styles.otpBtn, { borderColor: disable ? colors.green : colors.grey }]} onPress={otpSend} disabled={!disable}>
                    <CommonText showText={'Send OTP'} fontSize={18} customstyles={{ color: disable ? colors.green : colors.grey }} />
                </TouchableOpacity>

                <CommonText showText={'Enter OTP'} />
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
                            otpField5.current.focus();
                        }
                    }} />
                    <OtpTextinput refData={otpField5} value={userInput5} onChange={(pin5) => {
                        setUserInput5(pin5);
                        if (pin5 !== '') {
                            otpField6.current.focus();
                        }
                    }} />
                    <OtpTextinput refData={otpField6} value={userInput6} onChange={(pin6) => {
                        setUserInput6(pin6);
                        if (pin6 !== '') {
                            otpField6.current.focus();
                        }
                    }} />
                </View>

                {
                    otpError !== '' &&
                    <CommonText customstyles={styles.errorText} showText={otpError} regular fontSize={12} />
                }

                {
                    !disable &&
                    <View style={styles.bottomText}>
                        <CommonText showText={'Didn’t receive the code? '} regular fontSize={14} />
                        <TouchableOpacity onPress={onResendOtp}>
                            <CommonText showText={'Resend'} fontSize={14} customstyles={styles.resendText} />
                        </TouchableOpacity>
                    </View>
                }

                <Button
                    showText={'Proceed to KYC'}
                    onPress={otpValidation}
                    disable={!disable ? true : false}
                    onLoading={loadingSign}
                    bg={!disable && colors.lightGray}
                />

            </ScrollView>
        </CommonView>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',

    },
    headerText: { alignItems: 'center', marginLeft: 70 },
    textinputConatiner: {
        marginVertical: 10
    },
    button: {
        // marginTop: 130
    },
    otpBtn: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 12,
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    bottomText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    errorText: {
        color: colors.red
    },
    resendText: {
        textDecorationLine: 'underline'
    }
})

export default ActivateCard