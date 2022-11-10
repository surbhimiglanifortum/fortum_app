import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, FlatList, RefreshControl, } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import routes from '../../../Utils/routes'
import StoreCard from '../../../Component/Card/StoreCard/StoreCard'
import { getStoreDataService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import CommonText from '../../../Component/Text/CommonText'
import StoreCart from '../../../Component/Card/StoreCard/StoreCart'
import { useSelector } from 'react-redux'
import NoData from '../../../Component/NoDataFound/NoData'
import CommonView from '../../../Component/CommonView/index'
import Loader from '../../../Component/Loader'
const Store = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const [loaderOpen, setLoaderOpen] = useState(false)
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const cartHandler = () => {
        navigation.navigate(routes.MyCart)
    }

    const username = mUserDetails?.username

    const { data, status, isLoading, refetch } = useQuery('storeData', async () => {
        setLoaderOpen(true)
        const res = await getStoreDataService(username)
        setLoaderOpen(false)
        return res.data
    })

    return (
        <CommonView>
            <View style={styles.innerContainer}>
                <View style={[styles.header]}>
                    <Header showText={'Store'} />
                    <StoreCart onPress={cartHandler} />
                </View>
                {!loaderOpen && data?.length > 0 ?
                    <FlatList
                        data={data}
                        refreshControl={<RefreshControl onRefresh={refetch} />}
                        keyExtractor={item => item.id}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(routes.StoreDetails, { dataItem: item })
                                }}>
                                    <StoreCard dataItem={item} />
                                </TouchableOpacity>
                            )
                        }
                        }
                    /> :
                    !loaderOpen && <NoData showText={'No Data Found'} />
                }
            </View>
            <Loader modalOpen={loaderOpen} />
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    },

})


export default Store