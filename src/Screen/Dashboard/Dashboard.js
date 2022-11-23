import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import Home from '../Home/Home'
import Wallet from '../Wallet/Wallet'
import Charging from '../Charging/Charging'
import Notification from '../Notification/Notification'
import Other from '../Other/Other'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'
import CommonText from '../../Component/Text/CommonText'
import Charger from '../../assests/svg/charger'
import HomeSvg from '../../assests/svg/home'
import WalletSvg from '../../assests/svg/wallet'
import NotificationSvg from '../../assests/svg/notification'
import OtherSvg from '../../assests/svg/other'
import DenseCard from '../../Component/Card/DenseCard/index'
import { Auth } from 'aws-amplify'
import routes from '../../Utils/routes';
import DashboardCard from '../../Component/Card/DashboardCard'
import * as ApiAction from '../../Services/Api'
import { useDispatch } from 'react-redux';
import { AddToRedux } from '../../Redux/AddToRedux'
import * as  Types from '../../Redux/Types'
const Dashboard = ({ tabName, navigation, route }) => {

  const navigatedata = route?.params?.animateMap
  const [selectedTab, setSelectedTab] = useState('home')
  const dispatch = useDispatch()

  useEffect(() => {
    ApiAction.getUserDetails().then(result => {
      if (result?.data) {
        dispatch(AddToRedux(result.data, Types.USERDETAILS))
      }
    }).catch(err => {
      dispatch(AddToRedux({}, Types.USERDETAILS))
    })
  }, [])

  const homeButtonHandler = () => {
    setSelectedTab('home')
  }
  const walletButtonHandler = () => {
    handleSelection('wallet')
  }
  const chargingButtonHandler = () => {
    handleSelection('charging')
  }
  const notificationButtonHandler = () => {
    handleSelection('notification')
  }
  const otherButtonHandler = () => {
    handleSelection('other')
  }

  const handleSelection = async (tab) => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      console.log(result)
      if (result?.signInUserSession) {
        if (result.attributes.phone_number && result.attributes.phone_number != '') {
          setSelectedTab(tab)
        } else {
          navigation.navigate(routes.MobileInput, { email_id: result.attributes.email })
        }
        return
      }

    } catch (error) {

    }
    navigation.navigate(routes.login)
  }

  const scheme = useColorScheme();

  useEffect(() => {
    if (tabName) {
      setSelectedTab('wallet')
    }
  }, [tabName])


  return (
    <>
      <View style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
        <View style={styles.renderComponent}>
          <View style={{ flex: 1 }}>
            {selectedTab == 'home' && <Home navigatedata={navigatedata} />}
            {selectedTab == 'wallet' && <Wallet setSelectedTab={setSelectedTab} />}
            {selectedTab == 'charging' && <Charging setSelectedTab={setSelectedTab} />}
            {selectedTab == 'notification' && <Notification setSelectedTab={setSelectedTab} />}
            {selectedTab == 'other' && <Other setSelectedTab={setSelectedTab} />}
          </View>
        </View>
        <View style={[styles.tabContainer, { backgroundColor: colors.greenBackground }]}>

          <TouchableOpacity onPress={homeButtonHandler} style={[styles.tabButton]}>
            {selectedTab == 'home' ? <DashboardCard><View style={styles.tabButton}><HomeSvg color={colors.white} /><CommonText showText={'Home'} margin={6} customstyles={styles.tabText} /></View></DashboardCard> : <HomeSvg color={colors.white} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={walletButtonHandler} style={[styles.tabButton]}>
            {selectedTab == 'wallet' ? <DashboardCard><View style={styles.tabButton}>
              <WalletSvg color={colors.white} />
              <CommonText showText={'Wallet'} margin={6} customstyles={styles.tabText} />
            </View></DashboardCard> : <WalletSvg color={colors.white} />}
          </TouchableOpacity>



          <TouchableOpacity onPress={chargingButtonHandler} style={[styles.tabButton, selectedTab == 'charging' ? styles.activeTab : null]}>

            {selectedTab == 'charging' ? <DashboardCard><View style={styles.tabButton}>
              <Charger color={colors.white} />
              <CommonText showText={'Charging'} margin={6} customstyles={styles.tabText} />
            </View></DashboardCard> : <Charger color={colors.white} />}
          </TouchableOpacity>


          <TouchableOpacity onPress={notificationButtonHandler} style={[styles.tabButton, selectedTab == 'notification' ? styles.activeTab : null]}>
            {selectedTab == 'notification' ? <DashboardCard><View style={styles.tabButton}>
              <NotificationSvg color={colors.white} />
              <CommonText showText={'Notification'} margin={6} customstyles={styles.tabText} />
            </View></DashboardCard> : <NotificationSvg color={colors.white} />}
          </TouchableOpacity>


          <TouchableOpacity onPress={otherButtonHandler} style={[styles.tabButton, selectedTab == 'other' ? styles.activeTab : null]}>

            {selectedTab == 'other' ? <DashboardCard><View style={styles.tabButton}>
              <OtherSvg color={colors.white} />
              <CommonText showText={'Others'} margin={6} customstyles={styles.tabText} />
            </View></DashboardCard> : <OtherSvg color={colors.white} />}
          </TouchableOpacity>
        </View>

      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  tabContainer: { paddingVertical: scale(20), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: scale(25) },
  tabButton: { flexDirection: 'row', alignItems: 'center', },
  text: { color: colors.white, fontFamily: commonFonts.bold, marginLeft: 7 },
  renderComponent: { flex: 1 },
  tabText: {
    color: colors.white,
    marginLeft: 5,
    fontSize: 15
  },
  // activeTab: { borderWidth: 2, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, borderColor: colors.white },

})

export default Dashboard