import { View, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const IconCard = ({ Svg ,backgroundColor}) => {
  return (
    <View style={[styles.icon,{backgroundColor:colors.lightgreen}]}>
      <Svg />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: { paddingVertical: 8, paddingHorizontal: 8, borderRadius: 6, },

})

export default IconCard