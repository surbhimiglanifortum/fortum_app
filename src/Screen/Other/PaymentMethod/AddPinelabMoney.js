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
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'
import WalletSvg from '../../../assests/svg/wallet'

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
                    callFrom: 'RechargePinelab',
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

                setOpenCommonModal({
                    isVisible: true, message: "Something Went Wrong Please Try After Some Time.",

                })
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

    const onChange = e => {
        // const input = e.currentTarget.value;
        if (/^[^!-\/:-@\[-`{-~]+$/.test(e) || e === "") {
            setAmount({ value: e.trim(), error: '' })
        }
    };

    return (
        <CommonView>
            <ScrollView >
                <Header showText={'Recharge Prepaid Card'} />
                <DenseCard margin={1} padding={10}>
                    <View style={styles.row}>
                        <CommonIconCard Svg={WalletSvg} />
                        <CommonText showText={'Wallet Balance'} regular fontSize={14} customstyles={{ flex: 1, marginLeft: 10 }} />
                        <CommonText showText={`??? ${data?.response?.Cards[0]?.Balance.toFixed(2) || '0'}`} fontSize={14}/>
                    </View>
                </DenseCard>

                <CommonText showText={'Add Money in Wallet'} regular fontSize={14} />
                <View style={{ position: 'relative' }}>
                    <CommonText showText={'???'} customstyles={styles.rupeeText} />
                    <Textinput
                        paddingHorizontal={25}
                        placeholder={'Enter Amount'}
                        value={amount.value}
                        onChange={(text) => onChange(text)}
                        keyboardType={'numeric'}
                        maxLength={5}
                    />
                </View>

                <CommonText showText={'Quick Recommendation'} fontSize={14} customstyles={{ marginVertical: 15 }} />

                <View style={styles.row}>
                    {lazyAmount.map((e) => {
                        return (
                            <TouchableOpacity style={styles.innerRow} onPress={() => {
                                setAmount({ value: e.toString(), error: '' })
                            }}>
                                <CommonCard>
                                    <CommonText showText={`??? ${e}`} />
                                </CommonCard>
                            </TouchableOpacity>
                        )
                    })}

                </View>

                <View style={styles.row}>
                    {lazyAmount2.map((e) => {
                        return (
                            <TouchableOpacity style={styles.innerRow} onPress={() => {
                                setAmount({ value: e.toString(), error: '' })
                            }}>
                                <CommonCard>
                                    <CommonText showText={`??? ${e}`} />
                                </CommonCard>
                            </TouchableOpacity>
                        )
                    })}
                </View>

            </ScrollView>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <View style={{ width: '48%' }}>
                    <WhiteButton showText={'Cancel'} onPress={() => navigation.goBack()} />
                </View>
                <View style={{ width: '48%', }}>
                    <Button showText={'Recharge'} onPress={rechargeWallet} onLoading={loadingSign} />
                </View>
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
    rupeeText: {
        position: 'absolute',
        zIndex: 9,
        top: 27,
        left: 15
    },
    innerRow: {
        flex: 1,
        alignItems: 'center',
    },
})

export default AddPinelabMoney