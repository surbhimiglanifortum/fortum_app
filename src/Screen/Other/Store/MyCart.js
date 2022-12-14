import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import DenseCard from '../../../Component/Card/DenseCard/index'
import CommonText from '../../../Component/Text/CommonText'
import commonFonts from '../../../Utils/fonts/fonts'
import StoreSvg from '../../../assests/svg/StoreSvg'
import AddRemoveCard from '../../../Component/Card/AddRemoveCard'
import { useState } from 'react'
import Button from '../../../Component/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import CommonView from '../../../Component/CommonView/index'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'
import * as ApiAction from '../../../Services/Api'
import routes from '../../../Utils/routes'
import SnackContext from '../../../Utils/context/SnackbarContext'
import NoData from '../../../Component/NoDataFound/NoData'

const MyCart = ({ route }) => {

    const scheme = useColorScheme()
    const dispatch = useDispatch()
    const { setOpenCommonModal } = useContext(SnackContext);

    const navigation = useNavigation()
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false)
    const cartData = useSelector((state) => state.AddToCartReducers.cartItem)
    const cartDataDetails = useSelector((state) => state.AddToCartReducers)

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const [deliveryAddress, setDeliveryAddress] = useState((mUserDetails?.delivery_addresses && mUserDetails.delivery_addresses.length > 0) ? mUserDetails.delivery_addresses[0] : '');

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

    const ProceedToPayHadnler = async () => {
        if (!deliveryAddress || !deliveryAddress?.address) {
            // please slect delivery address
            setOpenCommonModal({ isVisible: true, message: "Please Select Delivery Address" })
            return
        }

        setLoading(true)

        const cartObj = {}
        cartDataDetails?.cartItem.map(e => {
            cartObj[e.id] = e.cartItem
        })

        const payload = {
            username: mUserDetails.username, cartObj: cartObj, deliveryAddress
        }

        try {
            const result = await ApiAction.placeOrder(payload)
            if (result.data.result === 'ok') {
                dispatch({
                    type: 'CLEAR_CART',
                    payload: []
                })
                setOpenCommonModal({ isVisible: true, message: 'Order placed successfully' })
                navigation.reset({
                    index: 0,
                    routes: [{ name: routes.dashboard }],
                });
            } else {
                dispatch({
                    type: 'CLEAR_CART',
                    payload: []
                })
                navigation.navigate(routes.PaymentScreenJuspay, {
                    callFrom: 'MyCart',
                    description: 'Add Money In Wallet',
                    callback_url: '',
                    juspay_process_payload: result.data.juspay_sdk_payload
                })
            }
        } catch (error) {
            setOpenCommonModal({ isVisible: true, message: error.message })
        }

        setLoading(false)
    }

    useEffect(() => {
        setCartCount(cartlength)
    }, [cartlength])


    const handleChangeDeliveryAddress = () => {
        navigation.navigate(routes.DeliveryAddress, { callbackSelectAddress })
    }

    const callbackSelectAddress = (address) => {
        setDeliveryAddress(address)

    }


    return (
        <CommonView>
            <ScrollView >
                <View style={styles.innerContainer}>
                    <Header showText={'My Cart'} />
                    <View style={styles.topCard}>
                        {cartDataDetails?.cartItem.length > 0 ? cartDataDetails?.cartItem.map((item, ind) => {
                            return (
                                <DenseCard key={ind} padding={5}>
                                    <View style={styles.denceInnnerCard}>
                                        <View style={[styles.cartInner, { width: '50%' }]}>
                                            <View style={{ width: '30%' }}>
                                                <CommonIconCard Svg={StoreSvg} />
                                            </View>
                                            <View style={[styles.cartDetailsText, { width: '50%' }]}>
                                                <CommonText showText={item?.name} />
                                                <CommonText showText={`??? ${item?.price * item?.cartItem
                                                    }`} regular customstyles={{}} />
                                            </View>
                                        </View>
                                        <View style={{ width: '45%' }}>
                                            <AddRemoveCard removeQty={() => removeQty(item)} addQty={() => { addQty(item) }} cartCount={item?.cartItem} disabled={cartCount == 0} showText={cartlength} />
                                        </View>
                                    </View>
                                </DenseCard>
                            )
                        }) : <NoData showText={'No Items Found in Cart'} />}
                    </View>
                    <TouchableOpacity onPress={handleChangeDeliveryAddress}>
                        <DenseCard>
                            <CommonText showText={'Delivery Address'} />
                            {console.log("Check Address on cart", deliveryAddress)}
                            {!deliveryAddress?.address && <CommonText regular fontSize={14}>Add Delivery Address</CommonText>}
                            {(!deliveryAddress?.first_name == "" || !deliveryAddress?.last_name == "") && <CommonText regular fontSize={14} showText={`${deliveryAddress?.first_name || ""} ${deliveryAddress?.last_name || ""}`} />}
                            {(!deliveryAddress?.address == "" || !deliveryAddress?.address_line_2 == "" || !deliveryAddress?.city == "" || !deliveryAddress?.country == "" || !deliveryAddress?.postal_code == "") && <CommonText regular fontSize={14}>{(deliveryAddress?.address || "") + " " + (deliveryAddress?.address_line_2 || "") + " " + (deliveryAddress?.city || "") + " " + (deliveryAddress?.country || "") + " " + (deliveryAddress?.postal_code || "")}</CommonText>}
                        </DenseCard>
                    </TouchableOpacity>

                    {cartDataDetails?.cartItem.length > 0 && <View style={styles.topCard}>
                        <CommonText showText={'Order Summary'} customstyles={{ marginLeft: 10 }} />
                        <DenseCard>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Price'} regular />
                                <CommonText showText={`??? ${getTotalCartValue()}`} />
                            </View>
                            {/* <View style={styles.innerCard}>
                                <CommonText showText={'Cost'} regular />
                                <CommonText showText={`??? ${'1200'}`} />
                            </View>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Amount of CGST (9%)'} regular />
                                <CommonText showText={`??? ${'100'}`} />
                            </View>
                            <View style={styles.innerCard}>
                                <CommonText showText={'Amount of SGST (9%)'} regular />
                                <CommonText showText={`??? ${'100'}`} />
                            </View> */}
                            <View style={styles.innerCard}>
                                <CommonText showText={'Total '} customstyles={{ marginTop: 20 }} />
                                <CommonText showText={`??? ${getTotalCartValue()}`} customstyles={{ marginTop: 20, fontFamily: commonFonts.bold }} />
                            </View>
                        </DenseCard>
                    </View>}
                </View>
            </ScrollView>

            {cartDataDetails?.cartItem.length > 0 && <Button onLoading={loading} showText={'Proceed to Pay'} onPress={ProceedToPayHadnler} />}

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