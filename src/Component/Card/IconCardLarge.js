import { View, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'

const IconCardLarge = ({ Svg, }) => {
    return (
        <View style={[styles.icon]}>
            <Svg />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: { paddingVertical: 10, paddingHorizontal: 10, backgroundColor: colors.green, borderRadius: 5 },

})


export default IconCardLarge