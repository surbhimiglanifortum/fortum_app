
import React from 'react'
import { RadioButton } from 'react-native-paper'
import colors from '../../Utils/colors'

const RadioBtn = ({ status, onPress, value }) => {
    return (
        <RadioButton
            color={colors.green}
            uncheckedColor={colors.grey}
            value={value}
            status={status}
            onPress={onPress}
        />
    )
}

export default RadioBtn