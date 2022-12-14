import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LocationCard from './LocationCard'
import Button from '../Button/Button'
import colors from '../../Utils/colors'
import DenseCard from '../Card/DenseCard'
import IconCardLarge from '../Card/IconCardLarge'
import WalletLight from '../../assests/svg/Wallet_light'
import CommonText from '../Text/CommonText'
import CommonIconCard from './CommonIconCard/CommonIconCard'
import WalletSvg from '../../assests/svg/wallet'

const WalletCard = ({ onPress, title, subTitle }) => {
  return (
    <DenseCard >
      <View style={styles.row}>
        <CommonIconCard Svg={WalletSvg} />
        <View style={styles.rightContainer}>
          <CommonText showText={title} fontSize={24} />
          <CommonText showText={subTitle} regular customstyles={{ marginTop: -5 }} />
        </View>
      </View>
      <Button showText={'Recharge'} onPress={onPress} isFlex={false} />
    </DenseCard>
  )
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10
  }
})

export default WalletCard