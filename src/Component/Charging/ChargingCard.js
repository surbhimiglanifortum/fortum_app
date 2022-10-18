import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

const ChargingCard = ({tabName,navigationHandler}) => {
   

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={navigationHandler}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{paddingVertical:scale(15),paddingHorizontal:scale(18),backgroundColor:'#C4E1D9',borderRadius:5}}>
                    <Text>gg</Text>
                </View>
                <View style={{marginLeft:scale(15)}}>
                    <Text>Annapoorna</Text>
                    <Text>12/08/2022 - <Text>12:15 pm</Text></Text>
                </View>
            </View>
               {tabName!='ongoing'&& <View >
                    <Text>₹1400</Text>
                    <Text>120 kWh </Text>
                </View>}
        </TouchableOpacity>
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        marginTop:25,
    },
    card:{
        // borderWidth:1,
        paddingVertical:scale(10),
        paddingHorizontal:scale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:5,
        // borderColor:'#727272',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.1,
        shadowRadius: 3.05,
        elevation: 4,
        marginVertical:5,
        // backgroundColor:'#FFF'
        // marginHorizontal:5
    }
})

export default ChargingCard