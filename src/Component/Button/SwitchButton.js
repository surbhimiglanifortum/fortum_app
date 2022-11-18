import React from 'react'
import { Switch } from 'react-native'
import colors from '../../Utils/colors'

const SwitchButton = ({ onValueChange, value }) => {
    return (
        <Switch
            trackColor={{ false: colors.grey, true: colors.green }}
            thumbColor={value ? colors.green : colors.grey}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onValueChange}
            value={value}
        />
    )
}

export default SwitchButton