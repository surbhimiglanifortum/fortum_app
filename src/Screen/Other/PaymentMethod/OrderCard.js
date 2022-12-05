import React, { useState, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import CommonView from '../../../Component/CommonView'
import Header from '../../../Component/Header/Header'
import DenseCard from '../../../Component/Card/DenseCard'
import CommonText from '../../../Component/Text/CommonText'
import routes from '../../../Utils/routes'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import PinelabCard from '../../../assests/svg/PinelabCard'
import Button from '../../../Component/Button/Button'
import { orderPinelabCard } from '../../../Services/Api'
import SnackContext from '../../../Utils/context/SnackbarContext'

const OrderCard = () => {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const { setOpenCommonModal } = useContext(SnackContext)

    const [deliveryAddress, setDeliveryAddress] = useState((mUserDetails?.delivery_addresses && mUserDetails.delivery_addresses.length > 0) ? mUserDetails.delivery_addresses[0] : '');
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const handleChangeDeliveryAddress = () => {
        navigation.navigate(routes.DeliveryAddress, { callbackSelectAddress })
    }

    const callbackSelectAddress = (address) => {
        setDeliveryAddress(address)
    }

    const placeOrder = async () => {
        setLoading(true)
        try {
            const payload = {
                username: mUserDetails?.username,
                addressInfo: {
                    addressLine1: deliveryAddress?.address,
                    addressLine2: deliveryAddress?.address_line_2,
                    city: deliveryAddress?.city,
                    state: deliveryAddress?.country,
                    pinCode: deliveryAddress?.postal_code
                }
            }
            const result = await orderPinelabCard(payload)
            console.log('Order Card', result.data)
            if (result.data?.success) {
                navigation.navigate(routes.CardOrderConfirmed)
            }
            else {
                setOpenCommonModal({
                    isVisible: true, message: result.data?.message, onOkPress: () => {
                        navigation.goBack()
                    }
                })
            }
            setLoading(false)
        } catch (error) {
            console.log('Order Card Error', error)
            setLoading(false)
        }
    }

    return (
        <CommonView>
            <View style={{ flex: 1 }}>
                <Header showText={'Place Order'} />

                <TouchableOpacity onPress={handleChangeDeliveryAddress} style={{ marginVertical: 20 }}>
                    <DenseCard>
                        <CommonText showText={'Delivery Address'} />
                        {!deliveryAddress?.address && <CommonText regular fontSize={14}>Add Delivery Address</CommonText>}
                        <CommonText regular fontSize={14}>
                            {deliveryAddress?.first_name + " " + deliveryAddress?.last_name}
                        </CommonText>
                        <CommonText regular fontSize={14}>{(deliveryAddress?.address || "") + " " + (deliveryAddress?.address_line_2 || "") + " " + (deliveryAddress?.city || "") + " " + (deliveryAddress?.country || "") + " " + (deliveryAddress?.postal_code || "")}</CommonText>
                    </DenseCard>
                </TouchableOpacity>

                <PinelabCard width={'100%'} />
            </View>

            <Button showText={'Place Order'} style={styles.btnFixed} onPress={placeOrder} onLoading={loading} />
        </CommonView>
    )
}

const styles = StyleSheet.create({
    btnFixed: {
        // position: 'absolute',
        // bottom: 0,
        // left: 10,
        // width: '100%'
    }
})

export default OrderCard