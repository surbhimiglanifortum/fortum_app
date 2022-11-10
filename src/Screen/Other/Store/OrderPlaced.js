import React from 'react'
import OrderConfirm from '../../../Component/MajorComponents/OrderConfirm'
import { useNavigation } from '@react-navigation/native'
import routes from '../../../Utils/routes'
const RechargeDone = () => {
    const navigation = useNavigation()
    return (
        <OrderConfirm
            subHeading={'We have received your order'}
            btnText={'View Order'}
            onPress={() => {
                navigation.pop(3)
                navigation.navigate(routes.Order)
            }}
        />
    )
}

export default RechargeDone