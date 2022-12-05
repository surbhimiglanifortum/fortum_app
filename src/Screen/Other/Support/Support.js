import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, Linking } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import SettingCard from '../../../Component/Card/SettingCard'
import FAQSvg from '../../../assests/svg/FAQSvg'
import TermAndCondtionSvg from '../../../assests/svg/TermAndCondtionSvg'
import PrivacySvg from '../../../assests/svg/PrivacySvg'
import CallSvg from '../../../assests/svg/CallSvg'
import SupportSvg from '../../../assests/svg/SupportSvg'
import WhatsSvg from '../../../assests/svg/WhatsSvg'
import routes from '../../../Utils/routes'
import CommonView from '../../../Component/CommonView'
import GlobalDefines from '../../../Utils/globalDefines'
import MailSvg from '../../../assests/svg/MailSvg'
import HelperSvg from '../../../assests/svg/HelperSvg'

const Support = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const faqHandler = () => {
        navigation.navigate(routes.FaqPage)
    }

    const _onPresstermsCondition = () => {
        Linking.openURL(GlobalDefines.tncURL);
    }
    const _onPressPrivacy = () => {
        Linking.openURL(GlobalDefines.privacyURL);
    }

    const onPressMobileNumberClick = () => {
        let number = '18001203578'
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    }

    const _onpressEmail = () => {
        Linking.openURL('mailto:support@chargedrive.in');
    }

    const sendWhatsApp = () => {
        let msg = "type something";
        let phoneWithCountryCode = "xxxxxxxxxx";

        let mobile = '7982980107'
        Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
        if (mobile) {
            if (msg) {
                let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
                Linking.openURL(url)
                    .then(data => {

                    })
                    .catch(() => {
                        alert("Make sure WhatsApp installed on your device");
                    });
            } else {
                alert("Please insert message to send");
            }
        } else {
            alert("Please insert mobile no");
        }
    };

    return (
        <CommonView>
            <Header showText={'Support'} />
            <CommonText showText={'Legal'} fontSize={14} customstyles={styles.headerText} />
            <SettingCard Svg={HelperSvg} showText={'FAQ'} fontSize={16} onPress={faqHandler} />
            <SettingCard Svg={TermAndCondtionSvg} showText={'Terms and Condition'} fontSize={16} onPress={_onPresstermsCondition} />
            <SettingCard Svg={PrivacySvg} showText={'Privacy Policy'} fontSize={16} onPress={_onPressPrivacy} />
            <CommonText showText={'Contact Us'} fontSize={14} customstyles={styles.headerText} />
            <SettingCard Svg={CallSvg} showText={'18001203578'} fontSize={16} onPress={onPressMobileNumberClick} />
            <SettingCard Svg={MailSvg} showText={'support@chargedrive.in'} fontSize={16} onPress={_onpressEmail} />
            {/* <SettingCard Svg={WhatsSvg} showText={'Whatsapp'} fontSize={16} onPress={sendWhatsApp} /> */}
        </CommonView>
    )
}

const styles = StyleSheet.create({

    headerText: {
        marginTop: 25,
        paddingHorizontal: 14
    }
})

export default Support