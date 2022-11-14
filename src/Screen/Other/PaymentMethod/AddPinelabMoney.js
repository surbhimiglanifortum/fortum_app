import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, useColorScheme, View, TouchableOpacity, ScrollView } from 'react-native'
import CommonView from '../../../Component/CommonView'
import DenseCard from '../../../Component/Card/DenseCard'
import Header from '../../../Component/Header/Header'
import CommonCard from '../../../Component/Card/CommonCard'
import CommonText from '../../../Component/Text/CommonText'
import WhiteButton from '../../../Component/Button/WhiteButton'
import Button from '../../../Component/Button/Button'
import { loadWalletMoney, walletBalanceEnquiry } from '../../../Services/Api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import routes from '../../../Utils/routes'
import SnackContext from '../../../Utils/context/SnackbarContext'
import Textinput from '../../../Component/Textinput/Textinput'
import { useQuery } from 'react-query'

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

    const { data, status, isLoading, refetch } = useQuery('FatchPinelabBalance', async () => {
        const res = await walletBalanceEnquiry({ username: mUserDetails.username })
        return res.data
    })

    useEffect(() => {
        refetch()
    }, [isFocused])


    return (
        <CommonView>
            <ScrollView >
                <Header showText={'Recharge Pinelab Card'} />
                <DenseCard margin={1}>
                    <View style={styles.row}>
                        <CommonText showText={'Wallet Balance'} regular fontSize={14} customstyles={{ flex: 1 }} />
                        <CommonText showText={`₹ ${data?.response?.Cards[0]?.Balance.toFixed(2)}`} />
                    </View>
                </DenseCard>

                <CommonText showText={'Add Money in Wallet'} regular fontSize={14} />
                <View style={{ position: 'relative' }}>
                    <CommonText showText={'₹'} customstyles={styles.rupeeText} />
                    <Textinput paddingHorizontal={25} placeholder={'Enter Amount'} value={amount.value} onChange={(text) => { setAmount({ value: text, error: '' }) }} />
                </View>

                <CommonText showText={'Quick Recommendation'} fontSize={14} customstyles={{ marginVertical: 15 }} />

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
        alignItems: 'center'
    },
    column: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    rupeeText: {
        position: 'absolute',
        zIndex: 9,
        top: 27,
        left: 15
    }
})

export default AddPinelabMoney