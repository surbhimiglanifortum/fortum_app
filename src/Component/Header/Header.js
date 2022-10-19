import { View,StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import BackButton from '../Button/BackButton'
import CommonText from '../Text/CommonText'
import BlackText from '../Text/BlackText'

const Header = ({showText}) => {
     const scheme=useColorScheme()
    return (
        <View style={styles.header}>
            <BackButton />
            <View style={styles.headerText}>
                {scheme == 'dark' ? <CommonText showText={showText} fontSize={22} /> : <BlackText showText={showText} fontSize={22} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
    },
    headerText: { alignItems: 'center', marginLeft: 70 },
})

export default Header