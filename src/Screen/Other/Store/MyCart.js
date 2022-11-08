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
import { useDispatch, useSelector } from 'react-redux'
import routes from '../../../Utils/routes'
import { useEffect } from 'react'
import CommonView from '../../../Component/CommonView/index'
import LightBgColor from '../../../assests/svg/LightBgColor'
import StoreGreenSvg from '../../../assests/svg/StoreGreenSvg'

const MyCart = ({ route }) => {

    const scheme = useColorScheme()
    const dispatch = useDispatch()

    const navigation = useNavigation()
    const [cartCount, setCartCount] = useState(0);
    const cartData = useSelector((state) => state.AddToCartReducers.cartItem)
    const cartDataDetails = useSelector((state) => state.AddToCartReducers)
    let cartlength = cartData?.length

    const addQty = async (item) => {
        dispatch({
            type: 'ADD_CART_ITEM',
            payload: { id: item.id, cartItem: item.cartItem }
        })

    }

    const removeQty = (item) => {
        dispatch({
            type: 'SUB_CART_ITEM',
            payload: { id: item.id, cartItem: item.cartItem }

        })

    }

    const getTotalCartValue = () => {
        let cost = 0
        cartDataDetails?.cartItem.forEach((item, index) => {
            cost += item.price * item.cartItem
        })
        return cost
    }

    useEffect(() => {
        setCartCount(cartlength)
    }, [cartlength])


    return (
        <CommonView>
            <ScrollView >
                <View style={styles.innerContainer}>
                    <Header showText={'MY Cart'} />
                    <View style={styles.topCard}>
                        {cartDataDetails?.cartItem.map((item, ind) => {
                            return (
                                <DenseCard key={ind} padding={5}>
                                    <View style={styles.denceInnnerCard}>
                                        <View style={[styles.cartInner, { width: '50%' }]}>
                                            <View style={{ width: '48%' }}>
                                                <DenseCard padding={0} >
                                                    <IconCardLarge Svg={scheme == 'dark' ? StoreGreenSvg : StoreSvg} />
                                                </DenseCard>
                                            </View>
                                            <View style={[styles.cartDetailsText, { width: '50%' }]}>
                                                <CommonText showText={item?.name} />
                                                <CommonText showText={`₹ ${item?.price * item?.cartItem
                                                    }`} regular customstyles={{}} />
                                            </View>
                                        </View>
                                        <View style={{ width: '45%' }}>
                                            <AddRemoveCard removeQty={() => removeQty(item)} addQty={() => { addQty(item) }} cartCount={item?.cartItem} disabled={cartCount == 0} showText={cartlength} />
                                        </View>
                                    </View>
                                </DenseCard>
                            )
                        })}
                    </View>
                    <View style={styles.topCard}>
                        <CommonText showText={'Order Summary'} customstyles={{ marginLeft: 10 }} />
                        <DenseCard>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Price'} regular />
                                <CommonText showText={`₹ ${getTotalCartValue()}`} />
                            </View>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Cost'} regular />
                                <CommonText showText={`₹ ${'1200'}`} />
                            </View>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Amount of CGST (9%)'} regular />
                                <CommonText showText={`₹ ${'100'}`} />
                            </View>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Amount of SGST (9%)'} regular />
                                <CommonText showText={`₹ ${'100'}`} />
                            </View>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Total '} customstyles={{ marginTop: 20 }} />
                                <CommonText showText={`₹ ${'1400'}`} customstyles={{ marginTop: 20, fontFamily: commonFonts.bold }} />
                            </View>
                        </DenseCard>
                    </View>
                </View>
            </ScrollView>

            <Button showText={'Proceed to Pay'} />

        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        marginTop: 20,
    },
    topCard: {
        marginVertical: 25,
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
        alignItems: 'center',
    },
    cartDetailsText: {
        marginLeft: 5,
        flexWrap: 'nowrap',

    },
    denceInnnerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    bottomBtn: {
        alignSelf: 'flex-start',
        alignSelf: 'center',
    }
})


export default MyCart