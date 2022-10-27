import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import BlackText from '../Text/BlackText'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { scale } from 'react-native-size-matters'
import HorizontalCard from './HorizontalCard'
import VerticalCard from './VerticalCard'
import GreenText from '../Text/GreenText'

const DetailsCard = ({ chargerType, onPress, item }) => {
   
    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={styles.container}>
                <View style={styles.innerContainer}>
                    <View>
                        <BlackText showText={item?.name} fontSize={16} />
                        <BlackText showText={'Annapoorna'} />
                        <Text><GreenText showText={'Available   '} />
                            < BlackText showText={'24/7'} /> </Text>
                    </View>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity style={styles.heartIcon}>
                            <AntDesign name='heart' size={25} color={'red'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.leftIcon}>
                            <Feather name='corner-up-right' size={25} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.innerContainer1,]}>
                    <View style={styles.longText}>
                        <BlackText showText={item?.address?.city} />
                        <BlackText showText={item?.address?.street} margin={5} />
                        <BlackText showText={item?.address?.postalCode} margin={5} />
                    </View>
                    <BlackText showText={'1.1 km'} />
                </View>
                {chargerType == 1 && <HorizontalCard />}
                {chargerType == 2 && <VerticalCard />}
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: colors.white,
        // marginHorizontal:8
    },
    innerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        

    },
    innerContainer1: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginVertical:15,
        borderTopWidth:1,
        borderBottomWidth:1,
        paddingVertical:12,
        borderColor:colors.borderColor

    },
    greenText: {
        color: colors.green,
        marginLeft: 7,
        fontFamily: commonFonts.semibold,
        fontSize: 15
    },
    heartIcon: {
        elevation: 10,
        // borderWidth:1,
        backgroundColor: colors.white, paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10
    },
    leftIcon: {
        elevation: 10,
        // borderWidth:1,
        backgroundColor: '#3070ce', paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginLeft: 10
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    longText: {
        width: scale(230),
        // borderWidth:1
        flexDirection: 'row',
        alignItems: 'center'
    },

})

export default DetailsCard