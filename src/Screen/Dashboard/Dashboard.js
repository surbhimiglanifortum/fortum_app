import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
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
import svg from 'react-native-svg'
// import Charger from '../../assests/charger.svg'
import Charger from '../../assests/svg/charger'

const Dashboard = () => {

  const [selectedTab, setSelectedTab] = useState('home')

  const homeButtonHandler = () => {
    setSelectedTab('home')
  }
  const walletButtonHandler =()=>{
    setSelectedTab('wallet')
  }
  const chargingButtonHandler =()=>{
    setSelectedTab('charging')
  }
  const notificationButtonHandler =()=>{
    setSelectedTab('notification')
  }
  const otherButtonHandler =()=>{
    setSelectedTab('other')
  }

  const scheme = useColorScheme();


  return (
    <>
      <View style={[styles.container,{backgroundColor:scheme=='dark'?colors.backgroundDark:colors.backgroundLight}]}>
        <View style={styles.renderComponent}>
          <ScrollView>
            {selectedTab == 'home' && <Home />}
            {selectedTab=='wallet' && <Wallet />}
            {selectedTab=='charging' && <Charging />}
            {selectedTab =='notification' && <Notification />}
            {selectedTab =='other' && <Other />}
          </ScrollView>
        </View>
        <View style={[styles.tabContainer,{backgroundColor:colors.greenBackground}]}>
          <TouchableOpacity onPress={homeButtonHandler} style={styles.tabButton}>
            <AntDesign name='home' size={30} color={colors.white} />
           {selectedTab == 'home'&& <CommonText showText={'Home'} />}
          </TouchableOpacity>
          <TouchableOpacity  onPress={walletButtonHandler} style={styles.tabButton}>
            <AntDesign name='home' size={30} color={colors.white} />
            {selectedTab == 'wallet'&&<CommonText showText={'Wallet'} />}
          </TouchableOpacity>
          <TouchableOpacity   onPress={chargingButtonHandler} style={styles.tabButton}>
            <Charger width={120} height={40} color={colors.white} />
            {selectedTab == 'charging'&&<CommonText showText={'Charging'} />}
          </TouchableOpacity>
          <TouchableOpacity  onPress={notificationButtonHandler} style={styles.tabButton}>
            <AntDesign name='home' size={30} color={colors.white} />
           {selectedTab == 'notification'&& <CommonText showText={'Notification'} />}
          </TouchableOpacity>
          <TouchableOpacity  onPress={otherButtonHandler}  style={styles.tabButton}>
            <AntDesign name='home' size={30} color={colors.white} />
            {selectedTab == 'other'&&<CommonText showText={'Others'} />}
          </TouchableOpacity>
        </View>

      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1,  },
  tabContainer: { borderWidth: 1, paddingVertical: scale(20), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: scale(10) },
tabButton:{ flexDirection: 'row', alignItems: 'center',},
text:{ color: colors.white,fontFamily:commonFonts.bold,marginLeft:7},
renderComponent:{  flex: 9 },


})

export default Dashboard