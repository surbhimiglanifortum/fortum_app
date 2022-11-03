import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CommonView from '../../../Component/CommonView'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import { RadioButton } from 'react-native-paper'

const PayInvoice = ({ route }) => {


    const [mode, setMode] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const checkWalletBalance = () => {
        // setMode('CLOSED_WALLET')
        // setRefreshing(true)
        // if (userData?.balance < props.route.params.amount_due) {
        //     setMsg("Your wallet balance is low. Please select other option or add money in your wallet.")
        //     setWalletBalance(userData?.balance)
        //     setWallet(false)
        //     setRefreshing(false)
        // } else {
        //     setMsg('')
        //     setWalletBalance(userData?.balance)
        //     setWallet(true)
        //     setRefreshing(false)
        // }
    }


    return (
        <CommonView>
            <Header showText={'Pay Invoice'} />
            <CommonText showText={`Pay ₹ ${route.params?.amount}`} />
            <View>
                <RadioButton
                    color={AppColors.limeGreen}
                    value="CLOSED_WALLET"
                    status={mode === 'CLOSED_WALLET' ? 'checked' : 'unchecked'}
                    onPress={checkWalletBalance}
                />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({

})

export default PayInvoice