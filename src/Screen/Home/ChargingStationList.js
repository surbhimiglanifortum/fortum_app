import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import Button from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../../Component/Header/Header'
import routes from '../../Utils/routes'
import ChargerSmallSvg from '../../assests/svg/ChargerSmallSvg'
import CommonText from '../../Component/Text/CommonText'

const ChargingStationList = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
const startBtnHandler=()=>{
    navigation.navigate(routes.OngoingDetails)
}
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <Header showText={'Charging Station'} />
                    <View style={styles.cardContainer}>
            {
              [1,1,1,].map((item, ind) => {
                return (
                    <TouchableOpacity style={styles.card}  >
                    <View style={styles.centerView}>
                       <View style={styles.icon}>
                        <CommonText showText={'A'} fontSize={20} />
                       </View>
                        <View style={styles.cardInner}>
                            <CommonText showText={'A ChargingPoint'} fontSize={16} />
                            <CommonText showText={`₹ ${'14 / 01 min'}`} fontSize={13} />
                        </View>
                    </View>
                    <View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <View style={styles.rightCon}>
                                <ChargerSmallSvg  />
                                <CommonText showText={'44 KW'} fontSize={12} />
                            </View>
                            <CommonText showText={'Out Of Order'} fontSize={12} customstyles={{color:colors.red}} />
                        </View>
                    </View>
                </TouchableOpacity>
                )
              })
            }

          </View>
                </View>
            </ScrollView>
            <View style={styles.button}>
                <Button showText={'Start'} onPress={startBtnHandler} />
            </View>
        </SafeAreaView>
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
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
    cardContainer:{
        marginTop:20
    },
    card: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
      },
      card: {
        marginTop:10,
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
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    icon:{paddingVertical:12,paddingHorizontal:16,backgroundColor:colors.greenBackground,borderRadius:5},
})

export default ChargingStationList