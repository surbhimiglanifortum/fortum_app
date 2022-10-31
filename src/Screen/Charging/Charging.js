import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters'
import Card from '../../Component/Card/Card'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'
import Charger from '../../assests/svg/charger'
import { useQuery } from 'react-query'
import { chargingListCompletedServices, chargingListServices } from '../../Services/ChargingTabServices/ChargingServices'
import CommonText from '../../Component/Text/CommonText'
import colors from '../../Utils/colors'

const Charging = () => {
    const navigation = useNavigation()
    const [selectedTab, setSelectedTab] = useState('ongoing')
    const [loading, setLoading] = useState(false)
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

    const { data, status, isLoading, refetch } = useQuery('chargingData', async () => {
        const res = await chargingListServices()
        return res.data
    })
    const { data: completedData, status: completedStatus, isLoading: completedIsLoading, refetch: completedreFetch } = useQuery('chargingCompletedData', async () => {
        const res = await chargingListCompletedServices()
        return res.data
    })

    return (
        <View style={styles.conatiner}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <CommonText showText={'Charging'} fontSize={18} />
                </View>
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
                            {!isLoading && data?.length > 0 ?
                                <FlatList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    renderItem={(item) => {
                                        return (
                                            <Card tabName={"ongoing"} navigationHandler={navigationHandler} Svg={Charger} dataItem={item} />
                                        )
                                    }
                                    }
                                /> :
                                <CommonText showText={'No Data Found'} customstyles={{ alignSelf: 'center', marginTop: 50 }} />
                            }
                        </>
                    }

                    {selectedTab == 'completed' &&
                        <>
                            <FlatList
                                data={completedData}
                                keyExtractor={item => item.id}
                                renderItem={(item) => {
                                    return (
                                        <Card tabName={"completed"} navigationHandler={() => navigationHandler(item)} Svg={Charger} dataItem={item} />
                                    )
                                }
                                }
                            />
                        </>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
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