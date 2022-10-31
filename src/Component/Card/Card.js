import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import IconCardLarge from './IconCardLarge'
import { getFormatedDate } from '../../Services/CommonServices'
import CommonText from '../Text/CommonText'

const Card = ({ tabName, navigationHandler, Svg, dataItem }) => {

    console.log(dataItem, '..............data in card')
    return (
        <TouchableOpacity style={styles.card} onPress={navigationHandler}>
            <View style={styles.leftContainer}>
                <IconCardLarge Svg={Svg} />
                <View style={styles.middleContainer}>
                    <CommonText showText={dataItem?.item?.location?.name} />
                    <View style={styles.leftContainer}>
                        <CommonText showText={getFormatedDate(dataItem?.item?.start_datetime)} />
                    </View>
                </View>
            </View>
            {tabName != 'ongoing' && <View >
                <CommonText showText={`₹ ${dataItem?.item?.total_cost ? dataItem?.item?.total_cost : '0'}`} />
                <CommonText showText={`${dataItem?.item?.kwh ? dataItem?.item?.kwh : '0'} Kwh`} />
            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    card: {
        paddingVertical: scale(15),
        paddingHorizontal: scale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.05,
        elevation: 4,
        marginVertical: 8,
        backgroundColor: '#FFF'
        // marginHorizontal:5
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    icon: { paddingVertical: scale(15), paddingHorizontal: scale(18), backgroundColor: colors.greenBackground, borderRadius: 5 },
    middleContainer: { marginLeft: scale(15) },


})

export default Card