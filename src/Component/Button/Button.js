import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'

const Button = ({onPress,showText,color}) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <CommonText showText={showText} fontSize={17} color={color} />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
    container:{
        backgroundColor:colors.greenBackground,
        paddingVertical:15,
        alignItems:'center',
        borderRadius:8
    }
})


export default Button