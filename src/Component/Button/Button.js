import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onPress, showText, color, onLoading, setOnLoading, style, disable, bg }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: !onLoading ? bg ? bg : colors.greenBackground : colors.grey,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 8,
      marginVertical: 10
    },
    backgroundColorStyle: {

    }

  })

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]} disabled={onLoading}>
      {onLoading ? <ActivityIndicator></ActivityIndicator> :
        <CommonText showText={showText} fontSize={17} customstyles={{ color: colors.white }} />}
    </TouchableOpacity>
  )
}




export default Button