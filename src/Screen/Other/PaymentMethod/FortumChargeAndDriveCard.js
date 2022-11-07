import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import routes from '../../../Utils/routes'
import WalletSvg from '../../../assests/svg/wallet'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import Header from '../../../Component/Header/Header'
import CommonCard from '../../../Component/Card/CommonCard'
import WalletLight from '../../../assests/svg/Wallet_light'
import CardLight from '../../../assests/svg/Card_light'
import RupeeLight from '../../../assests/svg/Ruppe_light'
import CommonView from '../../../Component/CommonView'
import PinelabCard from '../../../assests/svg/PinelabCard'

const FortumChargeAndDriveCard = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const actiavteButtonHAndler = () => {
        navigation.navigate(routes.ActivateCard)
    }
    const passbookButtonHAndler = () => {
        navigation.navigate(routes.Passbook)
    }
    return (
        <CommonView >
            <ScrollView>

                <Header showText={'Fortum Charge & Drive Card'} />

                {false &&
                    <>
                        <View style={styles.headerText}>
                            <CommonText showText={'Activate your prepaid card by following ew steps. Today!'} fontSize={15} />
                        </View>
                        <View style={styles.headerText}>
                            <CommonText showText={'Accepted at all merchant outlets & can be used for online Ecom transaction'} fontSize={15} />
                        </View>
                    </>
                }

                <View style={{ marginTop: 20 }}>
                    <CommonCard>
                        <TouchableOpacity style={styles.card}>
                            <IconCardLarge Svg={CardLight} />
                            <CommonText showText={'View Card Details'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>
                    <CommonCard>
                        <TouchableOpacity style={styles.card}>
                            <IconCardLarge Svg={RupeeLight} />
                            <CommonText showText={'Add Money'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>
                    <CommonCard>
                        <TouchableOpacity style={styles.card} onPress={passbookButtonHAndler}>
                            <IconCardLarge Svg={WalletLight} />
                            <CommonText showText={'Passbook'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>
                </View>

                <View style={styles.centerText}>
                    <CommonText fontSize={14}>{'View'} <CommonText fontSize={14} onPress={() => { Linking.openURL('https://www.google.com/') }} customstyles={styles.linkText} >{'Terms And Condition'}</CommonText></CommonText>
                </View>

                <PinelabCard width={'100%'} />

            </ScrollView>

            {false &&
                <View style={styles.btnContainer}>
                    <Button showText={'Activate'} onPress={actiavteButtonHAndler} />
                </View>
            }

        </CommonView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: 30,
    },
    btnContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    centerText: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        color: colors.blue,
        textDecorationLine: 'underline'
    }
})


export default FortumChargeAndDriveCard