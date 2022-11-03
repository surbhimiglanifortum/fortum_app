import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonText from '../Text/CommonText'
import IconCardWithoutBg from './IconCardWithoutBg'
import CommonCard from '../../Component/Card/CommonCard/index'

const SettingCard = ({ showText, fontSize, Svg, onPress }) => {

    return (
        <CommonCard>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.leftContainer}>
                    <IconCardWithoutBg Svg={Svg} backgroundColor={colors.green}  />
                    <View style={styles.middleContainer}>
                        <CommonText showText={showText} fontSize={fontSize} customstyles={{width:scale(180)}} />
                    </View>
                </View>
                <AntDesign name='right' color={colors.black} size={18} />
            </TouchableOpacity>
        </CommonCard>

    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // padding:
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    middleContainer: { marginLeft: scale(15) },
    deleteIcon: {
        elevation: 10,
        backgroundColor: '#FFF', paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },


})

export default SettingCard