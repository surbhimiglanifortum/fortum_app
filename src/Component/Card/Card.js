import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Charger from '../../assests/svg/charger'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'
import IconCard from './IconCard'
import IconCardLarge from './IconCardLarge'
const Card = ({tabName,navigationHandler,Svg}) => {
   

  return (
   
        <TouchableOpacity style={styles.card} onPress={navigationHandler}>
            <View style={styles.leftContainer}>
                <IconCardLarge Svg={Svg} />
                <View style={styles.middleContainer}>
                    <BlackText showText={'Annaporna'} />
                    <View style={styles.leftContainer}>
                    <BlackText showText={'12/08/2022 - '} /> 
                    <BlackText  showText={'12:15 pm'}/>
                    </View>
                </View>
            </View>
               {tabName!='ongoing'&& <View >
               <BlackText  showText={'₹1400'}/>
               <BlackText  showText={'120 kWh'}/>
                </View>}
        </TouchableOpacity>
  
  )
}

const styles =StyleSheet.create({
    container:{
        marginTop:10,
    },
    card:{
        paddingVertical:scale(15),
        paddingHorizontal:scale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:5,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.1,
        shadowRadius: 3.05,
        elevation: 4,
        marginVertical:8,
        backgroundColor:'#FFF'
        // marginHorizontal:5
    },
    leftContainer:{flexDirection:'row',alignItems:'center'},
icon:{paddingVertical:scale(15),paddingHorizontal:scale(18),backgroundColor:colors.greenBackground,borderRadius:5},
middleContainer:{marginLeft:scale(15)},


})

export default Card