import { View, StyleSheet, SafeAreaView, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import Card from '../../../Component/Card/Card'
import Header from '../../../Component/Header/Header'
import colors from '../../../Utils/colors'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import Charger from '../../../assests/svg/charger'
import { getFormatedDate } from '../../../Services/CommonServices'
// import DenseCard from '../../../Component/Card/DenseCard/index'
import DenseCard from '../../../Component/Card/DenseCard/index'

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
                        {<Card Svg={Charger} dataItem={paramData} disabledCard={true} />}
                    </View>
                    <DenseCard>
                        <View style={styles.card}>
                            <CommonText showText={'Invoice Number'} fontSize={15} />
                            <CommonText showText={paramData?.item?.order?.invoice_number} fontSize={15} />
                        </View>
                    </DenseCard>
                    <View style={styles.InvoiceDetails}>
                        <CommonText showText={'Tax Invoice Details'} fontSize={20} />
                        <DenseCard>
                            <View >
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'Start Time'} fontSize={15} />
                                    <CommonText showText={paramData?.item?.start_datetime?getFormatedDate(paramData?.item?.start_datetime):'NA'} fontSize={15} />
                                </View>
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'End Time'} fontSize={15} />
                                    <CommonText showText={paramData?.item?.end_datetime?getFormatedDate(paramData?.item?.end_datetime):'NA'} fontSize={15} />
                                </View>
                            </View>
                        </DenseCard>
                        <DenseCard>
                            <View >
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'Price'} fontSize={15} />
                                    <CommonText showText={`₹ ${paramData?.item?.order?.pricingToApply?.price?paramData?.item?.order?.pricingToApply?.price:'NA'}`} fontSize={15} />
                                </View>
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'Cost'} fontSize={15} />
                                    <CommonText showText={`₹ ${paramData?.item?.order?.amount / 100?paramData?.item?.order?.amount / 100:'NA'}`} fontSize={15} />
                                </View>
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'Amount of CGST (9%)'} fontSize={15} />
                                    <CommonText showText={`₹${(paramData?.item?.order?.cgst / 100).toFixed(2)?(paramData?.item?.order?.cgst / 100).toFixed(2):'NA'}`} fontSize={15} />
                                </View>
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'Amount of SGST (9%)'} fontSize={15} />
                                    <CommonText showText={`₹${(paramData?.item?.order?.sgst / 100).toFixed(2)?(paramData?.item?.order?.sgst / 100).toFixed(2):'NA'}`} fontSize={15} />
                                </View>
                                <View style={styles.innerCard1}>
                                    <CommonText showText={'Total '} fontSize={15} />
                                    <CommonText showText={`₹${paramData?.item?.order?.amount / 100?paramData?.item?.order?.amount / 100:'NA'}`} fontSize={15} />
                                </View>

                            </View>
                        </DenseCard>
                        <DenseCard>
                            <View style={styles.card}>
                                <CommonText showText={'Paid Via'} fontSize={15} />
                                <CommonText showText={'Wallet'} fontSize={15} />
                            </View>
                        </DenseCard>
                        <DenseCard>
                            <View >
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
                        </DenseCard>
                        <DenseCard>
                            <View style={styles.card}>
                                <View>
                                    <CommonText showText={'Whether GST is payable under '} fontSize={15} />
                                    <CommonText showText={'reverse charge mechanism'} fontSize={15} />
                                </View>
                                <CommonText showText={'No'} fontSize={18} />
                            </View>
                        </DenseCard>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomButton}>
                <Button showText={'Download Invoice'} />
            </View>
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
    }
})

export default TaxInvoice