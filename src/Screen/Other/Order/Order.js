import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import SettingCard from '../../../Component/Card/SettingCard'
import OrderSvg from '../../../assests/svg/OrderSvg'
import routes from '../../../Utils/routes'
import { getOrdersService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import NoData from '../../../Component/NoDataFound/NoData'
import OrdersCard from '../../../Component/Card/OrdersCard'
import OrderGreenSvg from '../../../assests/svg/OrderGreenSvg'
import { useSelector } from 'react-redux'
const Order = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const orderCardHandler = () => {
        navigation.navigate(routes.OrderDetails)
    }

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const username = mUserDetails?.username

    const { data, status, isLoading, refetch } = useQuery('ordersData', async () => {
        const res = await getOrdersService(username)
        return res.data
    })

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <Header showText={'Orders'} />
                <View style={styles.headerText}>
                    <CommonText showText={'Today'} fontSize={16} />
                </View>
                <OrdersCard Svg={OrderGreenSvg} showText={'8GDGBC57JG4GHDH'} fontSize={16} onPress={orderCardHandler} />


                <View>
                    <CommonText showText={'sdff'} />
                </View>
              


                    <View style={styles.headerText}>
                        <CommonText showText={'12/08/2022'} fontSize={16} />
                    </View>
                {!isLoading && data?.length > 0 ?
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(routes.OrderDetails, { dataItem: item })
                                }} >
                                    <OrdersCard Svg={OrderGreenSvg} showText={item?.item?.id} fontSize={16} />
                                </TouchableOpacity>
                            )
                        }
                        }
                    /> :
                    <NoData showText={'No Orders List Found'} />
                }

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
        marginTop: 20,
        flex: 1
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