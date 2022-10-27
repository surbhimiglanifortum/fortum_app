import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import BlackText from '../Text/BlackText'
import CommonText from '../Text/CommonText'

const PersonalCodeCard = ({ showText }) => {

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <BlackText showText={showText} />
                <TouchableOpacity style={styles.copyBtn}>
                    <CommonText showText={'Copy'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.05,
        elevation: 4,
        marginVertical: 5,
        backgroundColor: '#FFF'

    },
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