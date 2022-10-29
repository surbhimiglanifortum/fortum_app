import { View, SafeAreaView, StyleSheet, useColorScheme, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import DetailsCard from '../../Component/Card/DetailsCard'
import CommonText from '../../Component/Text/CommonText'
import routes from '../../Utils/routes'
import EvCard from '../../Component/Card/EvCard'
import { getEvses } from '../../Services/Api'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

const ChargingStation = ({ route }) => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const [loading, setLoading] = useState(false)

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const locDetails = route.params?.data

    const chargerCardHandler = (evDetails) => {
        navigation.navigate(routes.OngoingDetails, {
            locDetails: locDetails,
            evDetails: evDetails
        })
    }

    const evsesData = async () => {
        setLoading(true)
        try {
            const payload = {
                username: mUserDetails.username
            }
            const res = await getEvses(locDetails?.id, payload)
            setLoading(false)
            return res?.data
        } catch (error) {
            console.log("Evses Data Error", error)
            setLoading(false)
        }
    }

    const { data, status, refetch } = useQuery(`Evses List ${locDetails.id}`, evsesData, {
        // Refetch the data every second
        refetchInterval: 15000,
    })

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <Header showText={'Charging Station'} />
                <DetailsCard item={locDetails} />
                <View style={styles.searchList}>
                    <CommonText showText={'Charger'} fontSize={18} />
                    {loading && <ActivityIndicator />}
                    {
                        data?.evses.map((item, index) => {
                            return (
                                item?.connectors.map((i, n) => {
                                    return (
                                        <EvCard onPress={() => chargerCardHandler(item)}
                                            backgroundColor={item?.status === 'AVAILABLE' ? colors.green : item.status === 'CHARGING' ? "#4373B5" : colors.matteRed}
                                            title={item?.evse_id.replace("IN*CNK*", "").replace(/\*/g, '\-')}
                                            subTitle={'₹ ' + parseFloat(i?.pricing?.price).toFixed(2) + '/' + (i?.pricing?.type === "TIME" ? "min" : i?.pricing?.type === "FLAT" ? "flat" : "kWh+GST")}
                                            rightText={item?.status}
                                            rightTitleColor={item?.status === 'AVAILABLE' ? colors.green : item.status === 'CHARGING' ? "#4373B5" : colors.matteRed}
                                        />
                                    )
                                })
                            )
                        })
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 15
    },
    searchList: {
        marginTop: 20
    }
})

export default ChargingStation