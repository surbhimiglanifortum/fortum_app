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
import { useSelector } from 'react-redux'
import { updateProfileService } from '../../Services/Api'

const Profile = ({ route }) => {

    const userData = route.params;
    const { phone_number: prefillPhone_number, email: prefillEMail } = route.params;

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const username = mUserDetails?.username

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const lazy_array = [
        { name: 'First Name', value: "first_name",enable: false, },
        { name: 'Last Name', value: "last_name",enable: false, },
        { name: 'Email ID', value: "email_id", enable: false, },
        { name: 'Mobile Number', value: "mobile_number", enable: false, },

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

    const handleUpdate = async (values, event) => {

        const res = await updateProfileService(username,values)

        
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
                            first_name: userData?.userDetailsData?.userDetails?.first_name || '',
                            last_name: userData?.userDetailsData?.userDetails?.last_name || '',

                            email_id: userData?.userDetailsData?.userDetails?.email || '',
                            mobile_number: userData?.userDetailsData?.phone_number || ''
                        }}
                        onSubmit={handleUpdate}
                        validationSchema={SignupSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <>
                                {lazy_array.map((e, i) => {
                                    return (
                                        <View key={i} style={styles.textinputConatiner}>
                                            <CommonText showText={e.name} fontSize={14} />
                                            <Textinput value={values[e.value]} onChange={handleChange(e.value)} placeholder={e.name} editable={e.enable} />
                                            {errors[e.value] && touched[e.value] ? (
                                                <CommonText showText={errors[e.value]} customstyles={{ color: colors.red }} fontSize={14} />
                                            ) : null}
                                        </View>
                                    )
                                })}
                                <View style={styles.button}>
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
        marginTop: 20
    },
})

export default Profile