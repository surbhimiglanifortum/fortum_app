import { View,  StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import Entypo from 'react-native-vector-icons/Entypo'
import CommonText from '../Text/CommonText'
const LocationCard = ({title,subTitle,iconName,fontSize}) => {

  return (
    <View style={styles.container}>
        <View style={styles.card} >
            <View style={styles.leftContainer}>
                <View style={styles.icon}>
                    <Entypo name={iconName} size={30} color={colors.white} />
                </View>
                <View style={styles.middleContainer}>
                    <CommonText showText={title} fontSize={fontSize}/>
                    <CommonText showText={subTitle} />
                </View>
            </View>
              
        </View>
    </View>
  )
}

const styles =StyleSheet.create({
   
    card:{
        paddingVertical:scale(10),
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
        // elevation: 4,
        marginVertical:5,
        backgroundColor:'#FFF'
        // marginHorizontal:5
    },
    leftContainer:{flexDirection:'row',alignItems:'center'},
icon:{paddingVertical:scale(10),paddingHorizontal:scale(10),backgroundColor:colors.greenBackground,borderRadius:5},
middleContainer:{marginLeft:scale(15)},


})


export default LocationCard