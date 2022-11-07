import { View, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import BackButton from '../Button/BackButton'
import CommonText from '../Text/CommonText'

const Header = ({ showText, backButton = true, style }) => {
    const scheme = useColorScheme()
    return (
        <View style={[styles.header]}>
            {backButton && <BackButton />}
            <CommonText showText={showText} fontSize={22} customstyles={[styles.headerText, {
                marginLeft: backButton ?
                    -25 : 0
            }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    headerText: {
        textAlign: 'center',
        flex: 1,
    },
})

export default Header