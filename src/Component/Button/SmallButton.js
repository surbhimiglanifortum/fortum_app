import { TouchableOpacity } from 'react-native'
import React from 'react'
import CommonCard from '../Card/CommonCard'

const SmallButton = ({ Svg, onPress ,fill}) => {
  return (
    <CommonCard>
      <TouchableOpacity onPress={onPress}>
        <Svg fill={fill} />
      </TouchableOpacity>
    </CommonCard>
  )
}

export default SmallButton