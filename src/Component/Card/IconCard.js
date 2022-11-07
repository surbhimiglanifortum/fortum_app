import { View, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const IconCard = ({ Svg, backgroundColor }) => {
  return (
    <View style={[styles.icon, { backgroundColor: backgroundColor }]}>
      <Svg />
    </View>
  )
}

const styles = StyleSheet.create({


})

export default IconCard