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
    <TouchableOpacity onPress={() => { navigation.goBack() }}>
      <CommonCard margin={1}>
        <AntDesign name='left' size={25} color={scheme == 'dark' ? colors.white : colors.black} />
      </CommonCard>
    </TouchableOpacity>
  )
}


export default BackButton