import { View, StyleSheet, useColorScheme, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import DetailsCard from '../../Component/Card/DetailsCard'
import CommonText from '../../Component/Text/CommonText'
import routes from '../../Utils/routes'
import EvCard from '../../Component/Card/EvCard'
import { getEvses, chargingList, getAllUnpaid } from '../../Services/Api'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import CommonView from '../../Component/CommonView'
import SnackContext from '../../Utils/context/SnackbarContext'
import Loader from './../../Component/Loader/index';

const ChargingStation = ({ route }) => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    const { setOpenCommonModal } = useContext(SnackContext);

    const [loading, setLoading] = useState(true)
    const [unpaidSession, setUnpaidSession] = useState([])
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const locDetails = route.params?.data

    useEffect(() => {
        const callAsync = async () => {

            const unpaidResult = await getAllUnpaid(mUserDetails.username).catch((error) => {
                setLoading(false)
                console.log("Error in allunpaid", error)
            })
            setLoading(false)
            setUnpaidSession(unpaidResult?.data)
        }
        callAsync()

    }, [])


    const fetchLastSession = async (evseid) => {
        const response = await chargingList(mUserDetails.username)
        let activeSession
        response?.data?.forEach((item, index) => {
            // console.log('Session Id')
            if (!item) {
                return;
            }

            const activeConnectors = item.location.evses[0].connectors

            activeConnectors.forEach(i => {
                if (i.id === evseid) {
                    activeSession = item
                    console.log(true)
                }
            })

        })
        return activeSession
    }

    const chargerCardHandler = async (evDetails) => {
        if (loading) return
        if (evDetails?.status === "CHARGING") {
            const response = await fetchLastSession(evDetails?.uid)
            console.log("respo", response)
            if (response) {
                navigation.navigate(routes.OngoingDetails, {
                    locDetails: locDetails,
                    evDetails: evDetails,
                    paymentMethod: response?.payments?.payment_method
                })
            }
            return
        }
        if (evDetails?.status === 'AVAILABLE') {
            if (unpaidSession?.length > 0) {
                setOpenCommonModal({
                    isVisible: true, message: `You have unpaid Charging Session`,
                })
            } else {
                setOpenCommonModal({
                    isVisible: true, message: `Minimum Balance of ₹ ${evDetails?.connectors[0]?.pricing?.min_balance} to start charging` || result.data?.message,
                    heading: 'Payment',
                    onOkPress: () => {
                        navigation.navigate(routes.PayMinimum, {
                            locDetails: locDetails,
                            evDetails: evDetails
                        })
                    }
                })
            }


        } else {
            setOpenCommonModal({
                isVisible: true, message: `Charger No Available right now`
            })
        }
    }



    const evsesData = async () => {
        try {
            const payload = {
                username: mUserDetails.username
            }
            const res = await getEvses(locDetails?.id, payload)
            return res?.data
        } catch (error) {
            console.log("Evses Data Error", error)
        }
    }

    const { data, status, refetch, isRefetching } = useQuery(`Evses List ${locDetails.id}`, evsesData, {
        // Refetch the data every second
        refetchInterval: 30000,
    })


    return (
        <CommonView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <Header showText={'Charging Station'} />
            <ScrollView>
                <DetailsCard item={locDetails} />
                <View style={styles.searchList}>
                    <CommonText showText={'Charger'} fontSize={18} />
                    <Loader modalOpen={isRefetching} />
                    {!isRefetching &&
                        data?.evses.map((item, index) => {
                            return (
                                item?.connectors.map((i, n) => {
                                    return (
                                        <EvCard item={i} onPress={() => chargerCardHandler(item)}
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
            </ScrollView>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    searchList: {
        marginTop: 20
    }
})

export default ChargingStation