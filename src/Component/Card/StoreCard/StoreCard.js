import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'
import React from 'react'
import CommonText from '../../Text/CommonText'
import CommonCard from '../../../Component/Card/CommonCard/index'
import { scale } from 'react-native-size-matters'

const StoreCard = ({ dataItem }) => {
    // console.log(dataItem.item.icon, '................data in card')
    return (
        <CommonCard>
            <View style={styles.innerCard}>
                <Image source={dataItem?.item?.icon?.length > 1 ? { uri: dataItem?.item?.icon } : require('../../../assests/chargingKey.png')} style={styles.img} />
                <CommonText showText={dataItem?.item?.name} fontSize={20} />
                <CommonText showText={dataItem?.item?.type} fontSize={14} />
                <CommonText showText={`₹ ${dataItem?.item?.price}`} fontSize={14} />
            </View>
        </CommonCard>
    )
}

export default StoreCard

const styles = StyleSheet.create({
    innerCard: {
        paddingHorizontal: 10
    },
    img: {
        alignSelf: 'center',
        height: scale(120),
        width: scale(120),
        marginVertical: 10
    },

})