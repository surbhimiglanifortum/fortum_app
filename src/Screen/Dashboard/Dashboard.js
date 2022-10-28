import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import Home from '../Home/Home'
import AntDesign from 'react-native-vector-icons/AntDesign'
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
import WhiteText from '../../Component/Text/WhiteText'
// import { Shadow } from 'react-native-neomorph-shadows';


const Dashboard = ({tabName }) => {
console.log(tabName,'.............................tabn')
  const [selectedTab, setSelectedTab] = useState('home')

  const homeButtonHandler = () => {
    setSelectedTab('home')
  }
  const walletButtonHandler = () => {
    setSelectedTab('wallet')
  }
  const chargingButtonHandler = () => {
    setSelectedTab('charging')
  }
  const notificationButtonHandler = () => {
    setSelectedTab('notification')
  }
  const otherButtonHandler = () => {
    setSelectedTab('other')
  }

  const scheme = useColorScheme();

 useEffect(() => {
   if(tabName){
    setSelectedTab('wallet')
   }
 }, [tabName])
 

  return (
    <>
      <View style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
        <View style={styles.renderComponent}>
          <View style={{ flex: 1 }}>
            {selectedTab == 'home' && <Home />}
            {selectedTab == 'wallet' && <Wallet />}
            {selectedTab == 'charging' && <Charging />}
            {selectedTab == 'notification' && <Notification />}
            {selectedTab == 'other' && <Other />}
          </View>
        </View>
        <View style={[styles.tabContainer, { backgroundColor: colors.greenBackground }]}>

          <TouchableOpacity onPress={homeButtonHandler} style={[styles.tabButton, selectedTab == 'home' ? { borderWidth: 2, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, borderColor: '#FFF' } : null]}>
            <HomeSvg color={colors.white} />
            {selectedTab == 'home' && <WhiteText showText={'Home'} margin={6} />}
          </TouchableOpacity>
          {/* </Shadow> */}
          <TouchableOpacity onPress={walletButtonHandler} style={styles.tabButton}>
            <WalletSvg color={colors.white} />
            {selectedTab == 'wallet' && <WhiteText showText={'Wallet'} margin={6} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={chargingButtonHandler} style={styles.tabButton}>
            <Charger color={colors.white} />
            {selectedTab == 'charging' && <WhiteText showText={'Charging'} margin={6} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={notificationButtonHandler} style={styles.tabButton}>
            <NotificationSvg color={colors.white} />
            {selectedTab == 'notification' && <WhiteText showText={'Notification'} margin={6} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={otherButtonHandler} style={styles.tabButton}>
            <OtherSvg color={colors.white} />
            {selectedTab == 'other' && <WhiteText showText={'Others'} margin={6} />}
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


})

export default Dashboard