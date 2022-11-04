import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import IconCardLarge from './IconCardLarge'
import { getFormatedDate } from '../../Services/CommonServices'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'
import ChargerLight from '../../assests/svg/Charger_light'
import WalletLight from '../../assests/svg/Wallet_light'
import { NeuButton } from '../../NeuElement/index'
const CardWallet = ({ navigationHandler, Svg, dataItem, }) => {

    return (

      
        
            <CommonCard   >
                <TouchableOpacity style={styles.card} onPress={navigationHandler} >
                    <View style={styles.leftContainer}>
                        <IconCardLarge Svg={dataItem?.item?.topUpBalance ? WalletLight : ChargerLight} />
                        <View style={styles.middleContainer}>
                            <CommonText showText={dataItem?.item?.topUpBalance ? measure : "Charging Done"} fontSize={14} />
                            <View style={styles.leftContainer}>
                                <CommonText showText={getFormatedDate(dataItem?.item?.createdAt)} fontSize={14} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <CommonText showText={`${dataItem?.item?.topUpBalance ? ` + ₹ ${parseFloat(dataItem?.item?.topUpBalance.toFixed(2))}` : `₹ ${dataItem?.item?.consumedAmount ? dataItem?.item?.consumedAmount : '0'}`}`} fontSize={16} customstyles={{ color: dataItem?.item?.topUpBalance ? colors.green : colors.red }} />
                        <CommonText showText={`${dataItem?.item?.kwh ? dataItem?.item?.kwh : '120'} Min`} fontSize={14} />
                    </View>
                </TouchableOpacity>
            </CommonCard>
       
     
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    icon: { paddingVertical: scale(15), paddingHorizontal: scale(18), backgroundColor: colors.greenBackground, borderRadius: 5 },
    middleContainer: { marginLeft: scale(15) },


})


export default CardWallet