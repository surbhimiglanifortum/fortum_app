import { View, StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'
import { NeomorphFlex } from 'react-native-neomorph-shadows'


const Textinput = ({ placeholder, value, onChange, placeholderText, keyboardType, editable }) => {

    const scheme = useColorScheme()

    return (

        <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
                shadowRadius: 3,
                borderRadius: 12,
                backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight,
                // margin: 10,
                marginVertical: 10,
                padding: 5,
            }}
        >
            <TextInput editable={editable} keyboardType={keyboardType || 'default'} onChangeText={onChange} value={value} placeholder={placeholder} style={{ color: scheme == 'dark' ? 'white' : 'black', fontFamily: commonFonts.regular }} />
        </NeomorphFlex>
    )
}

const styles = StyleSheet.create({

})

export default Textinput