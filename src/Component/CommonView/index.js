import { SafeAreaView, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

export default function index({ children, style }) {
    const scheme = useColorScheme()
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight, paddingLeft: '5%', paddingRight: '5%' }, style]}>
            {children}
        </SafeAreaView>
    )
}