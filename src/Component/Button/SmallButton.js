import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BackSvg from '../../assests/svg/back'

const SmallButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <BackSvg />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
  container:{
    backgroundColor:colors.white,
    alignSelf:'flex-start',
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:8,
    elevation:10,
    marginLeft:10
  }  
})

export default SmallButton