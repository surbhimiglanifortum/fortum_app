import {Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const BlueText = ({showText,fontSize,margin}) => {
  const scheme=useColorScheme()
  return (
      <Text style={[styles.text,{fontSize:fontSize,marginLeft:margin}]}>{showText}</Text>
  )
}

const styles=StyleSheet.create({
text:{ color: colors.blue,fontFamily:commonFonts.bold,fontSize:17},

})

export default BlueText