import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import BlackText from '../../Component/Text/BlackText'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import routes from '../../Utils/routes'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import { Auth, Hub } from 'aws-amplify';

const Signup = ({ route }) => {
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


    const handleSignup = async (values, event) => {

        const cognitoData = await Auth.signUp({
            username: values.email_id,
            password: '@Nujyadav234',
            attributes: {
                "custom:phoneUser": "false",
                email: values.email_id,          // optional
                phone_number: event.mobile_number,   // optional - E.164 number convention
                // other custom attributes c
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
        console.log("cognitoData", cognitoData)
        if (cognitoData) {
            navigation.navigate(routes.Verification,{...values})
        }
        event.setSubmitting(false)
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <View style={styles.header}>
                        <BackButton />
                        <View style={styles.headerText}>
                            {scheme == 'dark' ? <CommonText showText={'Sign Up'} fontSize={25} /> : <BlackText showText={'Sign Up'} fontSize={25} />}
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        {scheme == 'dark' ? <CommonText showText={'Please tell us a bit more about yourself'} fontSize={15} /> : <BlackText showText={'Please tell us a bit more about yourself'} fontSize={15} />}
                    </View>

                    <Formik
                        initialValues={{
                            first_name: "Anuj",
                            last_name: "Yadav",
                            referral_code: "",
                            email_id: prefillEMail || 'y.anuj98@gmail.com',
                            mobile_number: prefillPhone_number || ''
                        }}
                        onSubmit={handleSignup}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <>
                                {lazy_array.map((e) => {
                                    return (
                                        <View style={styles.textinputConatiner}>
                                            {scheme == 'dark' ? <CommonText showText={e.name} fontSize={14} /> : <BlackText showText={e.name} fontSize={14} />}
                                            <Textinput value={values[e.value]} onChange={handleChange(e.value)} />
                                        </View>
                                    )
                                })}

                                <Button onPress={handleSubmit} showText={'SignUp'} onLoading={isSubmitting} />
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
})

export default Signup