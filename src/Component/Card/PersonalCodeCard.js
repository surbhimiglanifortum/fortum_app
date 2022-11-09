import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'

const PersonalCodeCard = ({ showText }) => {

    return (
        <CommonCard>
            <View style={styles.card}>
                <View style={styles.container}>
                    <CommonText showText={showText} />
                    <TouchableOpacity style={styles.copyBtn}>
                        <CommonText showText={'Copy'} customstyles={{ color: 'white' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </CommonCard>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    copyBtn: {
        backgroundColor: colors.greenBackground,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6
    }

})


export default PersonalCodeCard