import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const CommonText = ({showText}) => {
  return (
      <Text style={styles.text}>{showText}</Text>
  )
}

const styles=StyleSheet.create({
text:{ color: colors.white,fontFamily:commonFonts.bold,marginLeft:7},

})

export default CommonText