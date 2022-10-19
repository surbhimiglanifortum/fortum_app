import { View, StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const Textinput = ({placeholder}) => {

    const scheme = useColorScheme()

    return (
        <View style={[styles.conatiner]}>
        <View style={[styles.Innerconatiner,{backgroundColor:scheme=='dark'?colors.backgroundDark:colors.backgroundLight}]}>
            <TextInput placeholder={placeholder} style={{color:scheme=='dark'?'white':'black'}} />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner:{
// marginTop:10
    },
    Innerconatiner: {
        borderWidth: 2,
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderColor:'#EFEFEF',
        elevation:5,
        marginTop:10

    }
})

export default Textinput