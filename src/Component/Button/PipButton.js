import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import { NeomorphFlex } from 'react-native-neomorph-shadows'

const PipButton = ({ onPress, showText, onLoading, style }) => {

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        }
    })

    return (
        <TouchableOpacity onPress={onPress} disabled={onLoading} >
            <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                darkShadowColor='#7DD79B' // <- set this
                lightShadowColor="#16ab48" // <- this
                style={{
                    shadowRadius: 6,
                    borderRadius: 6,
                    backgroundColor: colors.greenBackground,
                    marginVertical: 10,
                    padding: 5,
                    ...style
                }}
            >

                <View style={[styles.container]} >
                    {onLoading ? <ActivityIndicator color={colors.white} /> :
                        <CommonText showText={showText} fontSize={12} customstyles={{ color: colors.white }} />}
                </View>
            </NeomorphFlex>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})

export default PipButton