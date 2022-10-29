import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import DetailsCard from '../../Component/Card/DetailsCard'
import BlackText from '../../Component/Text/BlackText'
import IconCard from '../../Component/Card/IconCard'
import Location1Svg from '../../assests/svg/Location1Svg'
import RedText from '../../Component/Text/RedText'
import routes from '../../Utils/routes'
import EvCard from '../../Component/Card/EvCard'
import { getEvses } from '../../Services/Api'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

const ChargingStation = ({ route }) => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const locDetails = route.params?.data

    console.log("Check Charging Station Route", route.params?.locDetails)

    const chargerCardHandler = () => {
        navigation.navigate(routes.ChargingStationList)
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

    const { data, status, refetch } = useQuery('Evses List', evsesData, {
        // Refetch the data every second
        refetchInterval: 15000,
    })

    console.log("Check Charging Station Route Data", data)
    console.log("Check Charging Station Route Status", status)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <Header showText={'Charging Station'} />
                <View style={styles.cardContainer}>
                    <DetailsCard item={locDetails} />
                </View>
                <View style={styles.searchList}>
                    <BlackText showText={'Charger'} fontSize={18} />
                    {
                        data?.evses.map((item, index) => {
                            let ac_con = item.connectors
                            return <EvCard title={item?.evse_id.replace("IN*CNK*", "").replace(/\*/g, '\-')} />
                        })
                    }
                    {/* <TouchableOpacity style={styles.card} onPress={chargerCardHandler} >
                        <View style={styles.centerView}>
                            <IconCard Svg={Location1Svg} />
                            <View style={styles.cardInner}>
                                <BlackText showText={'Shake Mafia'} fontSize={16} />
                                <BlackText showText={'Shake Mafia'} fontSize={13} />
                            </View>
                        </View>
                        <View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <View style={styles.rightCon}>
                                    <BlackText showText={'0/2'} />
                                </View>
                                <RedText showText={'Out Of Order'} />
                            </View>
                        </View>
                    </TouchableOpacity> */}
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
    cardContainer: {
        marginTop: 20
    },
    searchList: {
        marginTop: 20
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 10,
        elevation: 5,
        justifyContent: 'space-between'
    },
    cardInner: {
        marginLeft: 10
    },
    centerView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightCon: {
        backgroundColor: colors.green,
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 4,
    },

})

export default ChargingStation