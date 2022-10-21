import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import BlackText from '../../../Component/Text/BlackText'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import ElectricCarSvg from '../../../assests/svg/ElectricCarSvg'
import routes from '../../../Utils/routes'
import IconCardWithoutBg from '../../../Component/Card/IconCardWithoutBg'

const AddEvModal = () => {
  const navigation = useNavigation()
  const scheme = useColorScheme()
  const addVehicleHandler = () => {
    navigation.navigate(routes.SelectVehicle)
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        {/* <Header /> */}
        <Header showText={'Select Brand'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {
              [1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, ind) => {
                return (
                  <TouchableOpacity style={styles.card} onPress={addVehicleHandler}>
                    <IconCardWithoutBg Svg={ElectricCarSvg} backgroundColor={colors.green} />
                    <BlackText showText={'BMW'} margin={10} />
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </ScrollView>
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
    marginVertical: 20,
    marginBottom: 50
  }
})

export default AddEvModal