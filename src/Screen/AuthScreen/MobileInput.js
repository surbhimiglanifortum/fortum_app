import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CommonView from '../../Component/CommonView'
import Textinput from '../../Component/Textinput/Textinput';
import CommonText from '../../Component/Text/CommonText';
import CarLogo from '../../assests/svg/CarLogo';
import Button from '../../Component/Button/Button';
import * as Yup from 'yup';
import routes from '../../Utils/routes';
import colors from '../../Utils/colors'
import * as ApiAction from '../../Services/Api'
import { userExist } from '../../Utils/HelperCommonFunctions'
import TextButton from '../../Component/Button/TextButton'
import { Auth } from 'aws-amplify'


export default function MobileInput({ navigation, route }) {


    const { email_id } = route.params;
    // const email_id = 'anuj.yadav@mfilterit.com'

    const [input, setInput] = useState('')
    const [showError, setShowError] = useState('')
    const [loading, setOnLoading] = useState(false)


    lazy_array = [
        { name: 'Mobile Number', value: "mobile_number" }
    ]
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        mobile_number: Yup.string().min(10, 'Enter Valid Phone Number!').max(10, 'Enter Valid Phone Number!').matches(phoneRegExp, 'Phone Number is not valid !').required('Enter Mobile Number')

    });

    const logoutHandler = async () => {
        await Auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: routes.dashboard }],
        });
    }

    const onSubmit = () => {
        if (input != '' && input.match(phoneRegExp)) {
            setOnLoading(true)

            userExist('+91' + input).then((e) => {
                setOnLoading(false)
                setShowError("Mobile number already registered")
            }).catch(e => {
                console.log(e.code)
                if (e.code == 'UserNotFoundException') {
                    ApiAction.sendOTP(input.replace('+91', '')).then(e => {
                        setOnLoading(false)
                        if (e?.data?.sent) {
                            navigation.navigate(routes.MobileVerification, { mobile_number: input, email_id: email_id })
                        } else {
                            setShowError(e.data.message)
                        }
                    }).catch(err => {
                        setOnLoading(false)
                        setShowError(err?.message)
                    })
                } else {
                    setOnLoading(false)
                    setShowError("Mobile number already registered")
                }

            })

        } else {
            // enter valid phone number
            setShowError("Enter Valid Phone")
        }
    }

    return (
        <CommonView >
            <ScrollView contentContainerStyle={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <View style={{ marginVertical: 45 }}>
                        <CarLogo />
                    </View>
                    <View>
                        <CommonText showText={'Mobile Number'} fontSize={20} />
                        <CommonText regular showText={`Please enter the Mobile number for email ${email_id}`} fontSize={15} />
                        <View style={{
                            marginVertical: 15
                        }}>
                            <Textinput maxLength={10} keyboardType={'number-pad'} value={input} onChange={(e) => {
                                setInput(e)
                                setShowError('')
                            }} />
                            {showError && showError != '' ? (
                                <CommonText showText={showError} customstyles={{ color: colors.red }} fontSize={14} />
                            ) : null}
                        </View>
                    </View>

                    <TextButton showText={'Sign Out'} style={styles.txtBtn} onPress={logoutHandler} />
                </View>


                <View>
                    <Button onPress={onSubmit} onLoading={loading} showText={'Continue'} />
                </View>
            </ScrollView>

        </CommonView >

    )
}


const styles = StyleSheet.create({
    textinputConatiner: {
        marginVertical: 15
    },
    txtBtn: {
        alignSelf: 'center',
        paddingHorizontal: 0,
        margin: 0
    }
})