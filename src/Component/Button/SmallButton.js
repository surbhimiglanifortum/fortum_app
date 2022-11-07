import { TouchableOpacity } from 'react-native'
import React from 'react'
import CommonCard from '../Card/CommonCard'

const SmallButton = ({ Svg, onPress }) => {
  return (
    <CommonCard>
      <TouchableOpacity onPress={onPress}>
        <Svg />
      </TouchableOpacity>
    </CommonCard>
  )
}

export default SmallButton