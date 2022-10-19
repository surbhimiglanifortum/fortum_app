import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'

const WhiteButton = ({onPress,showText,color}) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <BlackText showText={showText} fontSize={17} color={color} />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        paddingVertical:15,
        alignItems:'center',
        borderRadius:8
    }
})



export default WhiteButton