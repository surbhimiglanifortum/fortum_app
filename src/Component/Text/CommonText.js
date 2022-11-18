import { Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'
import robotoFonts from '../../Utils/fonts/robotoFonts'

const CommonText = ({ showText, fontSize = 16, children, customstyles, bold, regular, semibold, black, medium, onPress }) => {
  const scheme = useColorScheme()

  return (
    <Text onPress={onPress} style={
      [styles.text, {
        fontSize: fontSize,

        color: scheme == 'dark' ? colors.white : colors.lightText, fontFamily: semibold ? commonFonts.semibold : regular ? commonFonts.regular : black ? commonFonts.black : medium ? robotoFonts.medium : commonFonts.bold
      },
        customstyles
      ]}
    >
      {showText || children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: { color: colors.white },
})

export default CommonText