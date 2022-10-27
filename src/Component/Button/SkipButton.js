import {  StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import BlackText from '../Text/BlackText'
import CommonText from '../Text/CommonText';

const SkipButton = ({onPress}) => {

  const scheme = useColorScheme();


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
     {scheme=='dark'?  <CommonText showText={'Skip'} /> : <BlackText showText={'Skip'} />}
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    container:{
paddingHorizontal:25,
alignSelf:'flex-end',
marginVertical:15
    }
})

export default SkipButton