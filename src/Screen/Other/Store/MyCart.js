import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import DenseCard from '../../../Component/Card/DenseCard/index'
import CommonText from '../../../Component/Text/CommonText'
import commonFonts from '../../../Utils/fonts/fonts'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import StoreSvg from '../../../assests/svg/StoreSvg'
import AddRemoveCard from '../../../Component/Card/AddRemoveCard'
import { useState } from 'react'
import Button from '../../../Component/Button/Button'
const MyCart = () => {
    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [addCartItem, setAddCartItem] = useState(0)

    const addCartHandler = () => {

    }
    const removeCartHandler = () => {

    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <Header showText={'MY Cart'} />

                <View style={styles.topCard}>
                    <DenseCard>
                        <View style={styles.denceInnnerCard}>
                            <View style={styles.cartInner}>
                                <IconCardLarge Svg={StoreSvg} />
                                <View style={styles.cartDetailsText}>
                                    <CommonText showText={'Name'} />
                                    <CommonText showText={`₹ ${'1400'}`} />
                                </View>
                            </View>
                            <View>
                                <AddRemoveCard />
                            </View>
                        </View>
                    </DenseCard>
                </View>
                <View style={styles.topCard}>
                    <CommonText showText={'Order Summary'} />
                    <DenseCard>
                        <View style={styles.innerCard}>
                            <CommonText showText={'Price'} />
                            <CommonText showText={`₹ ${'1400'}`} />
                        </View>
                        <View style={styles.innerCard}>
                            <CommonText showText={'Price'} />
                            <CommonText showText={`₹ ${'1200'}`} />
                        </View>
                        <View style={styles.innerCard}>
                            <CommonText showText={'Amount of CGST (9%)'} />
                            <CommonText showText={`₹ ${'100'}`} />
                        </View>
                        <View style={styles.innerCard}>
                            <CommonText showText={'Amount of SGST (9%)'} />
                            <CommonText showText={`₹ ${'100'}`} />
                        </View>
                        <View style={styles.innerCard}>
                            <CommonText showText={'Total '} customstyles={{ marginTop: 20 }} />
                            <CommonText showText={`₹ ${'1400'}`} customstyles={{ marginTop: 20, fontFamily: commonFonts.bold }} />
                        </View>

                    </DenseCard>
                </View>
            </View>
            <View style={styles.bottomBtn}>
                <Button showText={'Proceed to Pay'} />
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
    topCard: {
        marginTop: 25
    },
    innerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginVertical: 7,
    },
    cartInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartDetailsText: {
        marginLeft: 10
    },
    denceInnnerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomBtn: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'flex-start',
        width: '90%',
        alignSelf: 'center'
    }
})


export default MyCart