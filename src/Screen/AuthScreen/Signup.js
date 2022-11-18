import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import routes from '../../Utils/routes'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { Auth, Hub } from 'aws-amplify';
import * as Yup from 'yup';
import SnackContext from '../../Utils/context/SnackbarContext'
import {userExist} from '../../Utils/HelperCommonFunctions'

const Signup = ({ route }) => {

    const { setOpenCommonModal } = useContext(SnackContext);

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const continueButtonHandler = () => {
        navigation.navigate(routes.Verification)
    }

    const lazy_array = [
        { name: 'First Name', value: "first_name" },
        { name: 'Last Name', value: "last_name" },
        { name: 'Email ID', value: "email_id" },
        { name: 'Mobile Number', value: "mobile_number" },
        { name: 'Referral Code (Optional)', value: "referral_code" }
    ]
    const { phone_number: prefillPhone_number, email: prefillEMail } = route.params;

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const SignupSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First Name Required'),
        last_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last Name Required'),
        email_id: Yup.string().email('Invalid email').matches(emailRegex, 'Email is not valid !').required('Email Required'),
        mobile_number: Yup.string().min(10, 'Enter Valid Phone Number!').max(10, 'Enter Valid Phone Number!').matches(phoneRegExp, 'Phone Number is not valid !').required('Enter Mobile Number')

    });



    const handleSignup = async (values, event) => {
        console.log(values)
        // console.log(this.cognitoService)
        let emailSignupSuccess = false
        let mobileSignupSuccess = false
        await userExist(values.email_id).then((e) => {
        }).catch(e => {
            if (e.code == 'UserNotFoundException') {
                emailSignupSuccess = true
            }
            console.log("signup response", e)
        })

        await userExist(values.mobile_number).then((e) => {
        }).catch(e => {
            if (e.code == 'UserNotFoundException') {
                mobileSignupSuccess = true
            }
            console.log("signup response", e)
        })

        if (!mobileSignupSuccess || !emailSignupSuccess) {
            // return either email or mobile already registered
            console.log("email not esdfds")
            if (!mobileSignupSuccess) {
                setOpenCommonModal({ isVisible: true, message: "Mobile Number Already registered" })
            } else {
                setOpenCommonModal({ isVisible: true, message: "Email Already registered" })
            }
        } else {
            // Signup
            const cognitoData = await Auth.signUp({
                username: values.email_id,
                password: '@Nujyadav123',
                attributes: {
                    "custom:phoneUser": "false",
                    email: values.email_id,          // optional
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            }).catch(e => {
                console.log("error", e)
                if (e.code === 'UsernameExistsException') {
                }
                if (e.code === 'InvalidPasswordException') {
                }
            })

            if (cognitoData) {
                const user = await Auth.signIn(values.email_id);
                navigation.navigate(routes.Verification, {
                    user: user,
                    email_id: values.email_id,
                    mobile_number: values.mobile_number,
                    first_name:values.first_name,
                    last_name:values.last_name
                })
            }
        }
        event.setSubmitting(false)
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <View style={styles.header}>
                        <BackButton onPress={()=>navigation.goBack()} />
                        <View style={styles.headerText}>
                            <CommonText showText={'Sign Up'} fontSize={25} />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <CommonText showText={'Please tell us a bit more about yourself'} fontSize={15} />
                    </View>

                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            referral_code: "",
                            email_id: prefillEMail || '',
                            mobile_number: prefillPhone_number || ''
                        }}
                        onSubmit={handleSignup}
                        validationSchema={SignupSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <>
                                {lazy_array.map((e, i) => {
                                    return (
                                        <View key={i} style={styles.textinputConatiner}>
                                            {scheme == 'dark' ? <CommonText showText={e.name} fontSize={14} /> : <CommonText showText={e.name} fontSize={14} />}
                                            <Textinput value={values[e.value]} onChange={handleChange(e.value)} />
                                            {errors[e.value] && touched[e.value] ? (
                                                <CommonText showText={errors[e.value]} customstyles={{ color: colors.red }} fontSize={14} />
                                            ) : null}
                                        </View>
                                    )
                                })}
                                <View style={styles.btnConatiner}>
                                    <Button onPress={handleSubmit} showText={'Sign Up'} onLoading={isSubmitting} />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    header: {
        flexDirection: 'row',

    },
    headerText: { alignItems: 'center', marginLeft: 70 },
    textinputConatiner: {
        marginVertical: 15
    },
    button: {
        marginVertical: 15
    },
    btnConatiner: { marginBottom: 15 },

})

export default Signup