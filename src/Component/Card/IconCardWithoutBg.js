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
    

})

export default IconCardWithoutBg