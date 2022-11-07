import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import colors from '../../../../Utils/colors'
import Header from '../../../../Component/Header/Header'
import CommonText from '../../../../Component/Text/CommonText'
import SmallButton from '../../../../Component/Button/SmallButton'
import FilterSvg from '../../../../assests/svg/FilterSvg'
import Card from '../../../../Component/Card/Card'
import WalletSvg from '../../../../assests/svg/wallet'
import Button from '../../../../Component/Button/Button'
import IconCard from '../../../../Component/Card/IconCard'
import CommonView from '../../../../Component/CommonView'
import DenseCard from '../../../../Component/Card/DenseCard'
import WalletLight from '../../../../assests/svg/Wallet_light'
import { useSelector } from 'react-redux'
import { getPinelabHistroy } from '../../../../Services/Api'
import PinelabPassbookFilter from '../../../../Component/Modal/PinelabPassbookFilter'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { getPinelabBalance } from '../../../../Services/Api'

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
        getWalletHistory()
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
            console.log("Pinelab Wallet History Response", result.data)
            setData(result.data)
            setRefreshing(false)
        } catch (error) {
            console.log("Pinelab Wallet History Error", error)
            setRefreshing(false)
        }
    }

    const getWalletBalance = async () => {
        try {
            const payload = {
                username: mUserDetails?.username
            }
            const result = await getPinelabBalance(payload)
            console.log("Get Pinelab Balance Error", result?.data)
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
        console.log("Check Hour", srt)
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
        console.log("Check Hour", end)
        setTechEnd(end)
        hideEndDatePicker();
    };


    return (
        <CommonView>
            <View style={styles.innerHeader}>
                <View style={{ flex: 1 }}>
                    <Header showText={'Passbook'} />
                </View>
                <SmallButton Svg={FilterSvg} onPress={() => setModalVisible(true)} />
            </View>

            <DenseCard>
                <View style={styles.innerHeader}>
                    <View style={[styles.innerHeader, { flex: 1 }]}>
                        <IconCard Svg={WalletLight} />
                        <CommonText showText={'Balance'} fontSize={14} regular customstyles={{ marginLeft: 10 }} />
                    </View>
                    <CommonText showText={'₹1400'} fontSize={14} />
                </View>
            </DenseCard>

            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={allBtnHandler} style={[styles.tabButton, { backgroundColor: selectedTab == 'all' ? colors.white : colors.greenBackground }]}>
                    <Text style={[{ color: selectedTab == 'all' ? colors.black : colors.white }]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sentBtnHandler} style={[styles.tabButton, { backgroundColor: selectedTab == 'sent' ? colors.white : colors.greenBackground }]}>
                    <Text style={[{ color: selectedTab == 'sent' ? colors.black : colors.white }]}>Sent</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={receiveBtnHandler} style={[styles.tabButton, { backgroundColor: selectedTab == 'receive' ? colors.white : colors.greenBackground }]}>
                    <Text style={[{ color: selectedTab == 'receive' ? colors.black : colors.white }]}>Receive</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 500, marginTop: 15 }}>
                <ScrollView>
                    {selectedTab == 'all' && <Card tabName={"all"} Svg={WalletLight} />}

                    {selectedTab == 'sent' && <Card tabName={'sent'} Svg={WalletLight} />}

                    {selectedTab == 'receive' && <Card tabName={'receive'} Svg={WalletLight} />}
                </ScrollView>

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

            </View>

            <Button showText={'Download Passbook'} />
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
        marginTop: scale(15),
        backgroundColor: colors.green,
        paddingVertical: 8,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    tabButton: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 3,
        width: '33%',
        alignItems: 'center'
    },
    innerHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
})


export default Passbook