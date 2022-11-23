import { View, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import { getFormatedDate } from '../../../Services/CommonServices'
import DenseCard from '../../../Component/Card/DenseCard/index'
import CommonView from '../../../Component/CommonView'
import Divider from '../../../Component/Divider'
import routes from '../../../Utils/routes'
import { getSessionDetails, invoiceMap, gstMap } from '../../../Services/Api'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'
import Charger from '../../../assests/svg/charger'
import ChargerRed from '../../../assests/svg/ChargerRed'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNPrint from 'react-native-print';
import { useSelector } from 'react-redux'


const TaxInvoice = ({ route }) => {

    const paramData = route.params.data
    
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const isFocused = useIsFocused()

    const [isPaid, setPaid] = useState(paramData.item?.paid)
    const [allowMode, setAllowMode] = useState([])
    const [usergstIn, setUserGstIn] = useState("");
    const [st, setSt] = useState("");
    const [gstAddr, setGstAddr] = useState("");
    const [gstIn, setGstIn] = useState("");

    const start = new Date(route.params?.data?.item?.start_datetime);
    const end = new Date(route.params?.data?.item?.end_datetime);
    const diff = Math.abs(start - end);
    let diffMin = diff / 1000 / 60;
    if (isNaN(diffMin)) diffMin = 0;

    const handleButtonClick = () => {
        navigation.navigate(routes.PayInvoice, {
            amount: (paramData?.item?.order?.amount_due / 100).toFixed(2)
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

    useEffect(() => {
        let temp = []
        route.params?.data?.item?.payments?.map((item, index) => {
            if (item.payment_method === 'PAY_AS_U_GO') {
                temp.push('Pay As You Go');
            }
            if (item.payment_method === 'CLOSED_WALLET') {
                temp.push('Prepaid Wallet');
            }
            if (item.payment_method === 'PREPAID_CARD') {
                temp.push('Prepaid Card');
            }
        })
        setAllowMode(temp);
    }, [])

    useEffect(() => {
        invoiceMap(route?.params?.data?.item?.location?.city.toUpperCase().replace(/[^a-zA-Z ]/g, "")).then((res) => {
            setSt(res?.data[0]?.state)
            gstMap({ state: res?.data[0]?.state }).then((result) => {
                setGstAddr(result?.data[0]?.address)
                setGstIn(result?.data[0]?.gstin);
            }).catch((error) => {
                console.log("GST Map Error", error)
            })
        }).catch((error) => {
            console.log("Invoice Map Error", error)
        })
    }, [])

    const generateHTML = async () => {
        console.log("Download Called")
        let printData = '<html lang="en">\n' +
            "<head>\n" +
            '    <meta charset="UTF-8">\n' +
            "    <title>INVOICE</title>\n" +
            "</head>\n" +
            "<body >\n" +
            '<div >' +
            '<div style="text-align: center">\n' +
            "<h2>TAX INVOICE</h2>\n" +
            "</div>\n" +
            '<h3 style="margin-bottom: 0">Total Cost</h3>\n' +
            "<hr>\n" +
            "\n" +
            '<table style="min-width: 100%">\n' +
            "    <colgroup>\n" +
            '        <col span="1" style="width: 70%;">\n' +
            '        <col span="1" style="width: 30%;">\n' +
            "    </colgroup>\n" +
            "    <tr>\n" +
            "        <td><h1>₹ " +
            route.params?.data?.item?.order?.amount / 100
            // history?.order?.amount / 100 
            +
            "</h1></td>\n" +
            "        <td>\n" +
            '            <span style="font-size: 1.1em"><strong>Duration :</strong> ' +
            diffMin?.toFixed(2) +
            " Min</span>\n" +
            "            <br/>\n" +
            '            <span style="font-size: 1.1em"><strong>kWh used :</strong> ' +
            route.params?.data?.item?.kwh +
            " kWh</span>\n" +
            "            <br/>\n" +
            '            <span style="font-size: 1.1em"><strong>Invoice Number :</strong> ' +
            (route.params?.data?.item?.order?.invoice_number
                ? route.params?.data?.item?.order?.invoice_number
                : route.params?.data?.item?.order?.id) +
            "</span>\n" +
            "            <br/>\n" +
            '            <span style="font-size: 1.1em"><strong>Date :</strong> ' +
            getFormatedDate(route.params?.data?.item?.start_datetime) +
            "</span>\n" +



            // history.paid_with && history.paid_with != undefined && history.paid_with != '' ?

            "            <br/>\n" +
            '            <span style="font-size: 1.1em"><strong>Payment Method : </strong> ' +
            allowMode.map((item) => {
                return (
                    item
                )
            }) +
            "</span>\n"

            +

            (route.params?.data?.item?.order != undefined && route.params?.data?.item?.order?.BALANCE_CASH != undefined && route.params?.data?.item?.order?.BALANCE_CASH != '' ?
                "            <br/>\n" +
                '            <span style="font-size: 1.1em"><strong>Wallet :</strong> ' +
                (parseFloat(route.params?.data?.item?.order?.BALANCE_CASH) / 100)?.toFixed(2) +
                "</span>\n" : ""
            )
            +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "\n" +
            '<table style="min-width: 100%;border:2px solid;border-radius: 12px;text-align: center;margin-top:30px">\n' +
            "    <colgroup>\n" +
            '        <col span="1" style="width: 50%;">\n' +
            '        <col span="1" style="width: 50%;">\n' +
            "    </colgroup>" +
            "<tr>\n" +
            "        <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em;text-align: left"><strong>Charging Station</strong></span>\n' +
            "        </td>\n" +
            "        <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em">' +
            route.params?.data?.item?.location?.name +
            "</span>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em;text-align: left"><strong>Place of Supply</strong></span>\n' +
            "        </td>\n" +
            "        <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em">' +
            route.params?.data?.item?.location?.address +
            "</span>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em;text-align: left"><strong>Place of Supply - state</strong></span>\n' +
            "        </td>\n" +
            "        <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em">' +
            (st != undefined ? st : 'N/A') +
            "</span>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "\n" +
            '<h3 style="margin-bottom: 0;">Tax Invoice Details</h3>\n' +
            '<table style="min-width: 100%;text-align: center;border: 2px solid">\n' +
            "    <tr>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Start</span>\n' +
            "        </th>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">End</span>\n' +
            "        </th>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Quantity</span>\n' +
            "        </th>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Flat Price</span>\n' +
            "        </th>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Price</span>\n' +
            "        </th>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Cost</span>\n' +
            "        </th>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td>\n" +
            '            <span style="font-size: 1.1em">' +
            getFormatedDate(route.params?.data?.item?.start_datetime) +
            "</span>\n" +
            "        </td>\n" +
            "        <td>\n" +
            '            <span style="font-size: 1.1em">' +
            getFormatedDate(route.params?.data?.item?.end_datetime) +
            "</span>\n" +
            "        </td><td>\n" +
            '            <span style="font-size: 1.1em">' +
            (route.params?.data?.item?.order?.pricingToApply?.type === "TIME"
                ? diffMin?.toFixed(2)
                : route.params?.data?.item?.kwh) +
            "</span>\n" +
            "        </td><td>\n" +
            '            <span style="font-size: 1.1em"> ₹' +
            route.params?.data?.item?.order?.pricingToApply?.flat_price +
            "</span>\n" +
            "        </td><td>\n" +
            '            <span style="font-size: 1.1em"> ₹' +
            route.params?.data?.item?.order?.pricingToApply?.price +
            "/" +
            (route.params?.data?.item?.order?.pricingToApply?.type === "TIME"
                ? "min"
                : "kWh") +
            "</span>\n" +
            "        </td><td>\n" +
            '            <span style="font-size: 1.1em"> ₹' +
            route.params?.data?.item?.order?.amount / 100 +
            "</span>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "\n" +
            "<h3>Total cost excl. GST : ₹ " +
            (
                (route.params?.data?.item?.order?.amount -
                    route.params?.data?.item?.order?.sgst -
                    route.params?.data?.item?.order?.cgst) /
                100
            )?.toFixed(2) +
            "</h3>\n" +
            "<h3>Amount of CGST(" +
            (route.params?.data?.item?.order?.pricingToApply?.cgst != undefined ? route.params?.data?.item?.order?.pricingToApply?.cgst : 0) +
            "%) : ₹ " +
            (route.params?.data?.item?.order?.cgst / 100)?.toFixed(2) +
            "</h3>\n" +
            "<h3>Amount of SGST(" +
            (route.params?.data?.item?.order?.pricingToApply?.sgst != undefined ? route.params?.data?.item?.order?.pricingToApply?.sgst : 0) +
            "%) : ₹ " +
            (route.params?.data?.item?.order?.sgst / 100)?.toFixed(2) +
            "</h3>\n" +
            "\n" +
            "\n" +
            '<table style="min-width: 100%;text-align: center;border: 2px solid">\n' +
            "    <tr>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Other Information</span>\n' +
            "        </th>\n" +
            "        <th>\n" +
            '            <span style="font-size: 1.1em">Customer Information</span>\n' +
            "        </th>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            " <td style=\"font-size: 1.1em;text-align: left\">\n" +
            "            Product Name: EV Charging Service SAC - 999799 <br/>\n" +
            "            Transaction ID: " +
            route.params?.data?.item?.id +
            " <br/>\n" +
            "            Whether GST is payable under reverse charge mechanism: No <br/>\n" +
            "            This is a computer generated invoice no signature is required\n" +
            "        </td>\n" +
            " <td style=\"font-size: 1.1em;text-align: left\">\n" +
            '            <span style="font-size: 1.1em">Name : ' +
            (mUserDetails?.first_name + " " + mUserDetails?.last_name) +
            "</span> <br/>\n" +
            '            <span style="font-size: 1.1em">GSTIN : ' +
            (mUserDetails?.usergstIn != undefined ? mUserDetails?.usergstIn : 0) +
            "</span> <br/>\n" +
            '            <span style="font-size: 1.1em">State : ' +
            (st != undefined ? st : 'N/A') +

            "</span><br/>\n" +
            '            <span style="font-size: 1.1em">Billing Address :<br/>' +

            (mUserDetails?.billing_addresses[0]?.address != undefined ?
                mUserDetails?.billing_addresses[0]?.address +
                " " +
                mUserDetails?.billing_addresses[0]?.address_line_2 +
                " " +
                " " +
                mUserDetails?.billing_addresses[0]?.city +
                " " +
                mUserDetails?.billing_addresses[0]?.country +
                " " +
                mUserDetails?.billing_addresses[0]?.postal_code + '' : 'N/A')

        "</span>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            '<h3 style="margin-bottom: 0">FORTUM CHARGE AND DRIVE INDIA PRIVATE LIMITED</h3>\n' +
            "<hr>\n" +
            '<table style="min-width: 100%;text-align: center">\n' +
            "    <colgroup>\n" +
            '        <col span="1" style="width: 50%;">\n' +
            '        <col span="1" style="width: 50%;">\n' +
            "    </colgroup>" +
            "<tr>\n" +
            "        <th>Address</th>\n" +
            "        <th>GSTIN</th>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "        <td>" +
            gstAddr +
            "</td>\n" +
            "        <td>\n" +
            "            " +
            (gstIn != undefined ? gstIn : 0) +
            "\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "</div>\n" +
            "</body>\n" +
            "</html>"

        const results = await RNHTMLtoPDF.convert({
            html: printData,
            fileName: 'Invoice',
            base64: true,
        })

        // RNHTMLtoPDF.convert(results).then(filePath => {
        //     Share.open({
        //         title: 'Invoice',
        //         message: 'Invoice',
        //         url: filePath.filePath
        //     })
        // })

        // await RNPrint.print({ filePath: results.filePath })
    }

    return (
        <CommonView>
            <Header showText={'Tax Invoice'} />
            <ScrollView>
                <DenseCard >
                    <View style={styles.row}>
                        <View>
                            <CommonIconCard Svg={paramData.item?.paid ? Charger : ChargerRed} />
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
                    <CommonText showText={'Tax Invoice Details'} customstyles={{ paddingHorizontal: 12 }} />
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
                                <CommonText semibold showText={`₹ ${paramData?.item?.order?.amount ? (((paramData?.item?.order?.amount)/100 - (paramData?.item?.order?.cgst + paramData?.item?.order?.sgst)))?.toFixed(2) : 'NA'}`} fontSize={14} regular />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Amount of CGST (9%)'} fontSize={14} regular />
                                <CommonText semibold showText={`₹ ${(paramData?.item?.order?.cgst)?.toFixed(2) ? (paramData?.item?.order?.cgst)?.toFixed(2) : 'NA'}`} fontSize={14} regular />
                            </View>
                            <View style={styles.innerCard1}>
                                <CommonText showText={'Amount of SGST (9%)'} fontSize={14} regular />
                                <CommonText semibold showText={`₹ ${(paramData?.item?.order?.sgst)?.toFixed(2) ? (paramData?.item?.order?.sgst)?.toFixed(2) : 'NA'}`} fontSize={14} regular />
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
                    showText={isPaid ? 'Download Invoice' : `Pay(${(paramData?.item?.order?.amount_due/100)?.toFixed(2)})`}
                    onPress={() => isPaid ? generateHTML() : handleButtonClick()}
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