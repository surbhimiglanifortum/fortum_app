import { useColorScheme, StyleSheet } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import colors from '../../../Utils/colors'

export default function index({ children, style ,ref}) {

    const scheme = useColorScheme()

    return (
        <Card  ref={ref} style={[{ backgroundColor: scheme === 'dark' ? colors.backgroundDark : colors.backgroundLight }, styles.container, style]}>
            {children}
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:10,
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:10
    }
})