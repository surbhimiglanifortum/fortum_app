import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import ElectricCarSvg from '../../../assests/svg/ElectricCarSvg'
import routes from '../../../Utils/routes'
import IconCardWithoutBg from '../../../Component/Card/IconCardWithoutBg'
import CommonText from '../../../Component/Text/CommonText'

const SelectVehicle = () => {
    const navigation = useNavigation()
    const scheme = useColorScheme()
const addEvModalBtnHandler=()=>{
    navigation.navigate(routes.EvModal)
}
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <Header showText={'Select Vehicles'} />
                    <View style={styles.cardContainer}>
            {
              [1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, ind) => {
                return (
                  <TouchableOpacity style={styles.card} >
                    <IconCardWithoutBg Svg={ElectricCarSvg} backgroundColor={colors.green} />
                    <CommonText showText={'MZ zs ev'} margin={10} />
                  </TouchableOpacity>
                )
              })
            }

          </View>
                </View>
            </ScrollView>
            <View style={styles.button}>
                <Button showText={'Confirm'} onPress={addEvModalBtnHandler} />
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
    card: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
      },
      cardContainer: {
        // marginVertical: 20,
        // marginBottom: 50
      }
})

export default SelectVehicle