import { View, StyleSheet, TouchableOpacity,useColorScheme } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'
import CommonIconCard from './CommonIconCard/CommonIconCard'
import { GetFormatedDate } from '../../Utils/utils'
import CommonCardReport from './CommonIconCard/CommonCardReport'

const Card = ({ tabName, navigationHandler, Svg, dataItem, disabledCard, color, SvgBg }) => {

    const getChargeTime = (dataItem) => {
        try {
            let startDate = new Date(dataItem?.item?.start_datetime)
            let endDate = new Date(dataItem?.item?.end_datetime)
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
            console.log("charge time", seconds)
            time = secondsToHms(seconds)
            return secondsToHms(seconds)
        } catch (error) {
            console.log("erre", error)
            return ""
        }
    }

    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " seconds") : "";
        console.log("charge time", hDisplay + mDisplay + sDisplay)
        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <CommonCard>
            <TouchableOpacity style={styles.card} onPress={navigationHandler} disabled={disabledCard}>
                {SvgBg ? <CommonIconCard Svg={Svg} /> : <CommonCardReport Svg={Svg} />}
                <View style={styles.middleContainer}>
                    <CommonText showText={dataItem?.item?.location?.name} fontSize={16} black />
                    <CommonText showText={GetFormatedDate(dataItem?.item?.start_datetime)} fontSize={12} regular />
                </View>
                {tabName != 'ongoing' &&
                    <View >
                        <CommonText showText={`₹ ${dataItem?.item?.order?.amount / 100 ? dataItem?.item?.order?.amount / 100 : '0'}`} fontSize={14} customstyles={ !dataItem?.item?.paid && {color:colors.red}} />
                        <CommonText showText={`${dataItem?.item?.kwh ? dataItem?.item?.kwh : '0'} Kwh`} fontSize={12} regular />
                    </View>
                }
            </TouchableOpacity>
        </CommonCard>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        display: 'flex'
    },
    middleContainer: {
        marginLeft: 10,
        flex: 1
    },
})

export default Card