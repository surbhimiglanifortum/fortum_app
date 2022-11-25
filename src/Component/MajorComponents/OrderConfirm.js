import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, useColorScheme, FlatList, TouchableOpacity } from 'react-native'
import CommonView from '../CommonView'
import CommonText from '../Text/CommonText'
import Header from '../Header/Header'
import IconCard from '../Card/IconCard'
import ConfirmOrder from '../../assests/svg/ConfirmOrder'
import WhiteButton from '../Button/WhiteButton'

const OrderConfirm = ({ header, subHeading, btnText, onPress, subHeadingStyle }) => {
    return (
        <CommonView style={styles.container}>
            <Header showText={header || 'Order Confirmed'} backButton={false} />
            <IconCard Svg={ConfirmOrder} />
            <CommonText showText={'Congratulations!'} customstyles={styles.heading} fontSize={24} />
            <CommonText showText={subHeading} customstyles={[subHeadingStyle]} />
            <WhiteButton showText={btnText} onPress={onPress} style={styles.btn} />
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    heading: {
        marginVertical: 10
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20
    }
})

export default OrderConfirm