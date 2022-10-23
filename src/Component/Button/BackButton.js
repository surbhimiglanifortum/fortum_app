import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const BackButton = ({onPress}) => {
const navigation=useNavigation()

  return (
    <TouchableOpacity style={styles.container} onPress={()=>{navigation.goBack()}}>
      <AntDesign name='left' size={25} color={colors.black} />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
  container:{
    backgroundColor:colors.white,
    alignSelf:'flex-start',
    paddingVertical:5,
    paddingHorizontal:8,
    borderRadius:8,
    elevation:10,
    marginRight:10
  }  
})


export default BackButton