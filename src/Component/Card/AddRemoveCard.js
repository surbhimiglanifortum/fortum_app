import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import commonFonts from '../../Utils/fonts/fonts'
const AddRemoveCard = () => {
  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.minusIcon}>
            <AntDesign name='minus' size={20} color={colors.white} />
        </TouchableOpacity>
      <Text style={styles.text}>10</Text>
        <TouchableOpacity style={styles.plusIcon}>
            <AntDesign name='plus' size={20} />
        </TouchableOpacity>
     
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        marginTop:10,
        borderWidth:1,
        alignSelf:'center',
        paddingVertical:10,
        width:150,
        borderColor:colors.borderColor,
        elevation:10,
        backgroundColor:colors.lightBackGround,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10
    },
    plusIcon:{
        backgroundColor:colors.white,
        elevation:40,
        borderWidth:1,
        borderColor:colors.borderColor,
        paddingVertical:7,
        paddingHorizontal:7,
        borderRadius:10

    },
    minusIcon:{
        backgroundColor:colors.green,
        elevation:40,
        borderWidth:1,
        borderColor:colors.borderColor,
        paddingVertical:7,
        paddingHorizontal:7,
        borderRadius:10,
        // marginHorizontal:10
    },
    text:{
        color:colors.black,
        fontFamily:commonFonts.bold,
        fontSize:18
    }
})

export default AddRemoveCard