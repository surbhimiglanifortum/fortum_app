import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { NeomorphFlex } from 'react-native-neomorph-shadows'
import colors from '../../../Utils/colors'

const CommonIconCard = ({ Svg }) => {
    const scheme = useColorScheme()
    return (
        <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
                shadowRadius: 3,
                borderRadius: 12,
                backgroundColor: scheme == 'dark' ? colors.darkIcon : colors.lightIcon,
                padding: 15,
            }}>
            <Svg fill={scheme == 'dark' ? colors.white : colors.green} />
        </NeomorphFlex>
    )
}

export default CommonIconCard