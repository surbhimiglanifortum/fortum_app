import { View, Text, useColorScheme, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import AddButton from '../../Component/Button/AddButton'
import Button from '../../Component/Button/Button'
import WhiteButton from '../../Component/Button/WhiteButton'
import Slider from '@react-native-community/slider';
import CommonText from '../../Component/Text/CommonText'
import DenseCard from '../../Component/Card/DenseCard'
import CommonCard from '../../Component/Card/CommonCard'

const RechargeWallet = () => {

  const data = [1, 2, 3, 4, 5, 6, 7, 8]
  const scheme = useColorScheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        <Header showText={'Wallet Recharge'} />
        <View style={{ marginTop: 60 }}>
          <DenseCard>
            <View style={styles.innerCard}>
              <AddButton backgroundColor={colors.white} iconName={'minus'} color={colors.black} />
              <CommonText showText={'₹50'} fontSize={25} />
              <AddButton backgroundColor={colors.greenBackground} iconName={'plus'} color={colors.white} />
            </View>
            <View>
              <Slider
                style={{ width: '100%', height: 60 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={colors.green}
                maximumTrackTintColor="#000000"
              />
            </View>
          </DenseCard>
        </View>

        <FlatList
          data={data}
          numColumns={'4'}
          keyExtractor={item => item.id}
          renderItem={(item) => {
            return (
              <CommonCard>
                <CommonText showText={`₹ ${50 * item.item}`} />
              </CommonCard>
            )
          }}
        />

      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonInner}>
          <WhiteButton backgroundColor={colors.white} showText={'Cancel'} color={colors.black} />
        </View>
        <View style={styles.buttonInner}>
          <Button backgroundColor={colors.white} showText={'Recharge'} color={colors.white} style={{ marginLeft: 10 }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20
  },
  innerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  moneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 25
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20
  },
  buttonInner: {
    flex: 1
  }
})

export default RechargeWallet