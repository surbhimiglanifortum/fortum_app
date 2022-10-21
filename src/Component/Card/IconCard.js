import { View,  StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const IconCard = ({Svg}) => {
  return (
    <View style={styles.icon}>
    <Svg />
</View>
  )
}

const styles =StyleSheet.create({
    icon:{paddingVertical:5,paddingHorizontal:8,backgroundColor:colors.greenBackground,borderRadius:5},

})
 
export default IconCard