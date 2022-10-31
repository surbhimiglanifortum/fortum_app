import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
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

const Passbook = () => {
    const navigation = useNavigation()
    const [selectedTab, setSelectedTab] = useState('all')

    const allBtnHandler = () => {
        setSelectedTab('all')
    }
    const sentBtnHandler = () => {
        setSelectedTab('sent')
    }
    const receiveBtnHandler = () => {
        setSelectedTab('receive')
    }


    return (
        <View style={styles.conatiner}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <View style={styles.innerHeader}>
                        <Header />
                        <CommonText showText={'Passbook'} fontSize={18} />
                    </View>
                    <SmallButton Svg={FilterSvg} />
                </View>
                <View style={styles.balanceCon}>
                    <View style={styles.innerHeader}>
                    <IconCard Svg={WalletSvg} />
                    <CommonText showText={'Balance'} margin={10} fontSize={18} />
                    </View>
                    <CommonText showText={'₹1400'} />
                </View>
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
                <View style={{ height: 500 ,marginTop:15}}>
                    <ScrollView>
                        {selectedTab == 'all' && <Card tabName={"all"} Svg={WalletSvg} />}
                        {selectedTab == 'sent' && <Card tabName={'sent'} Svg={WalletSvg} />}
                        {selectedTab == 'receive' && <Card tabName={'receive'} Svg={WalletSvg} />}
                    </ScrollView>
                </View>
                <Button showText={'Download Passbook'} />


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: scale(10)
    },
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    balanceCon:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:colors.white,
        paddingVertical:12,
        paddingHorizontal:10,
        borderRadius:8
    }
})


export default Passbook