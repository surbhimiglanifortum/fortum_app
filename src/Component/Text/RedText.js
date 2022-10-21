import {Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const RedText = ({showText,fontSize}) => {
  return (
      <Text style={[styles.text,{fontSize:fontSize}]}>{showText}</Text>
  )
}

const styles=StyleSheet.create({
text:{ color: colors.red,fontFamily:commonFonts.bold,marginLeft:10,fontSize:17},

})

export default RedText