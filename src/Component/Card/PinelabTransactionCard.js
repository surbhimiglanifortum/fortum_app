import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import CommonText from '../Text/CommonText'
import CommonCard from './CommonCard'
import colors from '../../Utils/colors'
import WalletSvg from '../../assests/svg/wallet'
import Charger from '../../assests/svg/charger'
import { GetFormatedDate } from '../../Utils/utils'
import CommonIconCard from './CommonIconCard/CommonIconCard'

const PinelabTransactionCard = ({ navigationHandler, Svg, title, date, amount, transactionType }) => {

    return (
        <CommonCard   >
            <TouchableOpacity style={styles.card} onPress={navigationHandler} >
                <View style={styles.leftContainer}>
                    <CommonIconCard Svg={Svg} />
                    <View style={styles.middleContainer}>
                        <CommonText showText={title} fontSize={14} />
                        <View style={styles.leftContainer}>
                            <CommonText regular showText={GetFormatedDate(date)} fontSize={14} />
                        </View>
                    </View>
                </View>
                <CommonText showText={transactionType === 'GIFT CARD RELOAD' ? `+ ₹ ${amount}` : `₹ ${amount}`} fontSize={16} customstyles={transactionType === 'GIFT CARD RELOAD' ? { color: colors.green } : { color: colors.red }} />
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
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        paddingVertical: 15,
        paddingHorizontal: 18,
        backgroundColor: colors.greenBackground,
        borderRadius: 5
    },
    middleContainer: {
        marginLeft: 15
    },
})

export default PinelabTransactionCard