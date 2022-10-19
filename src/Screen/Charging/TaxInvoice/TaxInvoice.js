import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Card from '../../../Component/Card/Card'
import Header from '../../../Component/Header/Header'
import BlackText from '../../../Component/Text/BlackText'
import colors from '../../../Utils/colors'
import Charger1 from '../../../assests/svg/charger1'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
// import ChargingCard from '../../../Component/Charging/ChargingCard'
// import Card from '../../../Component/Card/Card'

const TaxInvoice = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <Header showText={'Tax Invoice'} />
                    <View style={{ marginTop: 18 }}>
                        {<Card />}
                    </View>
                    <View style={styles.card}>
                        <View style={styles.innerCard}>
                            <BlackText showText={'Charger type :'} fontSize={15} />
                            <Charger1 />
                            <BlackText showText={'CSCC'} fontSize={15} />
                        </View>
                        <BlackText showText={`kWh Used : ${'0'}`} fontSize={15} />
                    </View>
                    <View style={styles.card}>
                        <BlackText showText={'Invoice Number'} fontSize={15} />
                        <BlackText showText={'F37894'} fontSize={15} />
                    </View>
                    <View style={styles.InvoiceDetails}>
                        {scheme == 'dark' ? <CommonText showText={'Tax Invoice Details'} fontSize={20} /> : <BlackText showText={'Tax Invoice Details'} fontSize={20} />}
                        <View style={styles.invoiceCard}>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Start Time'} fontSize={15} />
                                <BlackText showText={'17/08/2022, 17:43 PM'} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'End Time'} fontSize={15} />
                                <BlackText showText={'17/08/2022, 17:43 PM'} fontSize={15} />
                            </View>
                        </View>
                        <View style={styles.invoiceCard}>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Price'} fontSize={15} />
                                <BlackText showText={`₹${'14 / 01 min'}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Cost'} fontSize={15} />
                                <BlackText showText={`₹${'1200'}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Amount of CGST (0%)'} fontSize={15} />
                                <BlackText showText={`₹${'100'}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Amount of SGST (0%)'} fontSize={15} />
                                <BlackText showText={`₹${'100'}`} fontSize={15} />
                            </View>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Total '} fontSize={15} />
                                <BlackText showText={`₹${'1400'}`} fontSize={15} />
                            </View>

                        </View>
                        <View style={styles.card}>
                            <BlackText showText={'Paid Via'} fontSize={15} />
                            <BlackText showText={'Wallet'} fontSize={15} />
                        </View>
                        <View style={styles.invoiceCard}>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Product Name'} fontSize={15} />
                                <View>
                                    <BlackText showText={'EV Charging Service'} fontSize={15} />
                                    <BlackText showText={'SAC- 999799'} fontSize={15} />
                                </View>
                            </View>
                            <View style={styles.innerCard1}>
                                <BlackText showText={'Transaction ID'} fontSize={15} />
                                <BlackText showText={'AL5e17AmvGB'} fontSize={15} />
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View>
                                <BlackText showText={'Whether GST is payable under '} fontSize={15} />
                                <BlackText showText={'reverse charge mechanism'} fontSize={15} />
                            </View>
                            <BlackText showText={'No'} fontSize={18} />
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
    bottomButton:{
        marginVertical:20
    }
})

export default TaxInvoice