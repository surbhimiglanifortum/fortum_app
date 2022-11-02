import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonText from '../../Text/CommonText'
import colors from '../../../Utils/colors'
import { useSelector } from 'react-redux'
import CommonView from '../../CommonView/index'

const StoreCart = ({ onPress }) => {

    const scheme = useColorScheme()
    const cartData = useSelector((state) => state.AddToCartReducers.cartItem)
    let cartlength = cartData?.length

    return (
        <TouchableOpacity style={[styles.cartCon, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight, }]} onPress={onPress}>
            <AntDesign name='shoppingcart' color={colors.black} size={25} />
            {<View style={styles.cartNum}>
                <CommonText showText={cartlength} fontSize={12} customstyles={{ color: colors.white, textAlign: 'center' }} />
            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cartCon: {
        backgroundColor: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        elevation: 5
    },
    cartNum: { position: 'absolute', backgroundColor: '#f55c7f', right: -10, top: -15, paddingHorizontal: 5, borderRadius: 100, borderWidth: 2, borderColor: colors.white, width: 30, paddingVertical: 4 },
})

export default StoreCart
