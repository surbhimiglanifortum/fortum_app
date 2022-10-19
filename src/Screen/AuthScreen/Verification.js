import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import CommonText from '../../Component/Text/CommonText';
import BlackText from '../../Component/Text/BlackText';
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import OtpTextinput from '../../Component/Textinput/OtpTextinput';

const Verification = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme();

    const VerifyButtonHandler = () => {
        navigation.navigate(routes.dashboard)
    }

    
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.imageContainer}>
                        <CarLogo />
                    </View>
                    <View>
                        {scheme == 'dark' ? <CommonText showText={'Email Verification'} fontSize={20} /> : <BlackText showText={'Email Verification'} fontSize={20} />}
                    </View>
                    <View style={styles.textinputConatiner}>
                        {scheme == 'dark' ? <CommonText showText={'Please enter the verification code sent to '} fontSize={15} /> : <BlackText showText={'Please enter the verification code sent to '} fontSize={15} />}
                        <View style={styles.centerText}>
                            {scheme == 'dark' ? <CommonText showText={'randam@gmail.com '} fontSize={15} /> : <BlackText showText={'randam@gmail.com '} fontSize={15} />}
                            <TouchableOpacity >
                                {scheme == 'dark' ? <CommonText showText={'Edit'} fontSize={15} /> : <BlackText showText={'Edit'} fontSize={15} />}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.otpContainer}>
                        <OtpTextinput />
                        <OtpTextinput />
                        <OtpTextinput />
                        <OtpTextinput />
                        </View>
                        <View style={styles.resendContainer}>
                            {scheme == 'dark' ? <CommonText showText={'Didn’t receive the code?  '} fontSize={15} /> : <BlackText showText={'Didn’t receive the code?  '} fontSize={15} />}
                            <TouchableOpacity >
                                {scheme == 'dark' ? <CommonText showText={'Resend'} fontSize={15} /> : <BlackText showText={'Resend'} fontSize={15} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Button onPress={VerifyButtonHandler} showText={'Verify'} />
                    </TouchableOpacity>
                   
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    textinputConatiner: {
        marginVertical: 15
    },
    button: {
        marginTop: 130
    },
    centerText: {
        marginTop: 20,
        alignItems: 'center'
    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
    bottomText: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 50
    },
    imageContainer: {
        marginVertical: 45
    },
    otpContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingHorizontal:20,
      marginTop:10,
    },
    centerText:{ flexDirection: 'row', alignItems: 'center' },
    resendContainer:{ flexDirection: 'row', alignItems: 'center' ,marginTop:35},

})


export default Verification