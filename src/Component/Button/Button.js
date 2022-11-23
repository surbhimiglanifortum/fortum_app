import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

const Button = ({ onPress, showText, color, onLoading, setOnLoading, style, disable, bg, isFlex = true }) => {

  const styles = StyleSheet.create({
    container: {

      alignItems: 'center',
    },
    backgroundColorStyle: {

    }

  })

  return (
    <TouchableOpacity onPress={onPress} disabled={onLoading} >

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

        <View style={[styles.container]} >
          {onLoading ? <ActivityIndicator></ActivityIndicator> :
            <CommonText showText={showText} fontSize={17} customstyles={{ color: colors.white }} />}
        </View>
      </NeomorphFlex>
    </TouchableOpacity>
  )
}




export default Button