import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, FlatList, } from 'react-native'
import React from 'react'
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
const Store = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const cartHandler = () => {
        navigation.navigate(routes.MyCart)
    }

    const username = mUserDetails?.username

    const { data, status, isLoading, refetch } = useQuery('storeData', async () => {
        const res = await getStoreDataService(username)
        return res.data
    })

    return (
        <CommonView>
            <View style={styles.innerContainer}>
                <View style={[styles.header]}>
                    <Header showText={'Store'} />
                    <StoreCart onPress={cartHandler} />
                </View>
                {!isLoading && data?.length > 0 ?
                    <FlatList
                        data={data}
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
                    <NoData showText={'No Data Found'} />
                }
            </View>
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