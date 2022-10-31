import { View, SafeAreaView, StyleSheet, useColorScheme, } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import PersonalCodeCard from '../../../Component/Card/PersonalCodeCard'
import { scale } from 'react-native-size-matters'
import WhatsAppSvg from '../../../assests/svg/WhatsAppSvg'
import SmallButton from '../../../Component/Button/SmallButton'
import MessengerSvg from '../../../assests/svg/MessengerSvg'

const ReferAndEarn = () => {
    const navigation = useNavigation()
    const scheme = useColorScheme()


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <Header showText={'Refer & Earn'} />

                <View style={styles.headerText}>
                    <CommonText showText={'Copy your code, share it with your friends to earn rewards'} fontSize={15} />
                </View>
                <View style={styles.headerText}>
                    <CommonText showText={'Your personal code'} fontSize={13} />
                    <PersonalCodeCard showText={'HDAB78992'} />
                </View>
                <View style={styles.centerView}>
                    <CommonText showText={'Or share code via'} fontSize={13} />
                </View>
                <View style={styles.middleBtn}>
                    <SmallButton Svg={MessengerSvg} />
                    <SmallButton Svg={WhatsAppSvg} />
                    <SmallButton Svg={WhatsAppSvg} />
                </View>
                <View style={styles.bottomContainer}>
                    <CommonText showText={'How it works?'} />
                    <View style={styles.card}>
                        <View style={styles.cardInner}>
                            <View style={styles.numberContainer}>
                                <CommonText showText={'1'} fontSize={15} customstyles={{color:colors.green}}  />
                            </View>
                            <CommonText showText={'Invite your friends '} />
                        </View>
                        <View style={styles.cardInner}>
                            <View style={styles.numberContainer}>
                                <CommonText showText={'2'} fontSize={15} customstyles={{color:colors.green}}  />
                            </View>
                            <CommonText showText={'They hit the road with ₹100 off '} />
                        </View>
                        <View style={styles.cardInner}>
                            <View style={styles.numberContainer}>
                                <CommonText showText={'3'} fontSize={15} customstyles={{color:colors.green}}  />
                            </View>
                            <CommonText showText={'You make saving! '} />
                        </View>
                    </View>
                </View>

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
        marginTop: 35,

    },
    centerView: {
        alignSelf: 'center',
        marginVertical: scale(30)
    },
    middleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '70%',

    },
    bottomContainer: {
        marginTop: scale(80)
    },
    card: {
        backgroundColor: colors.white,
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    cardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    numberContainer: {
        backgroundColor: colors.lightgreen,
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 100,
        marginRight: 10
    }
})

export default ReferAndEarn