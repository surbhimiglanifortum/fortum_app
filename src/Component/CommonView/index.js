import { SafeAreaView, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

export default function index({ children, style, isFlex = true }) {
    const scheme = useColorScheme()
    return (
        <SafeAreaView style={[isFlex ? { flex: 1 } : {}, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight, padding: 10}, style]}>
            {children}
        </SafeAreaView>
    )
}