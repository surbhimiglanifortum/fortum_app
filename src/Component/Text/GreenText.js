import {Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const GreenText = ({showText,fontSize}) => {
  return (
      <Text style={[styles.text,{fontSize:fontSize}]}>{showText}</Text>
  )
}

const styles=StyleSheet.create({
text:{ color: colors.green,fontFamily:commonFonts.bold,marginLeft:7,fontSize:17},

})

export default GreenText