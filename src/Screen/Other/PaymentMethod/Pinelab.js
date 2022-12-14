import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import routes from '../../../Utils/routes'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import Header from '../../../Component/Header/Header'
import CommonCard from '../../../Component/Card/CommonCard'
import WalletLight from '../../../assests/svg/Wallet_light'
import CardLight from '../../../assests/svg/Card_light'
import RupeeLight from '../../../assests/svg/Ruppe_light'
import CommonView from '../../../Component/CommonView'
import PinelabCard from '../../../assests/svg/PinelabCard'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, checkCardOrderStatus } from '../../../Services/Api'
import { AddToRedux } from '../../../Redux/AddToRedux'
import * as Types from '../../../Redux/Types'
import GlobalDefines from '../../../Utils/globalDefines'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'
import PaymentSvg from '../../../assests/svg/PaymentSvg'
import RupeesSvg from '../../../assests/svg/RupeesSvg'
import WalletSvg from '../../../assests/svg/wallet'

const FortumChargeAndDriveCard = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const dispatch = useDispatch();

    const [status, setStatus] = useState('')
    const [btnText, setBtnText] = useState('Order Card')
    const [loading, setLoading] = useState(false)

    const passbookButtonHAndler = () => {
        navigation.navigate(routes.Passbook)
    }

    const _onPresstermsCondition = () => {
        console.log('first')
        Linking.openURL(GlobalDefines.tncURL);
    }
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const getDetails = async () => {
        const result = await getUserDetails();
        if (result.data?.pinelabs_account) {
            dispatch(AddToRedux(result.data, Types.USERDETAILS))
        }
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        getDetails()
    }, [isFocused])

    useEffect(() => {
        orderStatus()
    }, [])


    const orderStatus = async () => {
        setLoading(true)
        try {
            const payload = {
                username: mUserDetails?.username
            }
            const result = await checkCardOrderStatus(payload)
            if (result.data?.success) {
                setBtnText('Check Status')
                if (result.data?.response?.orderStatus == 6)
                    setStatus('PROCESSED')
                if (result.data?.response?.orderStatus == 2)
                    setStatus('CREATED')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <CommonView >
            <ScrollView>
                <Header showText={'Fortum Charge & Drive Card'} />
                <View style={{ marginTop: 20 }}>
                    <CommonCard>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(routes.CardDetails)}>
                            <CommonIconCard Svg={PaymentSvg} />
                            <CommonText showText={'View Card Details'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>

                    <CommonCard>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(routes.AddPinelabMoney)}>
                            <CommonIconCard Svg={RupeesSvg} />
                            <CommonText showText={'Add Money'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>

                    <CommonCard>
                        <TouchableOpacity style={styles.card} onPress={passbookButtonHAndler}>
                            <CommonIconCard Svg={WalletSvg} />
                            <CommonText showText={'Passbook'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>
                </View>

                <View style={styles.centerText}>
                    <TouchableOpacity onPress={_onPresstermsCondition} >
                        <CommonText fontSize={14}>{'View'}
                            <CommonText fontSize={14} customstyles={styles.linkText} >{'Terms And Conditions'}</CommonText>
                        </CommonText>
                    </TouchableOpacity>
                </View>

                <PinelabCard width={'100%'} />

                {status != '' && <CommonText showText={`Card Status : ${status}`} customstyles={{ marginVertical: 10, textAlign: 'center' }} />}
            </ScrollView>

            {/* {
                btnText !== 'Check Status' &&
                <Button showText={btnText} onLoading={loading} onPress={() => {
                    navigation.navigate(routes.OrderCard)
                }} />
            } */}

        </CommonView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: 30,
        paddingHorizontal: 25
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