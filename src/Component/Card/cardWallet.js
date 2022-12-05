import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'
import CommonIconCard from './CommonIconCard/CommonIconCard'
import WalletSvg from '../../assests/svg/wallet'
import Charger from '../../assests/svg/charger'
import { GetFormatedDate } from '../../Utils/utils'


const CardWallet = ({ navigationHandler, Svg, dataItem, }) => {

    return (
        <CommonCard   >
            <TouchableOpacity style={styles.card} onPress={navigationHandler} >
                <View style={styles.leftContainer}>
                    <CommonIconCard Svg={dataItem?.item?.topUpBalance ? WalletSvg : Charger} />
                    <View style={styles.middleContainer}>
                        <CommonText showText={dataItem?.item?.topUpBalance ? 'Added to wallet' : "Charging Done"} fontSize={16} black />
                        <View style={styles.leftContainer}>
                            <CommonText regular showText={GetFormatedDate(dataItem?.item?.createdAt)} fontSize={12} />
                        </View>
                    </View>
                </View>
                <View>
                    <CommonText showText={`${dataItem?.item?.topUpBalance ? ` + ₹ ${parseFloat(dataItem?.item?.topUpBalance.toFixed(2))}` : `₹ ${dataItem?.item?.consumedAmount ? dataItem?.item?.consumedAmount : '0'}`}`} fontSize={16} black customstyles={{ color: dataItem?.item?.topUpBalance ? colors.green : colors.red }} />
                    {/* <CommonText regular showText={`${dataItem?.item?.kwh ? dataItem?.item?.kwh : '120'} Min`} fontSize={14} /> */}
                </View>
            </TouchableOpacity>
        </CommonCard>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        paddingVertical: scale(15),
        paddingHorizontal: scale(18),
        backgroundColor: colors.greenBackground,
        borderRadius: 5
    },
    middleContainer: {
        marginLeft: scale(15)
    },


})


export default CardWallet