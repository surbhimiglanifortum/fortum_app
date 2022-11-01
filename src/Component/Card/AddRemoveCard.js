import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import commonFonts from '../../Utils/fonts/fonts'
import LinearGradient from 'react-native-linear-gradient'
import CommonText from '../Text/CommonText'

const AddRemoveCard = () => {
    const scheme = useColorScheme()

    return (
        <LinearGradient colors={scheme === 'dark' ? [colors.denseShadowDark, colors.denseShadowSecondary] : [colors.denseShadow, colors.white]} style={[styles.linearGradient]}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.minusIcon}>
                    <AntDesign name='minus' size={20} color={colors.white} />
                </TouchableOpacity>
                <CommonText showText={'10'} />
                <TouchableOpacity style={styles.plusIcon}>
                    <AntDesign name='plus' size={20} />
                </TouchableOpacity>

            </View>
        </LinearGradient >

    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        paddingVertical: 7,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    plusIcon: {
        backgroundColor: colors.green,
        elevation: 40,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 10
    },
    minusIcon: {
        backgroundColor: colors.lightGray,
        elevation: 40,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 10,
    },
    text: {
        color: colors.black,
        fontFamily: commonFonts.bold,
        fontSize: 18
    },
    linearGradient: {
        borderRadius: 7,
        marginVertical: 10
    },
})

export default AddRemoveCard