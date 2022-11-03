import { View, StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const Textinput = ({placeholder,value,onChange,placeholderText,keyboardType}) => {

    const scheme = useColorScheme()

    return (
        <View style={[styles.Innerconatiner,{backgroundColor:scheme=='dark'?colors.backgroundDark:colors.backgroundLight}]}>
            <TextInput keyboardType={keyboardType || 'default' } onChangeText={onChange} value={value} placeholder={placeholderText} style={{color:scheme=='dark'?'white':'black'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    Innerconatiner: {
        borderWidth: 2,
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderColor:'#EFEFEF',
        elevation:5,
        marginTop:8

    }
})

export default Textinput