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
    icon: { paddingVertical: 10, paddingHorizontal: 10, backgroundColor: '#c4e1d9', borderRadius: 5 },

})


export default IconCardLarge