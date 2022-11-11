import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, useColorScheme, View, TouchableOpacity, ScrollView } from 'react-native'
import CommonView from '../../../Component/CommonView'
import DenseCard from '../../../Component/Card/DenseCard'
import Header from '../../../Component/Header/Header'
import LinearInput from '../../../Component/Textinput/linearInput'
import CommonCard from '../../../Component/Card/CommonCard'
import CommonText from '../../../Component/Text/CommonText'
import colors from '../../../Utils/colors'
import WhiteButton from '../../../Component/Button/WhiteButton'
import Button from '../../../Component/Button/Button'
import { loadWalletMoney } from '../../../Services/Api'
import { Picker } from '@react-native-community/picker';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import routes from '../../../Utils/routes'
import SnackContext from '../../../Utils/context/SnackbarContext'

const AddPinelabMoney = ({ route }) => {

    const scheme = useColorScheme()
    const navigation = useNavigation()

    const { setOpenCommonModal } = useContext(SnackContext)

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const [amount, setAmount] = useState({ value: '0', error: '' });
    const [loadingSign, setLoadingSign] = useState(false)

    const isFocused = useIsFocused()

    let lazyAmount = [50, 100, 120, 150]
    let lazyAmount2 = [200, 300, 400, 500]

    const rechargeWallet = async () => {
        if (amount.value == '') {
            setAmount({ value: '', error: "Please enter Amount!!!" })
            return
        }
        const payload = {
            username: mUserDetails?.username,
            amount: amount.value
        }
        try {
            setLoadingSign(true)
            const result = await loadWalletMoney(payload)
            console.log("Check Pinelab Load Money Response", result.data.JusPayCallback)
            if (result.data?.JusPayCallback?.sdk_payload) {
                navigation.navigate(routes.PaymentScreenJuspay, {
                    callFrom: 'rechargePinelab',
                    amount: 0,
                    email_address: '',
                    orderid: '',
                    mobile_number: '',
                    description: 'Add Money In Pinelab Wallet',
                    callback_url: '',
                    juspay_process_payload: result.data?.JusPayCallback
                })
                setLoadingSign(false)
            } else {
                setSnack({ message: 'Something Went Wrong Please Try After Some Time.', open: true, color: 'success' })
                setLoadingSign(false)
            }
        } catch (error) {
            console.log("RechargeWallet Pinelab Catch Block", error)
            setLoadingSign(false)
        }
    }

    return (
        <CommonView>
            <ScrollView >
                <Header showText={'Recharge Wallet'} />
                <DenseCard style={{ marginTop: 20 }}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => setAmount({ value: (parseInt(amount.value) - 50).toString(), error: '' })}>
                            <CommonCard style={{ padding: 10, height: 50, width: 50, alignItems: 'center', }}>
                                <CommonText showText={'-'} customstyles={[{ color: colors.greyText }]} fontSize={20} bold />
                            </CommonCard>
                        </TouchableOpacity>
                        <View style={[styles.row, { flex: 1, justifyContent: 'center' }]}>
                            <CommonText showText={'₹'} customstyles={styles.rupeeText} fontSize={25} />
                            <LinearInput
                                value={amount.value}
                                onChange={(text) => { setAmount({ value: text, error: '' }) }}
                                placeholderText={'50'}
                                style={styles.input}
                                keyboardType={'number-pad'}
                            />
                        </View>

                        <TouchableOpacity onPress={() => setAmount({ value: (parseInt(amount.value) + 50).toString(), error: '' })}>
                            <CommonCard style={{ padding: 10, backgroundColor: colors.green, height: 50, width: 50, alignItems: 'center' }} >
                                <CommonText showText={'+'} customstyles={[{ color: colors.white }]} fontSize={20} bold />
                            </CommonCard>
                        </TouchableOpacity>

                    </View>
                    {amount.error != '' && <CommonText showText={amount.error} fontSize={14} customstyles={{ color: colors.red, marginLeft: 15, marginVertical: 10 }} />}
                </DenseCard>



                <View style={styles.row}>
                    {lazyAmount.map((e) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setAmount({ value: e.toString(), error: '' })
                            }}>
                                <CommonCard style={styles.column}>
                                    <CommonText showText={`₹ ${e}`} />
                                </CommonCard>
                            </TouchableOpacity>
                        )
                    })}

                </View>

                <View style={styles.row}>
                    {lazyAmount2.map((e) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setAmount({ value: e.toString(), error: '' })
                            }}>
                                <CommonCard style={styles.column}>
                                    <CommonText showText={`₹ ${e}`} />
                                </CommonCard>
                            </TouchableOpacity>
                        )
                    })}
                </View>

            </ScrollView>
            <View style={[styles.row, { justifyContent: 'space-evenly' }]}>
                <WhiteButton showText={'Cancel'} style={{ flex: 1, marginHorizontal: 10 }} onPress={() => navigation.goBack()} />
                <Button showText={'Recharge'} style={{ flex: 1, marginHorizontal: 10 }} onPress={rechargeWallet} onLoading={loadingSign} />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    rupeeText: {
        marginTop: 13
    }
})

export default AddPinelabMoney