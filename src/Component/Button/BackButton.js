import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import CommonCard from '../../Component/Card/CommonCard/index'
const BackButton = ({ onPress }) => {
  const navigation = useNavigation()
  const scheme = useColorScheme()

  return (
    <CommonCard margin={1}>
      <TouchableOpacity style={[styles.container]} onPress={() => { navigation.goBack() }}>
        <AntDesign name='left' size={25} color={ scheme == 'dark'?colors.white:colors.black} />
      </TouchableOpacity>
    </CommonCard>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start'
  }
})


export default BackButton