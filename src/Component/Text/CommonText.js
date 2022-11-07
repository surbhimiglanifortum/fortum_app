import { Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'

const CommonText = ({ showText, fontSize = 16, children, customstyles, bold, regular, semibold}) => {
  const scheme = useColorScheme()

  return (
    <Text style={
      [styles.text, {
        fontSize: fontSize,
        color: scheme == 'dark' ? colors.white : colors.lightText, fontFamily: semibold? commonFonts.bold:regular ? commonFonts.regular : commonFonts.bold

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