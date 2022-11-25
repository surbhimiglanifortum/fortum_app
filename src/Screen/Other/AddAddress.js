import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import CommonView from '../../Component/CommonView/index'
import CommonCard from '../../Component/Card/CommonCard/index'
import DenseCard from '../../Component/Card/DenseCard/index'
import Header from '../../Component/Header/Header'
import { Formik } from 'formik'
import * as Yup from 'yup';
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import colors from '../../Utils/colors'
import Button from '../../Component/Button/Button'
import WhiteButton from '../../Component/Button/WhiteButton'
import { addAddressService } from '../../Services/Api'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SnackContext from '../../Utils/context/SnackbarContext'


const AddAddress = () => {
    const { setOpenCommonModal } = useContext(SnackContext);

    const navigation = useNavigation()
    const lazy_array = [
        { name: 'First Name *', value: "first_name" },
        { name: 'Last Name *', value: "last_name" },
        { name: 'Mobile Number *', value: "mobile_number" },
        { name: 'Address Line 1 *', value: "address_line1" },
        { name: 'Address Line 2 *', value: "address_line2" },
        { name: 'Postal Code *', value: "postal_code" },
        { name: 'City *', value: "city" },
        { name: 'State *', value: "state" },
    ]

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const SignupSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First Name Required'),
        last_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last Name Required'),
        mobile_number: Yup.string().min(10, 'Enter Valid Phone Number!').max(10, 'Enter Valid Phone Number!').matches(phoneRegExp, 'Phone Number is not valid !').required('Enter Mobile Number'),
        address_line1: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Address 1 Required'),
        address_line2: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Address 2 Required'),
        postal_code: Yup.string().min(6, 'Enter Valid Postal Code!').max(6, 'Enter Valid Postal Code!').matches(phoneRegExp, 'postal Code is not valid !').required('Postal Code Required'),

        city: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('city Name Required'),
        state: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('state Name Required'),
    });


    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const username = mUserDetails?.username

    const handleSignup = async (values, event) => {
        let objToSend = {}
        objToSend.address = values.address_line1
        objToSend.address_line_2 = values.address_line2
        objToSend.city = values.city
        objToSend.country = values.state
        objToSend.first_name = values.first_name
        objToSend.last_name = values.last_name
        objToSend.postal_code = values.postal_code
        objToSend.phone = values.mobile_number
        const res = await addAddressService(objToSend, username)
        navigation.goBack()
        if (res) {
            setOpenCommonModal({ isVisible: true, message: "Address Add Successfully" })
            return
        }
    }


    return (
        <CommonView>
            <Header showText={'Add Address'} />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            referral_code: "",
                            mobile_number: '',
                            address_line1: '',
                            address_line_2: '',
                            postal_code: '',
                            city: '',
                            state: '',
                        }}
                        onSubmit={handleSignup}
                        validationSchema={SignupSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
                            <>
                                {lazy_array.map((e, i) => {
                                    return (
                                        <View key={i} style={styles.textinputConatiner}>
                                            <CommonText showText={e.name} fontSize={14} />
                                            <Textinput value={values[e.value]} onChange={handleChange(e.value)} />
                                            <View>

                                            </View>
                                            {errors[e.value] && touched[e.value] ? (
                                                <CommonText showText={errors[e.value]} customstyles={{ color: colors.red }} fontSize={14} />
                                            ) : null}
                                        </View>
                                    )
                                })}
                                <View style={styles.btnConatiner}>
                                    <View style={{ width: '48%' }}>
                                        <WhiteButton showText={'Cancel'} onPress={() => { navigation.goBack() }} />
                                    </View>
                                    <View style={{ width: '48%' }}>
                                        <Button onPress={handleSubmit} showText={'Save'} onLoading={isSubmitting} />
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </CommonView>
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
    btnConatiner: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

})

export default AddAddress