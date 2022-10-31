import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import * as Yup from 'yup';

const Profile = ({ route }) => {

    const userData = route.params;
    const { phone_number: prefillPhone_number, email: prefillEMail } = route.params;

    console.log(userData.userDetailsData.userDetails.first_name, '..............user')
    const navigation = useNavigation()
    const scheme = useColorScheme()

    const lazy_array = [
        { name: 'First Name', value: "first_name", placeHolder: userData?.userDetailsData?.userDetails?.first_name },
        { name: 'Last Name', value: "last_name", placeHolder: userData?.userDetailsData?.userDetails?.last_name },
        { name: 'Email ID', value: "email_id", placeHolder: userData?.userDetailsData?.userDetails?.email },
        { name: 'Mobile Number', value: "mobile_number", placeHolder: userData?.userDetailsData?.phone_number },

    ]
    const SignupSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First Name Required'),
        last_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last Name Required'),

    });

    const handleSignup = async (values, event) => {

    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <View style={styles.header}>
                        <BackButton />
                        <View style={styles.headerText}>
                            <CommonText showText={'Profile'} fontSize={25} />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                    </View>

                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: "",

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
                                            <Textinput value={values[e.value]} onChange={handleChange(e.value)} placeholderText={values[e.placeHolder]} />
                                            {errors[e.value] && touched[e.value] ? (
                                                <CommonText showText={errors[e.value]} customstyles={{ color: colors.red }} fontSize={14} />
                                            ) : null}
                                        </View>
                                    )
                                })}
                                <View style={styles.btnConatiner}>
                                    <Button onPress={handleSubmit} showText={'Save'} onLoading={isSubmitting} />
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
        marginTop: 130
    },
})

export default Profile