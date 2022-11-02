import React from 'react'
import CommonText from '../Text/CommonText'

const NoData = ({showText}) => {
  return (
    <CommonText showText={showText} customstyles={{ alignSelf: 'center', marginTop: 50 }} />
  )
}

export default NoData