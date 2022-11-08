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
                backgroundColor: colors.greenBackground,
                margin: 0,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 10,
                paddingBottom: 10

            }}

        >
            {children}
        </NeomorphFlex>
    )
}

const styles = StyleSheet.create({

})