import { View,StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import BackButton from '../Button/BackButton'
import CommonText from '../Text/CommonText'
import BlackText from '../Text/BlackText'
import { useNavigation } from '@react-navigation/native'

const Header = ({showText}) => {
     const scheme=useColorScheme()
    return (
        <View style={styles.header}>
            <BackButton />
            <View style={styles.headerText}>
               <CommonText showText={showText} fontSize={22} /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems:'center'
    },
    headerText: { alignItems: 'center', marginLeft: 60 },
})

export default Header