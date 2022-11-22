import { View, StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import { NeomorphFlex } from 'react-native-neomorph-shadows'
import commonFonts from '../../Utils/fonts/fonts'

const OtpTextinput = ({ placeholder, value, onChange, refData, onKeyPress }) => {

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
                width: 63,
                height: 63,
                marginVertical: 10,
                padding: 5,
            }}
        >


            <TextInput
                onChangeText={onChange}
                maxLength={1}
                value={value}
                keyboardType='numeric'
                placeholder={placeholder}
                ref={refData}
                onKeyPress={onKeyPress}
                style={{ color: scheme == 'dark' ? 'white' : 'black', textAlign: 'center', fontFamily: commonFonts.bold }}
            />

        </NeomorphFlex>
    )
}

const styles = StyleSheet.create({

    Innerconatiner: {
        overflow: 'hidden',
        width: 55,
        justifyContent: 'center'

    }
})

export default OtpTextinput