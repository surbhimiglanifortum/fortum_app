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
            console.log("Card Order Status", result?.data)
            if (result.data?.success) {
                setBtnText('Check Status')
                if (result.data?.response?.orderStatus == 6)
                    setStatus('PROCESSED')
                if (result.data?.response?.orderStatus == 2)
                    setStatus('CREATED')
            }
            setLoading(false)
        } catch (error) {
            console.log("Card Order Status Error", error)
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
                            <IconCardLarge Svg={CardLight} />
                            <CommonText showText={'View Card Details'} black customstyles={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </CommonCard>

                    <CommonCard>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(routes.AddPinelabMoney)}>
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

                <CommonText showText={`Card Status : ${status}`} customstyles={{ marginVertical: 10, textAlign: 'center' }} />
            </ScrollView>

            {
                btnText !== 'Check Status' &&
                <Button showText={btnText} onLoading={loading} onPress={() => {
                    navigation.navigate(routes.OrderCard)
                }} />
            }

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