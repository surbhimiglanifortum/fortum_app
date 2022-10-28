import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import WhiteText from '../Text/WhiteText'

const Button = ({ onPress, showText, color, onLoading, setOnLoading }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: !onLoading?colors.greenBackground:colors.grey,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 8
    }
  })


  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <WhiteText showText={showText} fontSize={17} color={color} />
    </TouchableOpacity>
  )
}




export default Button