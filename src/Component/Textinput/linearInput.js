import { TextInput, useColorScheme } from 'react-native'
import React from 'react'

const LinearInput = ({ value, onChange, placeholderText, secureTextEntry, maxLength, keyboardType, style }) => {

    const scheme = useColorScheme()

    return (
        <TextInput
            onChangeText={onChange}
            value={value}
            placeholder={placeholderText}
            style={[{ color: scheme == 'dark' ? 'white' : 'black' }, style]}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            keyboardType={keyboardType}
        />
    )
}


export default LinearInput