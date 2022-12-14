import { View, SafeAreaView, StyleSheet, useColorScheme, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../../Utils/colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import OrderSvg from '../../../assests/svg/OrderSvg'
import routes from '../../../Utils/routes'
import { getOrdersService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import NoData from '../../../Component/NoDataFound/NoData'
import OrdersCard from '../../../Component/Card/OrdersCard'
import { useSelector } from 'react-redux'
import Loader from '../../../Component/Loader'

const Order = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const isFocused = useIsFocused()
    const orderCardHandler = () => {
        navigation.navigate(routes.OrderDetails)
    }
    const [loaderOpen, setLoaderOpen] = useState(false)

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const username = mUserDetails?.username

    const { data, status, isLoading, refetch } = useQuery('ordersData', async () => {
        setLoaderOpen(true)
        const res = await getOrdersService(username)
        var result = res.data
        setLoaderOpen(false)
        return result
    })
    useEffect(() => {
        refetch()
    }, [isFocused])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <Header showText={`Orders(${data?.length || ''})`} />
                {/* <View style={styles.headerText}>
                    <CommonText showText={'Today'} fontSize={16} />
                </View>
                <OrdersCard Svg={OrderSvg} showText={'8GDGBC57JG4GHDH'} fontSize={16} />
                <View style={styles.headerText}>
                    <CommonText showText={'12/08/2022'} fontSize={16} />
                </View> */}
                {!loaderOpen && data?.length > 0 ?
                    <FlatList
                        data={data}
                        refreshControl={<RefreshControl onRefresh={refetch} />}
                        keyExtractor={item => item.id}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(routes.OrderDetails, { dataItem: item })
                                }} >
                                    <OrdersCard Svg={OrderSvg} showText={item?.item?.id} fontSize={16} icon={item?.item?.paid} />
                                </TouchableOpacity>
                            )
                        }
                        }
                    /> :
                    !loaderOpen && <NoData showText={'No Orders List Found'} />
                }

            </View>
            <Loader modalOpen={loaderOpen} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {

        marginTop: 20,
        flex: 1
    },
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
    headerText: {
        marginTop: 25,
        paddingHorizontal: 12

    }
})

export default Order