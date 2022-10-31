import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import CommonText from '../Text/CommonText'
import colors from '../../Utils/colors'
import Charger1 from '../../assests/svg/charger1'

const HorizontalCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
      <Charger1  />
      <CommonText showText={'Charger 1 - ccs 2'} />
      </View>
      <View style={styles.greenContainer}>
        <CommonText showText={'0/2'} />
      </View>

    </View>
  )
}

const styles=StyleSheet.create({
container:{
    borderWidth:1,
    borderRadius:5,
    borderColor:'#EFEFEF',
    marginTop:5,
    width:scale(230),
    paddingVertical:6,
    paddingHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    elevation:5,
    backgroundColor:colors.white
},
inner:{flexDirection:'row',alignItems:'center'},
greenContainer:{
backgroundColor:colors.greenBackground,
paddingVertical:5,
paddingHorizontal:5,
alignItems:'center',
borderRadius:5
},
})
export default HorizontalCard