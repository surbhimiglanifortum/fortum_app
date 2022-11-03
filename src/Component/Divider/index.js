import { View, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const Divider = () => {
    return (
        <View style={styles.divider} />
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: colors.divider
    }
})


export default Divider