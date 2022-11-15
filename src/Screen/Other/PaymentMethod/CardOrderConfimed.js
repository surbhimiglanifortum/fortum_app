import React from 'react'
import OrderConfirm from '../../../Component/MajorComponents/OrderConfirm'
import { useNavigation } from '@react-navigation/native'

const CardOrderConfirmed = () => {
    const navigation = useNavigation()
    return (
        <OrderConfirm
            subHeading={'Order Confirmed'}
            btnText={'View Card Deatils'}
            onPress={() => {
                navigation.pop(2)
            }}
        />
    )
}

export default CardOrderConfirmed