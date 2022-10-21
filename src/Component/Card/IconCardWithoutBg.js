import { View,  StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const IconCardWithoutBg = ({Svg,backgroundColor}) => {
  return (
    <View style={[styles.icon,{backgroundColor:backgroundColor}]}>
    <Svg />
</View>
  )
}

const styles =StyleSheet.create({
    icon:{paddingVertical:5,paddingHorizontal:8,backgroundColor:colors.greenBackground,borderRadius:5},

})

export default IconCardWithoutBg