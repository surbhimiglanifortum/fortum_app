import { View, Text,useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

export default function index({ children, style }) {
    const scheme=useColorScheme()
    return (
        <View style={[{ flex: 1,backgroundColor:scheme=='dark'?colors.backgroundDark:colors.backgroundLight }, style]}>
            {children}
        </View>
    )
}