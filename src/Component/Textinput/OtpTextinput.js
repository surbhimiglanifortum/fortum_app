import { View, StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const OtpTextinput = ({ placeholder, onChangeText, value, onChange, onSubmitEditingData, refData }) => {

    const scheme = useColorScheme()

    return (

        <View style={[styles.Innerconatiner, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <TextInput 
                onChange={onChange}
                maxLength={1}
                value={value}
                keyboardType='numeric'
                placeholder={placeholder}
                ref={refData}
                style={{ color: scheme == 'dark' ? 'white' : 'black',textAlign:'center' }} />
        </View>

    )
}

const styles = StyleSheet.create({

    Innerconatiner: {
        borderWidth: 2,
        paddingVertical: 2,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: '#EFEFEF',
        elevation: 5,
        marginTop: 10,
        width: 55,
        justifyContent:'center'

    }
})

export default OtpTextinput