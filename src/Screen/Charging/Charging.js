import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale } from 'react-native-size-matters'
import Card from '../../Component/Card/Card'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import routes from '../../Utils/routes'
import { useQuery } from 'react-query'
import { chargingListCompleted, chargingList } from '../../Services/Api'
import CommonText from '../../Component/Text/CommonText'
import colors from '../../Utils/colors'
import { useSelector } from 'react-redux'
import NoData from '../../Component/NoDataFound/NoData'
import CommonView from '../../Component/CommonView'
import Loader from '../../Component/Loader'
import Charger from '../../assests/svg/charger'
import DenseCard from '../../Component/Card/DenseCard/index'
import ChargerRed from '../../assests/svg/ChargerRed'
import Header from '../../Component/Header/Header'

let backHandler

const Charging = ({ setSelectedTab, route, chargingsrc }) => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const [tab, setTab] = useState(chargingsrc == "charging" ? 'completed' : 'ongoing')
    const [loaderOpen, setLoaderOpen] = useState(false)

    const ongoingBtnHandler = () => {
        setTab('ongoing')
    }
    const completedBtnHandler = () => {
        setTab('completed')
    }

    // useEffect(() => {
    //     if (unPaidSeesion == 'comp') {
    //         setTab('completed')
    //     }
    // }, [unPaidSeesion])


    const navigationHandler = (item) => {
        if (tab == 'ongoing') {
            navigation.navigate(routes.OngoingDetails, {
                locDetails: {
                    ...item.item.location, address: {
                        "city": item.item?.location?.city,
                        "street": item.item?.location?.address,
                        "countryIsoCode": "IND",
                        "postalCode": "11112"
                    }
                },
                evDetails: item.item?.location?.evses[0],
                paymentMethod: item.item?.payments?.payment_method
            })
        }
        else if (tab == 'completed') {
            navigation.navigate(routes.taxInvoice, {
                data: item
            })
        }
    }

    const username = mUserDetails?.username

    const { data, status, isLoading, refetch } = useQuery('chargingData', async () => {
        setLoaderOpen(true)
        const res = await chargingList(username)
        setLoaderOpen(false)
        return res.data
    })
    const { data: completedData, status: completedStatus, isLoading: completedIsLoading, refetch: completedreFetch } = useQuery('chargingCompletedData', async () => {
        setLoaderOpen(true)
        const res = await chargingListCompleted(username)
        console.log("CIMLEELJEJFDS",res)
        setLoaderOpen(false)
        return res.data
    })

    const backhandler = () => {
        setSelectedTab('home')
    }

    useEffect(() => {
        completedreFetch()
        refetch()
    }, [isFocused])


    return (
        <CommonView>
            <Header onPress={backhandler} showText={"Charging"} />
            <View style={styles.tabContainer}>
                {tab == 'ongoing' ?
                    <DenseCard paddingLeft={20} paddingRight={20} padding={8} marginVertical={2} margin={2}>
                        <TouchableOpacity onPress={ongoingBtnHandler} style={[styles.tabButton,]}>
                            <CommonText customstyles={[{ color: tab == 'ongoing' ? colors.green : colors.white }]} showText={'Ongoing'} />
                        </TouchableOpacity>
                    </DenseCard>
                    : <TouchableOpacity onPress={ongoingBtnHandler} style={[styles.tabButton,]}>
                        <CommonText customstyles={[{ color: tab == 'ongoing' ? colors.black : colors.white }]} showText={'Ongoing'} />
                    </TouchableOpacity>
                }

                {tab == 'completed' ?
                    <DenseCard paddingLeft={20} paddingRight={20} padding={8} marginVertical={2} margin={2}>
                        <TouchableOpacity onPress={completedBtnHandler} style={[styles.tabButton,]}>
                            <CommonText customstyles={[{ color: tab == 'completed' ? colors.green : '#FFF' }]} showText={'Completed'} />
                        </TouchableOpacity>
                    </DenseCard>
                    : <TouchableOpacity onPress={completedBtnHandler} style={[styles.tabButton,]}>
                        <CommonText customstyles={[{ color: tab == 'completed' ? colors.black : '#FFF' }]} showText={'Completed'} />
                    </TouchableOpacity>
                }
            </View>

            <View style={{ flex: 1 }}>
                {tab == 'ongoing' &&
                    <>
                        {!loaderOpen && data?.length > 0 ?
                            <FlatList
                                data={data}
                                refreshControl={<RefreshControl onRefresh={refetch} refreshing={loaderOpen} />}
                                keyExtractor={item => item.id}
                                renderItem={(item) => {
                                    return (
                                        <Card tabName={"ongoing"} navigationHandler={() => navigationHandler(item)} Svg={item?.item?.paid ? Charger : ChargerRed} dataItem={item} />
                                    )
                                }
                                }
                            /> :
                            !loaderOpen && <NoData showText={'No Data Found'} />
                        }
                    </>
                }

                <View >
                    {tab == 'completed' &&
                        <>{!loaderOpen && completedData?.length > 0 ?
                            <FlatList
                                data={completedData}
                                refreshControl={<RefreshControl refreshing={loaderOpen} onRefresh={completedreFetch} />}
                                keyExtractor={item => item.id}

                                renderItem={(item) => {
                                    return (
                                        <>
                                            {item?.item?.status != "ACTIVE" && <Card tabName={"completed"} navigationHandler={() => navigationHandler(item)} Svg={item?.item?.paid ? Charger : ChargerRed} SvgBg={item?.item?.paid} dataItem={item} />}
                                        </>
                                    )
                                }
                                }
                            /> : !loaderOpen && <NoData showText={'No Data Completed'} />
                        }
                        </>
                    }
                </View>
            </View>
            <Loader modalOpen={loaderOpen} />
        </CommonView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 10
    },
    innerContainer: {
        marginVertical: scale(10),
        paddingBottom: 200
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    headerText: {
        fontSize: scale(17),
    },
    iconContainer: {
        borderWidth: 1,
        paddingVertical: scale(3),
        paddingHorizontal: scale(15),
        borderRadius: 2,
        overflow: 'hidden',
        borderColor: '#EFEFEF',
        elevation: 2
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scale(15),
        backgroundColor: '#5AC37D',
        paddingVertical: 2,
        borderRadius: 10,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    tabButton: {
        paddingHorizontal: 15,
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 30
    }
})

export default Charging