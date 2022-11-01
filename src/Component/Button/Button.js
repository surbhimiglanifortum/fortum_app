import { TouchableOpacity, StyleSheet, } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ onPress, showText, color, onLoading, setOnLoading, style }) => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: !onLoading ? colors.greenBackground : colors.grey,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 8,
      marginVertical:10
    }
  })

  return (
    <LinearGradient colors={['#7cd699', '#67d396', '#5ac37d', '#42b468', '#3eb165']} style={styles.linerStyle}   >
      <TouchableOpacity onPress={onPress} style={[styles.container, style]} >
        <CommonText showText={showText} fontSize={17} customstyles={{ color: colors.white }} />
      </TouchableOpacity>
    </LinearGradient>

  )
}




export default Button