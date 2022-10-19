import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
const AddButton = ({backgroundColor,iconName,color}) => {
  return (
    <TouchableOpacity style={[styles.container,{ backgroundColor:backgroundColor}]}>
      <AntDesign size={25} name={iconName} color={color} />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
  container:{
   
    alignSelf:'flex-start',
    paddingVertical:8,
    paddingHorizontal:12,
    borderRadius:8,
    elevation:10,
    marginRight:10
  }  
})


export default AddButton