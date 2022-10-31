import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Charger from '../../../assests/svg/charger'
import SettingCard from '../../../Component/Card/SettingCard'
import WhatsAppSvg from '../../../assests/svg/WhatsAppSvg'

const Support = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <Header showText={'Support'} />

                <View style={styles.headerText}>
                    <CommonText showText={'Legal'} fontSize={18} />
                </View>
                <SettingCard Svg={Charger} showText={'FAQ'} fontSize={16} />
                <SettingCard Svg={Charger} showText={'Terms and Condition'} fontSize={16} />
                <SettingCard Svg={Charger} showText={'Privancy Plicy'} fontSize={16} />
                <View style={styles.headerText}>
                    <CommonText showText={'Contact Us'} fontSize={18} />
                </View>
                <SettingCard Svg={Charger} showText={'+91 1234567890'} fontSize={16} />
                <SettingCard Svg={Charger} showText={'Support@gmail.com'} fontSize={16} />
                <SettingCard Svg={WhatsAppSvg} showText={'Whatsapp'} fontSize={16} />
            </View>
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
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
    headerText: {
        marginTop: 25,

    }
})

export default Support