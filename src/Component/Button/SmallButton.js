import { TouchableOpacity } from 'react-native'
import React from 'react'
import CommonCard from '../Card/CommonCard'

const SmallButton = ({ Svg }) => {
  return (
    <CommonCard>
      <TouchableOpacity>
        <Svg />
      </TouchableOpacity>
    </CommonCard>
  )
}

export default SmallButton