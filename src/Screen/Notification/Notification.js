import { View, StyleSheet, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import CommonText from '../../Component/Text/CommonText'
import IconCardLarge from '../../Component/Card/IconCardLarge'
import StoreGreenSvg from '../../assests/svg/StoreGreenSvg'
import BackBtnTab from '../../Component/Button/BackBtnTab'
import CommonView from '../../Component/CommonView/index'
import CommonCard from '../../Component/Card/CommonCard/index'
import CommonIconCard from '../../Component/Card/CommonIconCard/CommonIconCard'
import StoreSvg from '../../assests/svg/StoreSvg'
import NoData from '../../Component/NoDataFound/NoData'
import Header from '../../Component/Header/Header'

const Notification = ({ setSelectedTab }) => {

  const backhandler = () => {
    setSelectedTab('home')
  }

  const backAction = () => {
    setSelectedTab('home')
    return true
  }

  let backHandler

  useEffect(() => {
    backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => {
      backHandler.remove()
    }
  }, [])

  return (
    <CommonView>
      <Header onPress={backhandler} showText={"Notifications"} />
      <NoData showText={'No data found.'} />
      {/* <View style={styles.innerContainer}>
        <View style={styles.cardContainer}>
          <CommonText showText={'Today'} customstyles={{ marginLeft: 10 }} />
          <CommonCard>
            <View style={styles.card}>
              <CommonIconCard Svg={StoreSvg} />
              <View style={{ width: '85%',marginLeft:10 }}>
                <CommonText showText={'Notification 1'} fontSize={18} margin={10} />
                <CommonText showText={'Reach the charger and start charge your EV Real time '} fontSize={14} margin={10} />
              </View>
            </View>
          </CommonCard>
        </View>
        <View style={styles.cardContainer}>
          <CommonText showText={'12/06/2022'} customstyles={{ marginLeft: 10 }} />
          <CommonCard>
            <View style={styles.card}>
              <CommonIconCard Svg={StoreSvg} />
              <View style={{ width: '85%',marginLeft:10 }}>
                <CommonText showText={'Notification 1'} fontSize={18} margin={10} />
                <CommonText showText={'Reach the charger and start charge your EV Real time '} fontSize={14} margin={10} />
              </View>
            </View>
          </CommonCard>
        </View>
      </View> */}

    </CommonView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    marginTop: 20
  },
  cardContainer: {
    marginVertical: 10
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.white,
    // paddingVertical: 10,
    paddingHorizontal: 5,
    // borderRadius: 6,
    marginTop: 10
  },

})


export default Notification