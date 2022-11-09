import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

const Button = ({ onPress, showText, color, onLoading, setOnLoading, style, disable, bg }) => {

  const styles = StyleSheet.create({
    container: {

      alignItems: 'center',
    },
    backgroundColorStyle: {

    }

  })

  return (

    <NeomorphFlex
      inner // <- enable shadow inside of neomorph
      swapShadows // <- change zIndex of each shadow color
      darkShadowColor='#7DD79B' // <- set this
      lightShadowColor="#16ab48" // <- this
      style={{
        shadowRadius: 6,
        borderRadius: 12,
        backgroundColor: colors.greenBackground,
        // margin: 10,
        marginVertical: 10,
        padding: 18,
        ...style
      }}
    >

      <TouchableOpacity onPress={onPress} style={[styles.container]} disabled={onLoading}>
        {onLoading ? <ActivityIndicator></ActivityIndicator> :
          <CommonText showText={showText} fontSize={17} customstyles={{ color: colors.white }} />}
      </TouchableOpacity>
    </NeomorphFlex>
  )
}




export default Button