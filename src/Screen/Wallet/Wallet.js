import { View, Text, StyleSheet, ScrollView, SafeAreaView, useColorScheme, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Component/Header/Header'
import CommonText from '../../Component/Text/CommonText'
import WalletCard from '../../Component/Card/WalletCard'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'
import { useQuery } from 'react-query'
import { walletHistory } from '../../Services/Api'
import CardWallet from '../../Component/Card/cardWallet'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import colors from '../../Utils/colors'
import WalletModals from '../../Component/Modal/WalletModal'
import { scale } from 'react-native-size-matters'
import Fontisto from 'react-native-vector-icons/Fontisto'
const Wallet = () => {

  const scheme = useColorScheme()
  const navigation = useNavigation()
  const RechargeButtonHandler = () => {
    navigation.navigate(routes.RechargeWallet)
  }


  let start = moment().subtract(30, 'days').calendar()
  start = moment(start).format('LL')
  let end = moment().format('LL')

  const [modalVisible, setModalVisible] = useState(false)
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [techStart, setTechStart] = useState()
  const [techEnd, setTechEnd] = useState('')

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(!isStartDatePickerVisible);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(!isStartDatePickerVisible);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(!isEndDatePickerVisible);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(!isEndDatePickerVisible);
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
    console.log("Check Hour start", srt)
    setTechStart(srt)
    hideStartDatePicker();
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
    console.log("Check Hour end", end)
    setTechEnd(end)
    hideEndDatePicker();
  };

  const showDateList = () => {
    refetch()
    setModalVisible(false)
  }

  const { data, status, isLoading, refetch } = useQuery('walletData', async () => {
    const res = await walletHistory(techStart, techEnd)
    var result = res.data
    result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return result
  })


  console.log(techStart, techEnd, '///// in wallet')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Header showText={'Wallet'} />
        {/* card */}
        <WalletCard onPress={RechargeButtonHandler} />
        <View style={styles.text}>
          <CommonText showText={'Transcation History'} fontSize={15} />
        </View>
        <View>
          {!isLoading && data?.length > 0 ?
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={(item) => {
                return (
                  <CardWallet dataItem={item} />
                )
              }}
            /> :
            <CommonText showText={'No History Found'} customstyles={{ alignSelf: 'center', marginTop: 50 }} />
          }
        </View>
      </View>
      <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible(true)}>
        <Fontisto name='equalizer' size={20} color={colors.white} />
      </TouchableOpacity>
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

      <WalletModals modalVisible={modalVisible} setModalVisible={setModalVisible} showStartDatePicker={showStartDatePicker} showEndDatePicker={showEndDatePicker} startDate={startDate} endDate={endDate} showDateList={showDateList} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 540
  },
  text: {
    marginVertical: 15
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterBtn: {
    position: 'absolute',
    backgroundColor: colors.green,
    bottom: scale(15),
    right: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 100
  }
})

export default Wallet