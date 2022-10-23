import {Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const GreenText = ({showText,fontSize,margin}) => {
  return (
      <Text style={[styles.text,{fontSize:fontSize,marginLeft:margin}]}>{showText}</Text>
  )
}

const styles=StyleSheet.create({
text:{ color: colors.green,fontFamily:commonFonts.bold,fontSize:17},

})

export default GreenText