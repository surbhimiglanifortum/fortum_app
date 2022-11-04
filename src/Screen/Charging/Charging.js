import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import Card from '../../Component/Card/Card'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'
import { useQuery } from 'react-query'
import { chargingListCompleted, chargingList } from '../../Services/Api'
import CommonText from '../../Component/Text/CommonText'
import colors from '../../Utils/colors'
import { useSelector } from 'react-redux'
import NoData from '../../Component/NoDataFound/NoData'
import ChargerLight from '../../assests/svg/Charger_light'
import CommonView from '../../Component/CommonView'
import Header from '../../Component/Header/Header'
import Loader from '../../Component/Loader'


const Charging = () => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const navigation = useNavigation()
    const [selectedTab, setSelectedTab] = useState('ongoing')
    const [loaderOpen, setLoaderOpen] = useState(false)

    const ongoingBtnHandler = () => {
        setSelectedTab('ongoing')
    }
    const completedBtnHandler = () => {
        setSelectedTab('completed')
    }

    const navigationHandler = (item) => {
        if (selectedTab == 'ongoing') {
            navigation.navigate(routes.OngoingDetails)
        }
        else if (selectedTab == 'completed') {
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
        setLoaderOpen(false)
        return res.data
    })

    return (
        <CommonView>
            {/* <View style={styles.header}>
                <CommonText showText={'Charging'} fontSize={18} />
            </View> */}
            <Header showText={'Charging'} />
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={ongoingBtnHandler} style={[styles.tabButton, { backgroundColor: selectedTab == 'ongoing' ? colors.white : colors.greenBackground }]}>
                    <CommonText customstyles={[{ color: selectedTab == 'ongoing' ? colors.black : colors.white }]} showText={'Ongoing'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={completedBtnHandler} style={[styles.tabButton, { backgroundColor: selectedTab == 'completed' ? '#FFF' : colors.greenBackground }]}>
                    <CommonText customstyles={[{ color: selectedTab == 'completed' ? colors.black : '#FFF' }]} showText={'Compeleted'} />
                </TouchableOpacity>
            </View>

            <View>
                {selectedTab == 'ongoing' &&
                    <>
                        {!loaderOpen && data?.length > 0 ?
                            <FlatList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={(item) => {
                                    return (
                                        <Card tabName={"ongoing"} navigationHandler={() => navigationHandler(item)} Svg={ChargerLight} dataItem={item} />
                                    )
                                }
                                }
                            /> :
                            !loaderOpen && <NoData showText={'No Data Found'} />
                        }
                    </>
                }

                {selectedTab == 'completed' &&
                    <>{!loaderOpen && completedData?.length > 0 ?
                        <FlatList
                            data={completedData}
                            keyExtractor={item => item.id}
                            renderItem={(item) => {
                                return (
                                    <Card tabName={"completed"} navigationHandler={() => navigationHandler(item)} Svg={ChargerLight} dataItem={item} />
                                )
                            }
                            }
                        /> : !loaderOpen && <NoData showText={'No Data Completed'} />
                    }
                    </>
                }
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
        paddingVertical: 8,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    tabButton: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 3,
        width: '50%',
        alignItems: 'center'
    }
})

export default Charging