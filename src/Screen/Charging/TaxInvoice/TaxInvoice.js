import { View, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import { getFormatedDate } from '../../../Services/CommonServices'
import DenseCard from '../../../Component/Card/DenseCard/index'
import CommonView from '../../../Component/CommonView'
import ChargerLight from '../../../assests/svg/Charger_light'
import IconCard from '../../../Component/Card/IconCard'
import Divider from '../../../Component/Divider'
import routes from '../../../Utils/routes'
import { getSessionDetails } from '../../../Services/Api'

const TaxInvoice = ({ route }) => {

    const paramData = route.params.data

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const isFocused = useIsFocused()

    const [isPaid, setPaid] = useState(paramData.item?.paid)

    const handleButtonClick = () => {
        navigation.navigate(routes.PayInvoice, {
            amount: paramData?.item?.order?.amount / 100
        })
    }

    const sessionDetails = async () => {
        const result = await getSessionDetails(paramData?.item?.id)
        if (result.data?.data)
            setPaid(result.data.data?.paid)
        else
            console.log('Something went wrong.')
    }

    useEffect(() => {
        sessionDetails()
    }, [isFocused])

    return (
        <CommonView>
            <Header showText={'Tax Invoice'} />
            <ScrollView>
                <DenseCard >
                    <View style={styles.row}>
                        <View>
                            <IconCard Svg={ChargerLight} />
                        </View>

                        <View style={{}}>
                            <CommonText showText={paramData?.item?.location?.name} fontSize={14} />
                            <CommonText showText={getFormatedDate(paramData?.item?.start_datetime)} fontSize={14} regular />
                        </View>
                        <View>
                            <CommonText showText={`₹ ${paramData?.item?.order?.amount / 100 ? paramData?.item?.order?.amount / 100 : '0'}`} fontSize={14} />
                            <CommonText showText={`${paramData?.item?.kwh ? paramData?.item?.kwh : '0'} Kwh`} fontSize={14} regular />
                        </View>
                    </View>
                </DenseCard>

                <DenseCard style={styles.row}>
                    {/* <View style={[styles.row, { flex: 1 }]}>
                        <CommonText showText={'Charger Type :'} regular fontSize={14} />
                    </View> */}

                    <View style={styles.row}>
                        <CommonText showText={'kWh Used : '} regular fontSize={14} />
                        <CommonText showText={`${paramData?.item?.kwh ? paramData?.item?.kwh : '0'}`} fontSize={14} regular />
                    </View>

                </DenseCard>
                <DenseCard>
                    <View style={styles.card}>
                        <CommonText showText={'Invoice Number'} fontSize={14} regular />
                        <CommonText showText={paramData?.item?.order?.invoice_number} fontSize={14} />
                    </View>
                </DenseCard>
                <View style={styles.InvoiceDetails}>
                    <CommonText showText={'Tax Invoice Details'} />
                    <DenseCard>
                        <View >
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Start Time'} fontSize={14} regular />
                                <CommonText semibold showText={paramData?.item?.start_datetime ? getFormatedDate(paramData?.item?.start_datetime) : 'NA'} fontSize={14} regular />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'End Time'} fontSize={14} regular />
                                <CommonText semibold showText={paramData?.item?.end_datetime ? getFormatedDate(paramData?.item?.end_datetime) : 'NA'} fontSize={14} regular />
                            </View>
                        </View>
                    </DenseCard>
                    <DenseCard>
                        <View >
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Price'} fontSize={14} regular />
                                <CommonText semibold showText={`₹ ${paramData?.item?.order?.pricingToApply?.price ? paramData?.item?.order?.pricingToApply?.price : 'NA'}`} fontSize={14} regular />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Cost'} fontSize={14} regular />
                                <CommonText semibold showText={`₹ ${paramData?.item?.order?.amount ? ((paramData?.item?.order?.amount - (paramData?.item?.order?.cgst + paramData?.item?.order?.sgst)) / 100).toFixed(2) : 'NA'}`} fontSize={14} regular />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Amount of CGST (9%)'} fontSize={14} regular />
                                <CommonText semibold showText={`₹ ${(paramData?.item?.order?.cgst / 100).toFixed(2) ? (paramData?.item?.order?.cgst / 100).toFixed(2) : 'NA'}`} fontSize={14} regular />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Amount of SGST (9%)'} fontSize={14} regular />
                                <CommonText semibold showText={`₹ ${(paramData?.item?.order?.sgst / 100).toFixed(2) ? (paramData?.item?.order?.sgst / 100).toFixed(2) : 'NA'}`} fontSize={14} regular />
                            </View>
                            <Divider />
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Total '} fontSize={14} />
                                <CommonText semibold showText={`₹ ${paramData?.item?.order?.amount / 100 ? paramData?.item?.order?.amount / 100 : 'NA'}`} fontSize={14} />
                            </View>
                        </View>
                    </DenseCard>
                    <DenseCard>
                        <View style={styles.card}>
                            <CommonText showText={'Paid Via'} fontSize={14} regular />
                            <CommonText showText={'Wallet'} fontSize={14} />
                        </View>
                    </DenseCard>
                    <DenseCard>
                        <View >
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Product Name'} fontSize={14} regular />
                                <View>
                                    <CommonText showText={'EV Charging Service'} fontSize={14} />
                                </View>
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Transaction ID'} fontSize={14} regular />
                                <CommonText semibold showText={paramData?.item?.id} fontSize={14} />
                            </View>
                        </View>
                    </DenseCard>
                    <DenseCard>
                        <View style={styles.row}>
                            <CommonText showText={'Whether GST is payable under \n reverse charge mechanism'} fontSize={14} regular customstyles={{ flex: 1 }} />
                            <CommonText showText={'No'} fontSize={14} />
                        </View>
                    </DenseCard>
                </View>
                <Button
                    showText={isPaid ? 'Download Invoice' : 'Pay'}
                    onPress={() => handleButtonClick()}
                />
            </ScrollView>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF4FC'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        marginVertical: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    innerCard: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    innerCard1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 7
    },
    InvoiceDetails: {
        marginTop: 10,
    },
    bottomButton: {
        marginVertical: 15,
        paddingHorizontal: 15
    },
})

export default TaxInvoice