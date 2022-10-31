    import { View,SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
    import React from 'react'
    import colors from '../../../Utils/colors'
    import CommonText from '../../../Component/Text/CommonText'
    import Textinput from '../../../Component/Textinput/Textinput'
    import Button from '../../../Component/Button/Button'
    import { useNavigation } from '@react-navigation/native'
    import OtpTextinput from '../../../Component/Textinput/OtpTextinput'
    import Header from '../../../Component/Header/Header'
    import routes from '../../../Utils/routes'

    const ActivateCard = () => {

        const navigation = useNavigation()
        const scheme = useColorScheme()
    const proceedToKycHandler=()=>{
        navigation.navigate(routes.CompleteKYC)
    }
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
                <ScrollView>
                    <View style={styles.innerContainer}>
                        {/* <Header /> */}
                        <Header showText={'Activate Card'} />
                        <View style={{ marginVertical: 10 }}>
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
                        <TouchableOpacity style={styles.otpBtn}>
                            <CommonText showText={'Send OTP'} fontSize={18} customstyles={{color:colors.green}}  />
                        </TouchableOpacity>
                            <CommonText showText={'Enter OTP'} />
                        <View style={styles.otpContainer}>
                            <OtpTextinput />
                            <OtpTextinput />
                            <OtpTextinput />
                            <OtpTextinput />
                        </View>
                        <View style={styles.bottomText}>
                        <CommonText showText={'Didn’t receive the code? '} />
                        <TouchableOpacity>
                            <CommonText showText={'Resend'} fontSize={16} />
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} >
                            <Button showText={'Proceed to KYC'} onPress={proceedToKycHandler} />
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
            marginVertical: 10
        },
        button: {
            // marginTop: 130
        },
        otpBtn:{
            borderWidth:1,
            borderColor:colors.green,
            paddingVertical:15,
            paddingHorizontal:10,
            alignItems:'center',
            marginBottom:20,
            marginTop:10,
            borderRadius:10
        },
        otpContainer:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            marginBottom:10
        },
        bottomText:{
            flexDirection:'row',
            alignItems:'center',
            marginVertical:10
        }
    })

    export default ActivateCard