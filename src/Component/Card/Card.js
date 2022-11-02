import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import IconCardLarge from './IconCardLarge'
import { getFormatedDate } from '../../Services/CommonServices'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'

const Card = ({ tabName, navigationHandler, Svg, dataItem,disabledCard }) => {

    return (
        <CommonCard>
            <TouchableOpacity style={styles.card} onPress={navigationHandler} disabled={disabledCard}>
                <View style={styles.leftContainer}>
                    <IconCardLarge Svg={Svg} />
                    <View style={styles.middleContainer}>
                        <CommonText showText={dataItem?.item?.location?.name} fontSize={14} />
                        <View style={styles.leftContainer}>
                            <CommonText showText={getFormatedDate(dataItem?.item?.start_datetime)} fontSize={14} />
                        </View>
                    </View>
                </View>
                {tabName != 'ongoing' && <View >
                    <CommonText showText={`₹ ${dataItem?.item?.order?.amount / 100 ? dataItem?.item?.order?.amount / 100 : '0'}`} fontSize={14} />
                    <CommonText showText={`${dataItem?.item?.kwh ? dataItem?.item?.kwh : '0'} Kwh`} fontSize={14} />
                </View>}
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
        padding:10
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    icon: { paddingVertical: scale(15), paddingHorizontal: scale(18), backgroundColor: colors.greenBackground, borderRadius: 5 },
    middleContainer: { marginLeft: scale(15) },


})

export default Card