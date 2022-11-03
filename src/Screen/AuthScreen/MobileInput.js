import { View, Text, ScrollView, StyleSheet } from 'react-native'
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
import { generateSHA } from '../../Utils/HelperCommonFunctions'


export default function MobileInput({ navigation, route }) {


    // const { email_id } = route.params;
    const email_id = 'anuj.yadav@mfilterit.com'

    const [input, setInput] = useState('7532078797')
    const [showError, setShowError] = useState('')
    const [loading, setOnLoading] = useState(false)


    lazy_array = [
        { name: 'Mobile Number', value: "mobile_number" }
    ]
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        mobile_number: Yup.string().min(10, 'Enter Valid Phone Number!').max(10, 'Enter Valid Phone Number!').matches(phoneRegExp, 'Phone Number is not valid !').required('Enter Mobile Number')

    });


    const onSubmit = () => {
        if (input != '' && input.match(phoneRegExp)) {
            setOnLoading(true)
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
                console.log("errror", err)
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
                        <CommonText showText={`Please enter the Mobile number for email ${email_id}`} fontSize={15} />
                        <View style={{
                            marginVertical: 15
                        }}>
                            <Textinput keyboardType={'number-pad'} value={input} onChange={(e) => {
                                setInput(e)
                                setShowError('')
                            }} />
                            {showError && showError != '' ? (
                                <CommonText showText={showError} customstyles={{ color: colors.red }} fontSize={14} />
                            ) : null}
                        </View>

                    </View>
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
    }

})