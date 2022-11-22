import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import CommonText from '../Text/CommonText';

const SkipButton = ({ onPress }) => {

  const scheme = useColorScheme();


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CommonText showText={'Skip'} regular fontSize={14} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    alignSelf: 'flex-end',
    marginVertical: 15
  }
})

export default SkipButton