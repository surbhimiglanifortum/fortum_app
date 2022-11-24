import { View, StyleSheet, useColorScheme, FlatList, TouchableOpacity, BackHandler, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Component/Header/Header'
import CommonText from '../../Component/Text/CommonText'
import WalletCard from '../../Component/Card/WalletCard'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import routes from '../../Utils/routes'
import { useQuery } from 'react-query'
import { walletHistory, getUserDetails } from '../../Services/Api'
import CardWallet from '../../Component/Card/cardWallet'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import colors from '../../Utils/colors'
import WalletModals from '../../Component/Modal/WalletModal'
import { scale } from 'react-native-size-matters'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useDispatch, useSelector } from 'react-redux'
import NoData from '../../Component/NoDataFound/NoData'
import Loader from '../../Component/Loader'
import CommonView from '../../Component/CommonView'
import { AddToRedux } from '../../Redux/AddToRedux'
import * as Types from '../../Redux/Types'

let backHandler

const Wallet = ({ setSelectedTab }) => {

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [balance, setBalance] = useState('')
  const [loaderOpen, setLoaderOpen] = useState(false)

  const RechargeButtonHandler = () => {
    navigation.navigate(routes.RechargeWallet)
  }

  const updateUserDetails = async () => {
    const result = await getUserDetails()
    if (result.data) {
      setBalance(result.data?.balance)
      dispatch(AddToRedux(result.data, Types.USERDETAILS))
    }
  }

  useEffect(() => {
    updateUserDetails()
  }, [isFocused])


  let start = moment().subtract(30, 'days').calendar()
  start = moment(start).format('LL')
  let end = moment().format('LL')

  const [modalVisible, setModalVisible] = useState(false)
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [techStart, setTechStart] = useState(moment().subtract(30, 'days').format('YYYY-MM-DDT24:00:00'))
  const [techEnd, setTechEnd] = useState(moment().format('YYYY-MM-DDT23:59:00'))

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
    console.log("handleStartConfirm",date)
    setTechStart(moment(date).format('YYYY-MM-DDT00:00:00'))
    hideStartDatePicker();
  };

  const handleEndConfirm = (date) => {
    console.log("handleEndConfirm",date)
    setTechEnd(moment(date).format('YYYY-MM-DDT23:59:00'))
    hideEndDatePicker();
  };

  const showDateList = () => {
    refetch()
    setModalVisible(false)
  }

  const username = mUserDetails?.username

  const { data, status, isLoading, refetch } = useQuery('walletData', async () => {
    setLoaderOpen(true)
    const res = await walletHistory(username, techStart, techEnd)
    var result = res.data
    result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setLoaderOpen(false)
    return result
  })

  const backhandler = () => {
    setSelectedTab('home')
  }

  // const backAction = () => {
  //   setSelectedTab('home')
  //   return true
  // }

  // useEffect(() => {
  //   backHandler = BackHandler.addEventListener('hardwareBackPress', () => isFocused ? backAction : null)
  //   return () => {
  //     backHandler.remove()
  //   }
  // }, [isFocused])

  return (
    <CommonView style={styles.container}>
      <Header onPress={backhandler} showText={"Wallet"} />

      {/* card */}
      <WalletCard onPress={RechargeButtonHandler} title={`₹ ${balance}`} subTitle={'Your Prepaid Balance'} />
      <View style={styles.text}>
        <CommonText showText={`Transaction History(${data?.length || 0})`} />
      </View>


      {!loaderOpen && data?.length > 0 ?
        <FlatList
          data={data}
          refreshControl={<RefreshControl onRefresh={refetch} />}
          keyExtractor={item => item.id}
          renderItem={(item) => {
            return (
              <CardWallet dataItem={item} />
            )
          }}
        /> :
        !loaderOpen && <NoData showText={'No History Found'} />
      }


      <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible(true)}>
        <Fontisto name='equalizer' size={20} color={colors.white} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        date={new Date(techStart)}
        onConfirm={handleStartConfirm}
        onCancel={hideStartDatePicker}
        maximumDate={new Date(techEnd)}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        date={new Date(techEnd)}
        onConfirm={handleEndConfirm}
        onCancel={hideEndDatePicker}
        minimumDate={new Date(techStart)}
        maximumDate={new Date()}
      />

      <WalletModals modalVisible={modalVisible} setModalVisible={setModalVisible} showStartDatePicker={showStartDatePicker} showEndDatePicker={showEndDatePicker} startDate={techStart} endDate={techEnd} showDateList={showDateList} />
      <Loader modalOpen={loaderOpen} />
    </CommonView>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  innerContainer: {
    flex: 1
    // marginTop: 20,
  },
  text: {
    marginVertical: 15,
    paddingHorizontal: 12
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