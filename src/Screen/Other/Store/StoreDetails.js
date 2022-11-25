import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, FlatList, Image, } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import routes from '../../../Utils/routes'
import CommonText from '../../../Component/Text/CommonText'
import DenseCard from '../../../Component/Card/DenseCard/index'
import { scale } from 'react-native-size-matters'
import Button from '../../../Component/Button/Button'
import AddRemoveCard from '../../../Component/Card/AddRemoveCard'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StoreCart from '../../../Component/Card/StoreCard/StoreCart'
import ChargingKeyWhiteSvg from '../../../assests/svg/ChargingKeyWhiteSvg'
import ChargingKeyBlackSvg from '../../../assests/svg/ChargingKeyBlackSvg'

const StoreDetails = ({ route }) => {

    const dispatch = useDispatch()
    const navigateData = route.params.dataItem.item

    const cartData = useSelector((state) => state.AddToCartReducers.cartItem)

    let cartCout = cartData.filter(e => {
        return { ...e }
    })

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [cartCount, setCartCount] = useState(0);
    const isFocused = useIsFocused()
    const cartHandler = () => {
        navigation.navigate(routes.MyCart)
    }

    const addQty = async () => {
        dispatch({
            type: 'ADD_CART_ITEM',
            payload: { id: navigateData.id, cartItem: 1, ...navigateData }
        })
        setCartCount(cartCount + 1)

    }

    const removeQty = () => {
        dispatch({
            type: 'SUB_CART_ITEM',
            payload: { id: navigateData.id, cartItem: 1, ...navigateData }

        })
        setCartCount(cartCount - 1)
    }

    const addCartBtn = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { id: navigateData.id, cartItem: 1, ...navigateData }
        })
        setCartCount(1)
    }

    useEffect(() => {

    }, [isFocused])


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Header showText={'Store'} />
                        <StoreCart onPress={cartHandler} />
                    </View>
                    <DenseCard>
                        {navigateData?.icon?.length > 1 ? <Image source={{ uri: navigateData?.icon }} style={styles.img} />
                            : <View style={styles.img}>
                                {scheme == 'dark' ? <ChargingKeyWhiteSvg /> : <ChargingKeyBlackSvg />}
                            </View>}
                    </DenseCard>
                    <DenseCard style={styles.card}>
                        <CommonText showText={navigateData?.name} fontSize={20} />
                        <CommonText showText={`₹ ${navigateData?.price}`} fontSize={14} />
                    </DenseCard>
                </View>

                {cartData.findIndex(e => e.id == navigateData.id) < 0 && <Button showText={'Add to Cart'} onPress={() => addCartBtn(navigateData)} />}
                {cartData.findIndex(e => e.id == navigateData.id) >= 0 && <View style={styles.btnCon}>
                    <AddRemoveCard cartCount={cartData[cartData.findIndex(e => e.id == navigateData.id)].cartItem} addQty={addQty} removeQty={removeQty} />
                    <View style={styles.addCartBtn}>
                        <Button showText={'Checkout'} onPress={cartHandler} />
                    </View>
                </View>}

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
        marginTop: 20,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    cartCon: {
        backgroundColor: colors.white,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 6,
        elevation: 5
    },
    card: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    img: {
        width: scale(200),
        height: scale(200),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    addCartBtn: {
        width: '47%'
    }

})


export default StoreDetails