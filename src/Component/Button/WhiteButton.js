import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

const WhiteButton = ({ onPress, showText, color, style, onLoading }) => {
  const scheme = useColorScheme()


  return (
    <NeomorphFlex
      swapShadows
      style={{
        shadowRadius: 6,
        borderRadius: 12,
        backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight,
        marginVertical: 10,
        padding: 18,
      }}
    >
      <TouchableOpacity onPress={onPress} style={[styles.container]} disabled={onLoading}>
        {onLoading ? <ActivityIndicator></ActivityIndicator> :
          <CommonText showText={showText} fontSize={17}/>}
      </TouchableOpacity>


    </NeomorphFlex>
  )
}


const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
  },
  backgroundColorStyle: {

  }

})




export default WhiteButton