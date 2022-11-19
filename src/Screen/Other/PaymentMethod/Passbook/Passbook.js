import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import colors from '../../../../Utils/colors'
import Header from '../../../../Component/Header/Header'
import CommonText from '../../../../Component/Text/CommonText'
import SmallButton from '../../../../Component/Button/SmallButton'
import FilterSvg from '../../../../assests/svg/FilterSvg'
import WalletSvg from '../../../../assests/svg/wallet'
import Button from '../../../../Component/Button/Button'
import CommonView from '../../../../Component/CommonView'
import DenseCard from '../../../../Component/Card/DenseCard'
import { useSelector } from 'react-redux'
import { getPinelabHistroy } from '../../../../Services/Api'
import PinelabPassbookFilter from '../../../../Component/Modal/PinelabPassbookFilter'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment'
import { getPinelabBalance } from '../../../../Services/Api'
import { useQuery } from 'react-query'
import PinelabTransactionCard from '../../../../Component/Card/PinelabTransactionCard'
import Charger from '../../../../assests/svg/charger'
import CommonIconCard from '../../../../Component/Card/CommonIconCard/CommonIconCard'
import NoData from '../../../../Component/NoDataFound/NoData'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

const Passbook = () => {
    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedTab, setSelectedTab] = useState('all')
    const [refreshing, setRefreshing] = useState(false)
    const [techStart, setTechStart] = useState('')
    const [techEnd, setTechEnd] = useState('')
    const [noTrans, setNoTrans] = useState('')
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const allBtnHandler = () => {
        setSelectedTab('all')
    }
    const sentBtnHandler = () => {
        setSelectedTab('sent')
    }
    const receiveBtnHandler = () => {
        setSelectedTab('receive')
    }

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    useEffect(() => {
        // getWalletHistory()
        getWalletBalance()
    }, [])

    const getWalletHistory = async () => {
        setRefreshing(true)
        const payload = {
            username: mUserDetails?.username,
            TransactionFilter: {
                BeginDate: techStart,
                EndDate: techEnd,
                NoOfTransactions: noTrans
            }
        }
        try {
            const result = await getPinelabHistroy(payload)
            // setData(result.data)
            setRefreshing(false)
            setModalVisible(false)
            return result?.data
        } catch (error) {
            console.log("Pinelab Wallet History Error", error)
            setRefreshing(false)
        }
    }

    const { data: passbookData, status, isLoading, refetch } = useQuery('PassbookData', getWalletHistory)

    const getWalletBalance = async () => {
        try {
            const payload = {
                username: mUserDetails?.username
            }
            const result = await getPinelabBalance(payload)
            setData(result?.data)
        } catch (error) {
            console.log("Get Pinelab Balance Error", error)
        }
    }

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(!isStartDatePickerVisible);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(!isStartDatePickerVisible);
    };

    const handleStartConfirm = (date) => {
        let selectedDate = moment(date).format('LL')
        setStartDate(selectedDate)
        let year = new Date(date).getFullYear()
        let month = new Date(date).getMonth() + 1
        if (month <= 9) {
            month = "0" + month
        }
        let d = new Date(date).getDate()
        let srt = `${year}-${month}-${d}T00:00:00`
        setTechStart(srt)
        hideStartDatePicker();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(!isEndDatePickerVisible);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(!isEndDatePickerVisible);
    };

    const handleEndConfirm = (date) => {
        let selectedDate = moment(date).format('LL')
        setEndDate(selectedDate)
        let year = new Date(date).getFullYear()
        let month = new Date(date).getMonth() + 1
        if (month <= 9) {
            month = "0" + month
        }
        let d = new Date(date).getDate()
        let end = `${year}-${month}-${d}T24:00:00`
        setTechEnd(end)
        hideEndDatePicker();
    };

    const ShowTab = ({ tabName }) => {
        switch (tabName) {
            case 'all':
                return <AllTransaction />
                break;

            case 'sent':
                return <SentTransaction />
                break;

            case 'receive':
                return <RecievedTransaction />
                break;
        }
    }

    const generateHTML = async () => {
        let printData = '<html>\n' +
            '<head>\n' +
            '<title>Statement</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '<h3>Prepaid Card Statement</h3>\n' +
            '<table style="width: 100%; margin-bottom: 20px;">\n' +
            '<tr>\n' +
            ' <th style="text-align: left;">User Attributes</th>\n' +
            '<th style="text-align: left;">Details</th>' +
            '</tr>\n' +
            '<tr>\n' +
            '<td>Name:</td>\n' +
            `<td>${mUserDetails?.pinelabs_kyc_account[0]?.customerName}</td>\n` +
            '</tr>\n' +
            '<tr>\n' +
            '<td>Mobile No:</td>\n' +
            `<td>${mUserDetails?.phone_number}</td>\n` +
            '</tr>\n' +
            '<tr>\n' +
            '<td>Email ID(IF any or NA):</td>\n' +
            `<td>${mUserDetails?.username}</td>\n` +
            '</tr>\n' +
            '<tr>\n' +
            '<td>Corporate name(IF any or NA):</td>\n' +
            '<td>FORTUM INDIA PRIVATE LIMITED</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            (
                passbookData?.response?.ActivationDate != undefined &&
                '<td>Account Opening Date:</td>\n' +
                `<td>${moment(passbookData?.response?.ActivationDate).format('LLLL')}</td>\n`
            )
            +
            '</tr>\n' +
            '<tr>\n' +
            '<td>PAN and Aadhar No (IF any or NA):</td>\n' +
            '<td>N/A</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td>IMEI No:</td>\n' +
            ' <td>NA</th>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td>IP Address:</td>\n' +
            '<td>NA</td>\n' +
            '</tr>\n' +
            '</table>\n' +
            '<table style="width: 100%; margin-bottom: 20px; border: 1px solid black; border-collapse: collapse;">\n' +
            '<tr>' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Date & Time</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Account Name</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Account Balance(in Rs.)</th>\n' +
            '</tr>\n' +
            '<tr>\n' +
            `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${moment().format('LLLL')}</td>\n` +
            `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${passbookData?.response?.CardType}</td>\n` +
            `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${passbookData?.response?.Balance}</td>\n` +
            '</tr>\n' +
            '</table>\n' +
            '<table style="width: 100%; margin-bottom: 20px; border: 1px solid black; border-collapse: collapse;">\n' +
            '<tr>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Date & Time of Balance</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Transaction ID</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Transaction Details</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Credit(in Rs.)</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Debit(in Rs.)</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">Previous Balance(in Rs.)</th>\n' +
            '<th style="border: 1px solid black; border-collapse: collapse;">New Balance(in Rs.)</th>\n' +
            '</tr>\n' +
            passbookData?.response?.Transactions.map((item, index) => {
                return (
                    '<tr>\n' +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${moment(item.TransactionDate).format('LLLL')}</td>\n` +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${item.TransactionId}</td>\n` +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${item.TransactionType}</td>\n` +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${item.TransactionType === 'GIFT CARD RELOAD' ? item.TransactionAmount : 0.00}</td>\n` +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${item.TransactionType === 'GIFT CARD REDEEM' ? item.TransactionAmount : 0.00}</td>\n` +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${item.TransactionType === 'GIFT CARD REDEEM' ? item.TransactionAmount + item.CardBalance : item.CardBalance - item.TransactionAmount}</td>\n` +
                    `<td style="text-align: center; padding:5px; border: 1px solid black; border-collapse: collapse;">${item.CardBalance}</td>\n` +
                    '</tr>\n'
                )
            }) +
            '</table>\n' +
            '</body>\n' +
            '</html>'


        const results = await RNHTMLtoPDF.convert({
            html: printData,
            fileName: 'Passbook',
            base64: true,
        })

        await RNPrint.print({ filePath: results.filePath })
    }

    const AllTransaction = () => {
        return (
            passbookData?.response?.Transactions?.length >= 1 ?
                <FlatList
                    data={passbookData?.response?.Transactions}
                    refreshControl={<RefreshControl onRefresh={refetch} />}
                    keyExtractor={item => item.id}
                    renderItem={(item) => {
                        return (
                            <PinelabTransactionCard
                                Svg={item?.item?.TransactionType === 'GIFT CARD RELOAD' ? WalletSvg : Charger}
                                date={item?.item?.TransactionDate}
                                title={item?.item?.MerchantName}
                                amount={item?.item?.TransactionAmount}
                                transactionType={item?.item?.TransactionType}
                            />
                        )
                    }
                    }
                />
                :
                <NoData showText={'No data found.'} />
        )
    }

    const SentTransaction = () => {
        return (
            passbookData?.response?.Transactions?.length >= 1 ?
                <FlatList
                    style={{ flex: 1 }}
                    data={passbookData?.response?.Transactions}
                    refreshControl={<RefreshControl onRefresh={refetch} />}
                    keyExtractor={item => item.id}
                    renderItem={(item) => {
                        return (
                            item?.item?.TransactionType !== 'GIFT CARD RELOAD' ?
                                <PinelabTransactionCard
                                    Svg={Charger}
                                    date={item?.item?.TransactionDate}
                                    title={item?.item?.MerchantName}
                                    amount={item?.item?.TransactionAmount}
                                /> :
                                null
                        )
                    }
                    }
                />
                :
                <NoData showText={'No data found.'} />
        )
    }

    const RecievedTransaction = () => {
        return (
            passbookData?.response?.Transactions?.length >= 1 ?
                <FlatList
                    data={passbookData?.response?.Transactions}
                    refreshControl={<RefreshControl onRefresh={refetch} />}
                    keyExtractor={item => item.id}
                    renderItem={(item) => {
                        return (
                            item?.item?.TransactionType === 'GIFT CARD RELOAD' ?
                                <PinelabTransactionCard
                                    Svg={WalletSvg}
                                    date={item?.item?.TransactionDate}
                                    title={item?.item?.MerchantName}
                                    amount={item?.item?.TransactionAmount}
                                /> :
                                null
                        )
                    }
                    }
                />
                :
                <NoData showText={'No data found.'} />
        )
    }

    return (
        <CommonView style={{ position: 'relative' }}>
            <View style={styles.innerHeader}>
                <View style={{ flex: 1 }}>
                    <Header showText={'Passbook'} />
                </View>
                <SmallButton Svg={FilterSvg} onPress={() => setModalVisible(true)} />
            </View>

            <DenseCard padding={10}>
                <View style={styles.innerHeader}>
                    <View style={[styles.innerHeader, { flex: 1 }]}>
                        <CommonIconCard Svg={WalletSvg} />
                        <CommonText showText={'Balance'} fontSize={14} regular customstyles={{ marginLeft: 10 }} />
                    </View>
                    <CommonText showText={`₹ ${data?.response?.Cards[0]?.Balance.toFixed(2)}`} fontSize={14} />
                </View>
            </DenseCard>

            <View style={styles.tabContainer}>

                {selectedTab == 'all' ?
                    <DenseCard paddingLeft={20} paddingRight={20} padding={8} marginVertical={2} margin={2}>
                        <TouchableOpacity onPress={allBtnHandler} style={[styles.tabButton]}>
                            <Text style={[{ color: selectedTab == 'all' ? colors.black : colors.white }]}>All</Text>
                        </TouchableOpacity>
                    </DenseCard> :
                    <TouchableOpacity onPress={allBtnHandler} style={[styles.tabButton]}>
                        <Text style={[{ color: selectedTab == 'all' ? colors.black : colors.white }]}>All</Text>
                    </TouchableOpacity>
                }

                {selectedTab == 'sent' ?
                    <DenseCard paddingLeft={20} paddingRight={20} padding={8} marginVertical={2} margin={2}>
                        <TouchableOpacity onPress={sentBtnHandler} style={[styles.tabButton]}>
                            <Text style={[{ color: selectedTab == 'sent' ? colors.black : colors.white }]}>Sent</Text>
                        </TouchableOpacity>
                    </DenseCard> :
                    <TouchableOpacity onPress={sentBtnHandler} style={[styles.tabButton]}>
                        <Text style={[{ color: selectedTab == 'sent' ? colors.black : colors.white }]}>Sent</Text>
                    </TouchableOpacity>
                }

                {selectedTab == 'receive' ?
                    <DenseCard paddingLeft={20} paddingRight={20} padding={8} marginVertical={2} margin={2}>
                        <TouchableOpacity onPress={receiveBtnHandler} style={[styles.tabButton]}>
                            <Text style={[{ color: selectedTab == 'receive' ? colors.black : colors.white }]}>Receive</Text>
                        </TouchableOpacity>
                    </DenseCard> :
                    <TouchableOpacity onPress={receiveBtnHandler} style={[styles.tabButton]}>
                        <Text style={[{ color: selectedTab == 'receive' ? colors.black : colors.white }]}>Receive</Text>
                    </TouchableOpacity>
                }
            </View>

            <ShowTab tabName={selectedTab} />

            <PinelabPassbookFilter
                isVisible={modalVisible}
                bgStyle={'rgba(0,0,0,0.5)'}
                startDate={startDate}
                endDate={endDate}
                showStartDatePicker={showStartDatePicker}
                showEndDatePicker={showEndDatePicker}
                noTrans={noTrans}
                setNoTrans={setNoTrans}
                onClosePress={() => setModalVisible(false)}
                onPress={refetch}
            />

            <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleStartConfirm}
                onCancel={hideStartDatePicker}
                maximumDate={new Date()}
            />

            <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
                maximumDate={new Date()}
            />


            <View style={styles.fixedBtn}>
                <Button showText={'Download Passbook'} onPress={() => generateHTML()} />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
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
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        backgroundColor: '#5AC37D',
        paddingVertical: 2,
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    tabButton: {
        paddingHorizontal: 15,
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 30
    },
    innerHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    fixedBtn: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        width: '100%'
    }
})


export default Passbook