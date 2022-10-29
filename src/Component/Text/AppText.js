import { Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import commonFonts from '../../Utils/fonts/fonts'

const AppText = ({ text, fontSize, margin, color }) => {
  const scheme = useColorScheme()
  return (
    <Text style={[styles.text, { fontSize: fontSize, marginLeft: margin, color: color }]}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: commonFonts.bold,
    fontSize: 17
  },
})


export default AppText