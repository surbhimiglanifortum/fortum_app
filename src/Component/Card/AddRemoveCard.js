import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import commonFonts from '../../Utils/fonts/fonts'
import LinearGradient from 'react-native-linear-gradient'
import CommonText from '../Text/CommonText'
import DenseCard from '../../Component/Card/DenseCard/index'

const AddRemoveCard = ({ removeQty, addQty, cartCount,disabled,showText }) => {
    const scheme = useColorScheme()


    return (
       <DenseCard padding={5}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => removeQty()} disabled={disabled}
                    style={[styles.minusIcon, { backgroundColor: scheme == 'dark' ? colors.lightGray : colors.white }]}>
                    <AntDesign name='minus' size={20} color={scheme == 'dark' ? colors.white : colors.black} />
                </TouchableOpacity>
                <CommonText showText={cartCount ? cartCount : showText?showText:'1'} />
                <TouchableOpacity onPress={() => addQty()}
                    style={styles.plusIcon}>
                    <AntDesign name='plus' size={20} color={colors.white} />
                </TouchableOpacity>
            </View>
            </DenseCard>

    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        // paddingVertical: 2,
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    plusIcon: {
        backgroundColor: colors.green,
        elevation: 40,
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.white
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