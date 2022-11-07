import { useColorScheme, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import colors from '../../../Utils/colors'
import { Neomorph, Shadow, NeomorphFlex } from 'react-native-neomorph-shadows'

export default function index({ children, style, ref, active }) {

    const scheme = useColorScheme()

    return (
        <NeomorphFlex
            inner={active ? true : false} // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            // darkShadowColor='#000' // <- set this
            // lightShadowColor="#fff" // <- this
            style={{
                shadowRadius: 3,
                borderRadius: 12,
                backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight,
                margin: 10,
                marginVertical: 10,
                padding: 10,
            }}
        >
            {children}
        </NeomorphFlex>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})