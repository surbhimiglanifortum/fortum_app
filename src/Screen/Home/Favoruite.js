import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
// import DetailsCard from '../../Component/Card/DetailsCard'

const Favoruite = () => {

const navigation=useNavigation()
  const scheme = useColorScheme()
 
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        <Header showText={'Favourite'} />
       <View style={styles.cardContainer}>
        {/* <DetailsCard chargerType={1} /> */}
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
  cardContainer:{
marginTop:20
  },
})

export default Favoruite