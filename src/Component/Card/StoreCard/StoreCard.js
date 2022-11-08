import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import CommonText from '../../Text/CommonText'
import CommonCard from '../../../Component/Card/CommonCard/index'
import { scale } from 'react-native-size-matters'
import ChargingKeyWhiteSvg from '../../../assests/svg/ChargingKeyWhiteSvg'
import ChargingKeyBlackSvg from '../../../assests/svg/ChargingKeyBlackSvg'

const StoreCard = ({ dataItem }) => {
    // console.log(dataItem.item.icon, '................data in card')
    const scheme = useColorScheme()

    return (
        <CommonCard>
            <View style={styles.innerCard}>
                {dataItem?.item?.icon?.length > 1 ? <Image source={{ uri: dataItem?.item?.icon }} style={styles.img} />
                    : <View style={styles.img}>
                        {scheme == 'dark' ? <ChargingKeyWhiteSvg /> : <ChargingKeyBlackSvg />}
                    </View>}
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