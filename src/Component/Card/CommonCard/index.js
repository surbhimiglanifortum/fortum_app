import { View, useColorScheme, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import colors from '../../../Utils/colors'

export default function index({ children, style }) {

    const scheme = useColorScheme()

    return (
        <Card style={[{ backgroundColor: scheme === 'dark' ? colors.backgroundDark : colors.backgroundLight }, styles.container, style]}>
            {children}
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal:10,
        borderRadius:10,
        elevation:0,
        marginVertical:7
    }
})