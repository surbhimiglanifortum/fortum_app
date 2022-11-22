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
import CommonIconCard from './CommonIconCard/CommonIconCard'
import WalletSvg from '../../assests/svg/wallet'
import Charger from '../../assests/svg/charger'
import moment from 'moment'


const CardWallet = ({ navigationHandler, Svg, dataItem, }) => {
    const getFormatedDate = (date)=> moment.utc(date).local().format('DD-MMM-YYYY h:mm A');

    return (
        <CommonCard   >
            <TouchableOpacity style={styles.card} onPress={navigationHandler} >
                <View style={styles.leftContainer}>
                    <CommonIconCard Svg={dataItem?.item?.topUpBalance ? WalletSvg : Charger} />
                    <View style={styles.middleContainer}>
                        <CommonText showText={dataItem?.item?.topUpBalance ? 'Wallet Recharge' : "Charging Done"} fontSize={14} />
                        <View style={styles.leftContainer}>
                            <CommonText regular showText={getFormatedDate(dataItem?.item?.createdAt)} fontSize={14} />
                        </View>
                    </View>
                </View>
                <View>
                    <CommonText showText={`${dataItem?.item?.topUpBalance ? ` + ₹ ${parseFloat(dataItem?.item?.topUpBalance.toFixed(2))}` : `₹ ${dataItem?.item?.consumedAmount ? dataItem?.item?.consumedAmount : '0'}`}`} fontSize={16} customstyles={{ color: dataItem?.item?.topUpBalance ? colors.green : colors.red }} />
                    <CommonText regular showText={`${dataItem?.item?.kwh ? dataItem?.item?.kwh : '120'} Min`} fontSize={14} />
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
        padding: 5
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    icon: { paddingVertical: scale(15), paddingHorizontal: scale(18), backgroundColor: colors.greenBackground, borderRadius: 5 },
    middleContainer: { marginLeft: scale(15) },


})


export default CardWallet