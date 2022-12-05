import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, Platform } from 'react-native'
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
import Loader from '../../../Component/Loader'

const ActivateCard = () => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const isAndroid = Platform.OS === 'android';

    const { setOpenCommonModal } = useContext(SnackContext);
    const navigation = useNavigation()
    const scheme = useColorScheme()

    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixthTextInputRef = useRef(null);

    const [name, setName] = useState(mUserDetails?.first_name || '')
    const [lName, setLName] = useState(mUserDetails?.last_name || '')
    const [nameError, setNameError] = useState('')
    const [lNameError, setLNameError] = useState('')
    const [loadingSign, setLoadingSign] = useState(false)
    const [otpLoader, setOtpLoader] = useState(false)
    const [disable, setDisable] = useState(true)
    const [otpError, setOtpError] = useState('')
    const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

    const refCallback = textInputRef => node => {
        textInputRef.current = node;
    };

    const onOtpKeyPress = index => {
        return ({ nativeEvent: { key: value } }) => {
            if (value === 'Backspace' && otpArray[index] === '') {
                if (index === 1) {
                    firstTextInputRef.current.focus();
                } else if (index === 2) {
                    secondTextInputRef.current.focus();
                } else if (index === 3) {
                    thirdTextInputRef.current.focus();
                } else if (index === 4) {
                    fourthTextInputRef.current.focus();
                } else if (index === 5) {
                    fifthTextInputRef.current.focus();
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
                } else if (index === 3) {
                    fifthTextInputRef.current.focus();
                } else if (index === 4) {
                    sixthTextInputRef.current.focus();
                }
            }
        };
    };

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
            setOtpLoader(true)
            const payload = {
                customerName: name + lName,
                mobileNumber: mUserDetails?.phone_number,
                email: mUserDetails?.username
            }
            const result = await sentKycOtp(payload)
            console.log("Check Response of Pinelab OTP", result.data)
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
            setOtpLoader(false)
        } catch (error) {
            setOtpLoader(false)
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
        const otp = otpArray.join('')

        if (!otp || otp == "" || otp.length < 6) {
            setOtpError("Please Enter Valid Otp.")
            return
        }

        try {
            setLoadingSign(true)
            const payload = {
                email: mUserDetails?.username,
                otp: otp
            }
            const result = await validatePinelabOtp(payload)
            console.log("Check Response of Pinelab Verify OTP", result.data)

            if (result.data?.message?.responseMessage == "Min Kyc OTP Verified Successfully") {
                navigation.replace(routes.CompleteKYC, {
                    fName: name,
                    lName: lName,
                    email: mUserDetails?.username,
                    mobileNumber: mUserDetails?.phone_number
                })
            }
            else {
                console.log("Check Invalid Response", result.data?.message?.responseMessage)
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

                <TouchableOpacity style={[styles.otpBtn, { borderColor: disable ? colors.green : colors.grey, }]} disabled={disable ? false : true} onPress={otpSend}>
                    {otpLoader ? <Loader modalOpen={otpLoader} /> : <CommonText showText={'Send OTP'} fontSize={18} customstyles={{ color: disable ? colors.green : colors.grey }} />}
                </TouchableOpacity>

                <CommonText showText={'Enter OTP'} />

                <View style={[styles.otpContainer]}>
                    {[
                        firstTextInputRef,
                        secondTextInputRef,
                        thirdTextInputRef,
                        fourthTextInputRef,
                        fifthTextInputRef,
                        sixthTextInputRef,
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
                    // onPress={() => navigation.navigate(routes.CompleteKYC)}
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
        marginBottom: 10, flexWrap: 'wrap'
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