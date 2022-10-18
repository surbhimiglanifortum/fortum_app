import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import ChargingCard from '../../../Component/Charging/ChargingCard'
const TaxInvoice = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}
                        style={styles.iconContainer}>
                        <AntDesign name='left' size={20} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: scale(80) }}>
                        <Text style={styles.headerText}>Tax Invoice</Text>
                    </View>
                </View>
                {<ChargingCard tabName={'completed'} />}

                <View></View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF4FC'
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: scale(10)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between'  
    },
    headerText: {
        fontSize: scale(17),
    },
    iconContainer: {
        borderWidth: 1,
        paddingVertical: scale(3),
        paddingHorizontal: scale(15),
        borderRadius: 2,
        overflow: 'hidden',
        borderColor: '#EFEFEF',
        elevation: 2
    },
})

export default TaxInvoice