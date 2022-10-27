import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import DetailsCard from '../../Component/Card/DetailsCard'
import BlackText from '../../Component/Text/BlackText'
import IconCard from '../../Component/Card/IconCard'
import Location1Svg from '../../assests/svg/Location1Svg'
import RedText from '../../Component/Text/RedText'
import routes from '../../Utils/routes'

const ChargingStation = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
const chargerCardHandler=()=>{
    navigation.navigate(routes.ChargingStationList)
}
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <Header showText={'Charging Station'} />
                <View style={styles.cardContainer}>
                    <DetailsCard />
                </View>
                <View style={styles.searchList}>
                    <BlackText showText={'Charger'} fontSize={18} />
                    <TouchableOpacity style={styles.card} onPress={chargerCardHandler} >
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
                    </TouchableOpacity>
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