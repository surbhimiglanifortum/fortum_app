import { useColorScheme, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import LinearGradient from 'react-native-linear-gradient';
import { NeomorphFlex } from 'react-native-neomorph-shadows'

export default function index({ children, style, padding, customStyle, backgroundColor, paddingRight, paddingLeft, paddingTop, paddingBottom, marginVertical, margin }) {

    const scheme = useColorScheme()
    return (
        <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
                shadowRadius: 3,
                borderRadius: 12,
                backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight,
                margin: margin || 10,
                marginVertical: marginVertical || 10,
                padding: padding || 15,
                paddingLeft: paddingLeft || padding || 15,
                paddingRight: paddingRight || padding || 15,
                paddingTop: paddingTop || padding || 15,
                paddingBottom: paddingBottom || padding || 15

            }}

        >
            {children}
        </NeomorphFlex>
    )
}

const styles = StyleSheet.create({

})