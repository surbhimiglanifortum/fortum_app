import { View, Text,useColorScheme,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { Shadow } from 'react-native-neomorph-shadows';

export default function index({ children, style }) {
    const scheme=useColorScheme()
    return (
        // <View style={[styles.card,{ backgroundColor:scheme=='dark'?colors.backgroundDark:colors.backgroundLight }]}>
        <Shadow
  inner // <- enable inner shadow
  useArt // <- set this prop to use non-native shadow on ios
  style={{
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1,
    shadowColor: "grey",
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    width: 100,
    height: 150,
    // ...include most of View/Layout styles
  }}
  >
 {children}
 </Shadow>
        // </View>
    )
}

const styles = StyleSheet.create({
    card: {
        // borderRadius: 8,
        paddingVertical: 0,
        paddingHorizontal: 0,
        // marginVertical: 50,
        margin:20,
        shadowProp: {
            shadowColor: '#00000',
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 1,
            shadowRadius: 3,
          },
      }  
})