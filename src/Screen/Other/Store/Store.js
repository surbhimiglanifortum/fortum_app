import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { scale } from 'react-native-size-matters'
import CommonText from '../../../Component/Text/CommonText'

const Store = () => {
    const navigation = useNavigation()
    const scheme = useColorScheme()


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <View style={styles.header}>
                    <Header showText={'Store'} />
                    <TouchableOpacity style={styles.cartCon}>
                        <AntDesign name='shoppingcart' color={colors.black} size={25} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.card}>
                        <Image source={require('../../../assests/chargingKey.png')} style={styles.img} />
                        <CommonText showText={'Name'} fontSize={20} />
                        <CommonText showText={'Random description dummy text'} fontSize={14} />
                        <CommonText showText={`₹${'1400'}`} fontSize={14} />
                    </View>
                </ScrollView>


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cartCon: {
        backgroundColor: colors.white,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 6,
        elevation: 5
    },
    card: {
        backgroundColor: colors.white,
        marginTop: 25,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6
    },
img:{
alignSelf:'center',
height:scale(120),
width:scale(120),
marginVertical:10
},

})


export default Store