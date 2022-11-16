import { TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonCard from '../../Component/Card/CommonCard/index'

const BackButton = ({ onPress }) => {
  const scheme = useColorScheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <CommonCard margin={1}>
        <AntDesign name='left' size={25} color={scheme == 'dark' ? colors.white : colors.black} />
      </CommonCard>
    </TouchableOpacity>
  )
}


export default BackButton