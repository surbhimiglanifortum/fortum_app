import {  TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import BlackText from '../Text/BlackText'
const AddMoneyButton = ({backgroundColor,showText,fontSize}) => {
  return (
    <TouchableOpacity style={[styles.container,{ backgroundColor:backgroundColor}]}>
      <BlackText showText={showText} fontSize={fontSize}  />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
  container:{
    alignSelf:'flex-start',
    paddingVertical:15,
    paddingHorizontal:15,
    borderRadius:8,
    elevation:10,
    marginRight:10,
    marginBottom:20
  }  
})


export default AddMoneyButton