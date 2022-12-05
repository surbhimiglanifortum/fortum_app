import { useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

const PipDenseCard = ({ children, style, padding, customStyle, backgroundColor, paddingRight, paddingLeft, paddingTop, paddingBottom, marginVertical, margin }) => {

    const scheme = useColorScheme()

    return (
        <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
                shadowRadius: 3,
                borderRadius: 6,
                backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight,
                margin: margin || 5,
                marginVertical: marginVertical || 5,
                padding: padding || 5,
                paddingLeft: paddingLeft || padding || 5,
                paddingRight: paddingRight || padding || 5,
                paddingTop: paddingTop || padding || 5,
                paddingBottom: paddingBottom || padding || 5

            }}

        >
            {children}
        </NeomorphFlex>
    )
}

export default PipDenseCard