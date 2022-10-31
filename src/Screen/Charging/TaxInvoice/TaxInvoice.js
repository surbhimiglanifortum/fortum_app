import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Card from '../../../Component/Card/Card'
import Header from '../../../Component/Header/Header'
import colors from '../../../Utils/colors'
import Charger1 from '../../../assests/svg/charger1'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import Charger from '../../../assests/svg/charger'
import { getFormatedDate } from '../../../Services/CommonServices'
// import ChargingCard from '../../../Component/Charging/ChargingCard'
// import Card from '../../../Component/Card/Card'

const TaxInvoice = ({ route }) => {

    const paramData = route.params.data
    console.log(paramData.item, '..............pARAM DATA')

    const navigation = useNavigation()
    const scheme = useColorScheme()
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <Header showText={'Tax Invoice'} />
                    <View style={{ marginTop: 18 }}>
                        {<Card Svg={Charger} dataItem={paramData} />}
                    </View>
                    <View style={styles.card}>
                        <View style={styles.innerCard}>
                            <CommonText showText={'Charger type :'} fontSize={15} />
                            <Charger1 />
                            <CommonText showText={'CSCC'} fontSize={15} />
                        </View>
                        <CommonText showText={`kWh Used : ${paramData?.item?.kwh}`} fontSize={15} />
                    </View>
                    <View style={styles.card}>
                        <CommonText showText={'Invoice Number'} fontSize={15} />
                        <CommonText showText={
                            paramData?.item?.order?.invoice_number
                                ? paramData?.item?.order?.invoice_number
                                : paramData?.item?.order?.id} fontSize={15} />
                    </View>
                    <View style={styles.InvoiceDetails}>
                        {scheme == 'dark' ? <CommonText showText={'Tax Invoice Details'} fontSize={20} /> : <CommonText showText={'Tax Invoice Details'} fontSize={20} />}
                        <View style={styles.invoiceCard}>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Start Time'} fontSize={15} />
                                <CommonText showText={getFormatedDate(paramData?.item?.start_datetime)} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'End Time'} fontSize={15} />
                                <CommonText showText={getFormatedDate(paramData?.item?.end_datetime)} fontSize={15} />
                            </View>
                        </View>
                        <View style={styles.invoiceCard}>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Price'} fontSize={15} />
                                <CommonText showText={`₹ ${paramData?.item?.order?.pricingToApply?.price}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Cost'} fontSize={15} />
                                <CommonText showText={`₹ ${paramData?.item?.order?.amount / 100}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Amount of CGST (9%)'} fontSize={15} />
                                <CommonText showText={`₹${(paramData?.item?.order?.cgst / 100).toFixed(2)}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Amount of SGST (9%)'} fontSize={15} />
                                <CommonText showText={`₹${(paramData?.item?.order?.sgst / 100).toFixed(2)}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Total '} fontSize={15} />
                                <CommonText showText={`₹${'1400'}`} fontSize={15} />
                            </View>

                        </View>
                        <View style={styles.card}>
                            <CommonText showText={'Paid Via'} fontSize={15} />
                            <CommonText showText={'Wallet'} fontSize={15} />
                        </View>
                        <View style={styles.invoiceCard}>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Product Name'} fontSize={15} />
                                <View>
                                    <CommonText showText={'EV Charging Service'} fontSize={15} />
                                    <CommonText showText={'SAC- 999799'} fontSize={15} />
                                </View>
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Transaction ID'} fontSize={15} />
                                <CommonText showText={paramData?.item?.id} fontSize={15} />
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View>
                                <CommonText showText={'Whether GST is payable under '} fontSize={15} />
                                <CommonText showText={'reverse charge mechanism'} fontSize={15} />
                            </View>
                            <CommonText showText={'No'} fontSize={18} />
                        </View>
                        <View style={styles.bottomButton}>
                            <Button showText={'Download Invoice'} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF4FC'
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: scale(10)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between'  
    },
    headerText: {
        fontSize: scale(17),
    },
    iconContainer: {
        borderWidth: 1,
        paddingVertical: scale(3),
        paddingHorizontal: scale(15),
        borderRadius: 2,
        overflow: 'hidden',
        borderColor: '#EFEFEF',
        elevation: 2
    },
    card: {
        marginVertical: 10,
        backgroundColor: colors.white,
        elevation: 4,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    invoiceCard: {
        marginVertical: 10,
        backgroundColor: colors.white,
        elevation: 4,
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 10,

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
        marginVertical: 20
    }
})

export default TaxInvoice