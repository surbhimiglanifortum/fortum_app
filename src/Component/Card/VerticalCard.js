import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import CommonText from '../Text/CommonText'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'
import Charger1 from '../../assests/svg/charger1'

const VerticalCard = () => {
  return (
    <View style={styles.container}>
      <Charger1  />
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
    width:scale(50),
    paddingVertical:6,
    paddingHorizontal:10,
    elevation:5,
    backgroundColor:colors.white,
    alignItems:'center'
},
greenContainer:{
backgroundColor:colors.greenBackground,
paddingVertical:5,
width:38,
alignItems:'center',
borderRadius:5,
marginTop:10
},
})

export default VerticalCard