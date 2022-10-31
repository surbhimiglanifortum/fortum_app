import { View, StyleSheet,  } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'

const TimeTextinput = ({showText}) => {
    return ( 
        <View style={[styles.Innerconatiner,]}>
            <CommonText showText={showText}/>
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