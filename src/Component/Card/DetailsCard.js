import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import BlackText from '../Text/BlackText'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { scale } from 'react-native-size-matters'
import HorizontalCard from './HorizontalCard'
import VerticalCard from './VerticalCard'

const DetailsCard = () => {
    return (
        <Card style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <BlackText showText={'Restaurant'} />
                    <BlackText showText={'Annapoorna'} />
                    <Text style={styles.greenText}>Availabe     < BlackText showText={'24/7'}/> </Text>
                </View>
                <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.heartIcon}>
                <AntDesign name='heart' size={25} color={'red'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.leftIcon}>
                <Feather name='corner-up-right' size={25} color={colors.white} />
              </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.innerContainer,{marginTop:15}]}>
             <View style={styles.longText}>   
             <BlackText showText={'Sample Address lorem ipsum dummy text placeholder'} />
             </View>
                    <BlackText showText={'1.1 km'} />
            </View>
            {<HorizontalCard />}
            {<VerticalCard />}
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 15,
        borderRadius:10
    },
    innerContainer:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
        
    },
    greenText:{
        color:colors.green,
        marginLeft:7,
        fontFamily:commonFonts.semibold,
        fontSize:15
    },
    heartIcon:{
        elevation:10,
        // borderWidth:1,
        backgroundColor:colors.white,paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:10
    },
    leftIcon:{
        elevation:10,
        // borderWidth:1,
        backgroundColor:'#3070ce',paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:10,
        marginLeft:10
    },
    leftContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    longText:{
        width:scale(230),
        // borderWidth:1
    }
})

export default DetailsCard