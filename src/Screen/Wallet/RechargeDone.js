import React from 'react'
import OrderConfirm from '../../Component/MajorComponents/OrderConfirm'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'

const RechargeDone = () => {
    const navigation = useNavigation()
    return (
        <OrderConfirm
            subHeading={'Wallet Recharged Successfully'}
            btnText={'View Wallet'}
            onPress={() => {
                navigation.pop(3)
            }}
        />
    )
}

export default RechargeDone