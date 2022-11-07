import { useColorScheme, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import colors from '../../../Utils/colors'
import { Neomorph, Shadow, NeomorphFlex } from 'react-native-neomorph-shadows'

export default function index({ children, style, ref }) {

    const scheme = useColorScheme()

    return (
        <NeomorphFlex
            // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
                shadowRadius: 3,
                borderRadius: 12,
                backgroundColor: colors.backgroundLight,
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