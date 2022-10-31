import { useColorScheme, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import LinearGradient from 'react-native-linear-gradient';

export default function index({ children, style }) {

    const scheme = useColorScheme()
    return (
        <LinearGradient colors={scheme === 'dark' ? [colors.denseShadowDark, colors.denseShadowSecondary] : [colors.denseShadow, colors.white]} style={styles.linearGradient}>
            {children}
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
})