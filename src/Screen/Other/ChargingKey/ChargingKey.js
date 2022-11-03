import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import { scale } from 'react-native-size-matters'
import Button from '../../../Component/Button/Button'
import routes from '../../../Utils/routes'
import CommonText from '../../../Component/Text/CommonText'
import CommonCard from '../../../Component/Card/CommonCard/index'
import { getChargingKeyService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import NoData from '../../../Component/NoDataFound/NoData'

const ChargingKey = () => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const chargingKeyHandler = () => {
        navigation.navigate(routes.Store)
    }

    const username = mUserDetails?.username

    const { data, status, isLoading, refetch } = useQuery('chargingKey', async () => {
        const res = await getChargingKeyService(username)
        return res.data
    })

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <Header showText={'Charging Key'} />
                {!isLoading && data?.length > 0 ?
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => { navigation.navigate(routes.ChargingKeyDetails, { data: item }) }}>
                                    <CommonCard style={styles.card} >
                                        <View >
                                            <Image source={require('../../../assests/chargingKey.png')} style={styles.img} />
                                            <CommonText showText={item?.item?.username} fontSize={18} />
                                            <CommonText showText={item?.item?.auth_id} fontSize={14} />
                                        </View>
                                    </CommonCard>
                                </TouchableOpacity>
                            )
                        }
                        }
                    /> :
                    <NoData showText={'No Charging Key Available'} />
                }

            </View>
            <View style={styles.btnCon}>
                <Button showText={'Order Charging key'} onPress={chargingKeyHandler} />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'
    },
    card: {

        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    img: {
        alignSelf: 'center',
        height: scale(120),
        width: scale(120),
        marginVertical: 10
    },
    btnCon: { marginVertical: 15, paddingHorizontal: 15 },

})

export default ChargingKey