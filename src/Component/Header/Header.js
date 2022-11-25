import { View, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import BackButton from '../Button/BackButton'
import CommonText from '../Text/CommonText'
import { useNavigation } from '@react-navigation/native';

const Header = ({ onPress, showText, backButton = true, style }) => {
    const scheme = useColorScheme()
    const navigation = useNavigation();

    const onBackPress = () => {
        if (onPress) {
            onPress()
        } else {
            navigation.goBack()
        }
    }
    return (
        <View style={[styles.header]}>
            {backButton && <BackButton onPress={onBackPress} />}
            <CommonText showText={showText} fontSize={16} bold customstyles={[styles.headerText, { marginRight: backButton ? 50 : 0 }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        flex: 1
    },
})

export default Header