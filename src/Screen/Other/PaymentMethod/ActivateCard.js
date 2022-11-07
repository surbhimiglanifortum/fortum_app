import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
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
import { sentKycOtp } from '../../../Services/Api'

const ActivateCard = () => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const [name, setName] = useState(mUserDetails?.first_name || '')
    const [lName, setLName] = useState(mUserDetails?.last_name || '')
    const [nameError, setNameError] = useState('')
    const [lNameError, setLNameError] = useState('')
    const [loadingSign, setLoadingSign] = useState(false)

    const proceedToKycHandler = () => {
        navigation.navigate(routes.CompleteKYC)
    }

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
                    setSnack({ message: "OTP sent successfully", open: true, color: 'success' })
                    setDisable(false)
                } else {
                    setSnack({ message: result.data?.message, open: true, color: 'success' })
                }
            }
            console.log("Check the pinelab otp api response", result.data)
            setLoadingSign(false)
        } catch (error) {
            setLoadingSign(false)
            console.log("Check the pinelab otp api error", error)
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
                    <CommonText customstyles={styles.errorText} showText={nameError} />
                }

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'Last Name'} fontSize={14} regular />
                    <Textinput value={lName} onChange={setLName} />
                </View>

                {
                    lNameError !== '' &&
                    <CommonText customstyles={styles.errorText} showText={lNameError} />
                }

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'Email ID'} fontSize={14} regular />
                    <Textinput value={mUserDetails?.username} editable={false} />
                </View>

                <View style={styles.textinputConatiner}>
                    <CommonText showText={'Mobile Number'} fontSize={14} regular />
                    <Textinput value={mUserDetails?.phone_number} editable={false} />
                </View>

                <TouchableOpacity style={styles.otpBtn} onPress={otpSend}>
                    <CommonText showText={'Send OTP'} fontSize={18} customstyles={{ color: colors.green }} />
                </TouchableOpacity>

                <CommonText showText={'Enter OTP'} />
                <View style={styles.otpContainer}>
                    <OtpTextinput />
                    <OtpTextinput />
                    <OtpTextinput />
                    <OtpTextinput />
                </View>

                <View style={styles.bottomText}>
                    <CommonText showText={'Didn’t receive the code? '} regular fontSize={14} />
                    <TouchableOpacity>
                        <CommonText showText={'Resend'} fontSize={14} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} >
                    <Button showText={'Proceed to KYC'} onPress={proceedToKycHandler} />
                </TouchableOpacity>

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
        borderColor: colors.green,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 10
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
    }
})

export default ActivateCard