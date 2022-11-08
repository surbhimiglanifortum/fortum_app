import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import CommonCard from '../../Component/Card/CommonCard/index'
import CommonText from '../Text/CommonText'
const BackBtnTab = ({ onPress,showText }) => {
  const navigation = useNavigation()
  const scheme = useColorScheme()

  return (
    <View style={styles.header}>
    <CommonCard margin={1}>
      <TouchableOpacity style={[styles.container]} onPress={onPress}>
        <AntDesign name='left' size={25} color={ scheme == 'dark'?colors.white:colors.black} />
      </TouchableOpacity>
    </CommonCard>
    <CommonText showText={showText} fontSize={18} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start'
  },
  header: { flexDirection: 'row', alignItems: 'center', width: '65%', justifyContent: 'space-between' },

})

export default BackBtnTab