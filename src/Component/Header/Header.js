import { View,StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import BackButton from '../Button/BackButton'
import CommonText from '../Text/CommonText'

const Header = ({showText,customstyles}) => {
     const scheme=useColorScheme()
    return (
        <View style={styles.header}>
            <BackButton />
            <View style={styles.headerText}>
               <CommonText showText={showText} fontSize={22} customstyles={customstyles} /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems:'center',
    },
    headerText: { alignItems: 'center', marginLeft: 60 },
})

export default Header