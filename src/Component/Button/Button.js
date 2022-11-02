import { TouchableOpacity, StyleSheet, } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onPress, showText, color, onLoading, setOnLoading, style, disable, bg }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: !onLoading ? colors.greenBackground : colors.grey,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 10
    }
  })

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: bg || colors.green }, style]} disabled={disable}>
      <CommonText showText={showText} fontSize={17} customstyles={{ color: colors.white }} />
    </TouchableOpacity>
  )
}




export default Button