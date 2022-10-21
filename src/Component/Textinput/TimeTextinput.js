import { View, StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'

const TimeTextinput = ({showText}) => {
    return ( 
        <View style={[styles.Innerconatiner,]}>
            <BlackText showText={showText}/>
        </View>
    )
}

const styles = StyleSheet.create({
   
    Innerconatiner: {
        borderWidth: 2,
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor:'#EFEFEF',
        elevation:5,
        marginTop:10,
        width:55,
        alignItems:'center'

    },
   
})

export default TimeTextinput