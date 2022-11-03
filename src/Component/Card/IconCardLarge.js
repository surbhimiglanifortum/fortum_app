import { View, StyleSheet } from 'react-native'
import React from 'react'

const IconCardLarge = ({ Svg, }) => {
    return (
        <View style={[styles.icon]}>
            <Svg />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: { borderRadius: 5 },
})


export default IconCardLarge