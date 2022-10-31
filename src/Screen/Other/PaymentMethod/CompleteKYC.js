import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import CommonText from '../../../Component/Text/CommonText'
import Textinput from '../../../Component/Textinput/Textinput'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import routes from '../../../Utils/routes'
import { Checkbox } from 'react-native-paper';

const CompleteKYC = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [checked, setChecked] = React.useState(false);

    const proceedToKycHandler = () => {
        navigation.navigate(routes.CompleteKYC)
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <Header showText={'Complete KYC'} />
                    <View style={styles.topText}>
                        <CommonText showText={'As per RBI guidelines, it is mandatory to obtain minimum details of all cardholder/ consumers'} />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Document Type'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Document Number'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Name on Document'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Date of Birth'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Document Issue Date'} fontSize={12} />
                        <Textinput />
                    </View>

                    <View style={styles.bottomText}>
                        <Checkbox
                        color={colors.green}
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <CommonText showText={'I accept the'} fontSize={12} />
                        <CommonText showText={'Terms Of Services'} fontSize={12}  customstyles={{color:colors.blue}}/>
                    </View>
                    <View style={styles.bottomText}>
                        <Checkbox
                        color={colors.green}
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <CommonText showText={'I acknowledge that '} fontSize={12} />
                        <CommonText showText={'Terms of Service, Privacy Policy,'} fontSize={12} customstyles={{color:colors.blue}} />
                        <CommonText showText={'           and our default'} fontSize={12}  />
                        <CommonText showText={'Notification Settings.'} fontSize={12} customstyles={{color:colors.blue}} />
                    </View>
                </View>
            </ScrollView>
                    <TouchableOpacity style={styles.button} >
                        <Button showText={'Compelete to KYC'} onPress={proceedToKycHandler} />
                    </TouchableOpacity>
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
        marginVertical: 20,
        paddingHorizontal:15
    },
    otpBtn: {
        borderWidth: 1,
        borderColor: colors.green,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 10
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    bottomText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        // borderWidth:1,
        flexWrap:'wrap'
    },
    topText: {
        marginTop: 15
    }
})


export default CompleteKYC