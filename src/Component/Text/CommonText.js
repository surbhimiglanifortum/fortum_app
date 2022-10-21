import { View, Text, StyleSheet,useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const CommonText = ({showText,fontSize, childern,}) => {
  const scheme=useColorScheme()

  return (
      <Text style={[styles.text,{fontSize:fontSize,fontSize:fontSize,color:scheme=='dark'?colors.white:colors.BlackText}]}>{showText || childern}</Text>
  )
}

const styles=StyleSheet.create({
text:{ color: colors.white,fontFamily:commonFonts.bold,},

})

export default CommonText