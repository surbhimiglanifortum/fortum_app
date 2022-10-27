import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import IconCard from './IconCard'

const SettingCard = ({ showText, fontSize, Svg,onPress }) => {

    return (
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.leftContainer}>
                    <IconCard Svg={Svg} />
                    <View style={styles.middleContainer}>
                        <BlackText showText={showText} fontSize={fontSize} />
                    </View>
                </View>
                <AntDesign name='right' color={colors.black} size={18} />
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 10,
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
        marginVertical: 5,
        backgroundColor: '#FFF',
        marginVertical:10
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