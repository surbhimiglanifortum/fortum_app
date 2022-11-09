import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Charger from '../../../assests/svg/charger'
import SettingCard from '../../../Component/Card/SettingCard'
import WhatsAppSvg from '../../../assests/svg/WhatsAppSvg'
import FAQSvg from '../../../assests/svg/FAQSvg'
import TermAndCondtionSvg from '../../../assests/svg/TermAndCondtionSvg'
import PrivacySvg from '../../../assests/svg/PrivacySvg'
import CallSvg from '../../../assests/svg/CallSvg'
import SupportSvg from '../../../assests/svg/SupportSvg'
import WhatsSvg from '../../../assests/svg/WhatsSvg'

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
                <SettingCard Svg={FAQSvg} showText={'FAQ'} fontSize={16} />
                <SettingCard Svg={TermAndCondtionSvg} showText={'Terms and Condition'} fontSize={16} />
                <SettingCard Svg={PrivacySvg} showText={'Privancy Plicy'} fontSize={16} />
                <View style={styles.headerText}>
                    <CommonText showText={'Contact Us'} fontSize={18} />
                </View>
                <SettingCard Svg={CallSvg} showText={'+91 1234567890'} fontSize={16} />
                <SettingCard Svg={SupportSvg} showText={'Support@gmail.com'} fontSize={16} />
                <SettingCard Svg={WhatsSvg} showText={'Whatsapp'} fontSize={16} />
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
paddingHorizontal:14
    }
})

export default Support