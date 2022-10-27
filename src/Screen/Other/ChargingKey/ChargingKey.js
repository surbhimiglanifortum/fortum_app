import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from 'react-native-size-matters'
import BlackText from '../../../Component/Text/BlackText'
import Button from '../../../Component/Button/Button'
import routes from '../../../Utils/routes'

const ChargingKey = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
const chargingKeyHandler=()=>{
    navigation.navigate(routes.Store)
}

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <Header showText={'Charging Key'} />
                    <View >
                        {
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, ind) => {
                                return (
                                    <View key={ind} style={styles.card}>
                                        <Image source={require('../../../assests/chargingKey.png')} style={styles.img} />
                                        <BlackText showText={'Name'} fontSize={20} />
                                        <BlackText showText={`04HDGBFGNDC98DN89`} fontSize={14} />
                                    </View>
                                )
                            })
                        }
                    </View>

                </View>
            </ScrollView>
            <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
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
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cartCon: {
        backgroundColor: colors.white,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 6,
        elevation: 5
    },
    card: {
        backgroundColor: colors.white,
        marginTop: 25,
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

})

export default ChargingKey