import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import SettingCard from '../../../Component/Card/SettingCard'
import OrderSvg from '../../../assests/svg/OrderSvg'
import routes from '../../../Utils/routes'

const Order = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
const orderCardHandler=()=>{
    navigation.navigate(routes.OrderDetails)
}
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <Header showText={'Orders'} />

                <View style={styles.headerText}>
                    <CommonText showText={'Today'} fontSize={16} />
                </View>
                <SettingCard Svg={OrderSvg} showText={'8GDGBC57JG4GHDH'} fontSize={16} onPress={orderCardHandler} />
                <View style={styles.headerText}>
                    <CommonText showText={'12/08/2022'} fontSize={16} />
                </View>
                <SettingCard Svg={OrderSvg} showText={'8GDGBC57JG4GHDH'} fontSize={16} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
    headerText: {
        marginTop: 25,

    }
})

export default Order