import {Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const WhiteText = ({showText,fontSize,margin,color}) => {
  const scheme=useColorScheme()
  return (
      <Text style={[styles.text,{fontSize:fontSize,marginLeft:margin,color:color}]}>{showText}</Text>
  )
}

const styles=StyleSheet.create({
text:{ fontFamily:commonFonts.bold,fontSize:17},

})


export default WhiteText