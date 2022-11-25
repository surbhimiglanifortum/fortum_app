import React from 'react'
import OrderConfirm from '../../../Component/MajorComponents/OrderConfirm'
import { useNavigation } from '@react-navigation/native'

const AddMoneyDone = () => {
    const navigation = useNavigation()
    return (
        <OrderConfirm
            subHeading={'Recharged Successfully'}
            btnText={'View Card Details'}
            onPress={() => {
                navigation.pop(2)
            }}
        />
    )
}

export default AddMoneyDone