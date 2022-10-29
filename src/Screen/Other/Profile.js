import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import BlackText from '../../Component/Text/BlackText'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'

const Profile = ({route}) => {
    const userData=route.params;
    const { phone_number: prefillPhone_number, email: prefillEMail } = route.params;

    console.log(userData.userDetailsData.userDetails.first_name,'..............user')
    const navigation = useNavigation()
    const scheme = useColorScheme()
    
    const lazy_array = [
        { name: 'First Name', value: "first_name" },
        { name: 'Last Name', value: "last_name" },
        { name: 'Email ID', value: "email_id" },
        { name: 'Mobile Number', value: "mobile_number" },
       
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
                    <View style={styles.textinputConatiner}>
                       <CommonText showText={'First Name'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                       <CommonText showText={'Last Name'} fontSize={12} /> 
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                       <CommonText showText={'Email ID'} fontSize={12} /> 
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                       <CommonText showText={'Mobile Number'} fontSize={12} /> 
                        <Textinput />
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Button  showText={'Save'} />
                    </TouchableOpacity>
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