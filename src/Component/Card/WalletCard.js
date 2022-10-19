import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LocationCard from './LocationCard'
import Button from '../Button/Button'
import colors from '../../Utils/colors'

const WalletCard = ({onPress}) => {
  return (
    <View style={styles.container}>
      <LocationCard title={'₹50'} fontSize={20} subTitle={'Your Prepaid Balance'} iconName={'wallet'} />
      <Button showText={'Recharge'} onPress={onPress} />
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        paddingVertical:15,
        paddingHorizontal:15,
        borderRadius:10,
        marginTop:25
    }
})

export default WalletCard