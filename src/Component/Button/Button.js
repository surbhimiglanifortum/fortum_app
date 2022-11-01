import { TouchableOpacity, StyleSheet, } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'

const Button = ({ onPress, showText, color, onLoading, setOnLoading, style }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: !onLoading ? colors.greenBackground : colors.grey,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 8,
      marginVertical:10
    }
  })

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}  >
      <CommonText showText={showText} fontSize={17} customstyles={{ color: colors.white }} />
    </TouchableOpacity>
  )
}




export default Button