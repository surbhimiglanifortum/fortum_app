import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import { updateFirstName, updateLastName } from '../../Services/Api'
import SnackContext from '../../Utils/context/SnackbarContext'
import CommonView from '../../Component/CommonView'
import Header from '../../Component/Header/Header'

const Profile = ({ route }) => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const username = mUserDetails?.username

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const { setOpenCommonModal } = useContext(SnackContext)

    const lazy_array = [
        { name: 'First Name', value: "first_name", enable: true, },
        { name: 'Last Name', value: "last_name", enable: true, },
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

    const handleUpdate = (values, event) => {
        try {
            updateFirstName(username, values.first_name).then((res) => {
                updateLastName(username, values.last_name).then((result) => {
                    console.log("Check Profile Update Result", res.data, result.data)
                    setOpenCommonModal({
                        isVisible: true, message: "Profile Updated Successfully !!!", onOkPress: () => {
                            navigation.goBack();
                        }
                    })
                    // return
                }).catch(error => {
                    console.log("Last Name Update Error", error)
                })
            }).catch(err => {
                console.log("Last Name Update Error", err)
            })
        } catch (error) {
            console.log("Check Profile Update Error", error)
        }
    }

    return (
        <CommonView >
            <ScrollView >
                <Header showText={'Profile'} />
                <Formik
                    initialValues={{
                        first_name: mUserDetails?.first_name || '',
                        last_name: mUserDetails?.last_name || '',
                        email_id: mUserDetails?.username || '',
                        mobile_number: mUserDetails?.phone_number || ''
                    }}
                    onSubmit={handleUpdate}
                    validationSchema={SignupSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
                        <>
                            {lazy_array.map((e, i) => {
                                return (
                                    <View key={i} style={styles.textinputConatiner}>
                                        <CommonText showText={e.name} fontSize={14} regular />
                                        <Textinput value={values[e.value]} onChange={handleChange(e.value)} placeholder={e.name} editable={e.enable} />
                                        {errors[e.value] && touched[e.value] ? (
                                            <CommonText showText={errors[e.value]} customstyles={{ color: colors.red }} fontSize={14} />
                                        ) : null}
                                    </View>
                                )
                            })}
                            <Button onPress={handleSubmit} showText={'Save'} onLoading={isSubmitting} style={styles.button} />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    textinputConatiner: {
        marginVertical: 15
    },
    button: {
        marginTop: 20,
    },
})

export default Profile