import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, FlatList, Image, } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'
import routes from '../../../Utils/routes'
import CommonText from '../../../Component/Text/CommonText'
import DenseCard from '../../../Component/Card/DenseCard/index'
import { scale } from 'react-native-size-matters'
import Button from '../../../Component/Button/Button'
import AddRemoveCard from '../../../Component/Card/AddRemoveCard'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import StoreCart from '../../../Component/Card/StoreCard/StoreCart'

const StoreDetails = ({ route }) => {

    const dispatch =useDispatch()
    const navigateData = route.params.dataItem.item
    console.log(navigateData, '............navigate data')

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [cartCount, setCartCount] = useState(0);

    const cartHandler = () => {
        navigation.navigate(routes.MyCart)
    }

    const addQty = async () => {
        setCartCount(cartCount + 1)
        dispatch({
            type: 'Add_To_Cart',
            payload: cartCount
        })

    }

    const removeQty = () => {
        dispatch({
            type: 'REMOVE_To_Cart',
            payload: cartCount
        })
        setCartCount(cartCount - 1)
    }
    const addCartBtn = () => {
        dispatch({
            type: 'Add_To_Cart',
            payload: cartCount+1
        })
        setCartCount(1)
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Header showText={'Store'} />
                        <StoreCart onPress={cartHandler} />
                    </View>
                    <DenseCard>
                        <Image source={navigateData?.icon ? { uri: navigateData?.icon } : require('../../../assests/chargingKey.png')} style={styles.img} />
                    </DenseCard>
                    <DenseCard style={styles.card}>
                        <CommonText showText={navigateData?.name} fontSize={20} />
                        <CommonText showText={`₹ ${navigateData?.price}`} fontSize={14} />
                    </DenseCard>
                </View>

                {cartCount == 0 && <Button showText={'Add to Cart'} onPress={()=>addCartBtn(navigateData)} />}
                {cartCount >= 1 && <View style={styles.btnCon}>
                    <AddRemoveCard cartCount={cartCount} addQty={addQty} removeQty={removeQty} />
                    <View style={styles.addCartBtn}>
                        <Button showText={'Checkout'}  onPress={cartHandler} />
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
        alignSelf: 'center'
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