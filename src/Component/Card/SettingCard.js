import { View, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonText from '../Text/CommonText'
import IconCardWithoutBg from './IconCardWithoutBg'
import CommonCard from '../../Component/Card/CommonCard/index'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

const SettingCard = ({ showText, fontSize, Svg, onPress }) => {
    const scheme = useColorScheme()

    return (
        <CommonCard>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={styles.leftContainer}>
                    <NeomorphFlex
                        inner // <- enable shadow inside of neomorph
                        swapShadows // <- change zIndex of each shadow color
                        style={{
                            shadowRadius: 3,
                            borderRadius: 12,
                            backgroundColor: scheme == 'dark' ? colors.darkIcon : colors.lightIcon,
                            padding: 12
                        }}>
                        <Svg fill={scheme == 'dark' ? colors.white : colors.green} />
                    </NeomorphFlex>
                    <View style={styles.middleContainer}>
                        <CommonText showText={showText} fontSize={fontSize} customstyles={{ width: scale(180) }} />
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
    cardCon: {
        borderWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 5
    }

})

export default SettingCard