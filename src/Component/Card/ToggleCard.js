import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import { Switch } from 'react-native-paper';
import IconCard from './IconCard'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'
const ToggleCard = ({ Svg, showText, fontSize }) => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <CommonCard>
            <View style={styles.card} >
                <View style={styles.leftContainer}>
                    <IconCard Svg={Svg} />
                    <View style={styles.middleContainer}>
                        <CommonText showText={showText} fontSize={fontSize} />
                    </View>
                </View>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.green} />
            </View>
        </CommonCard>

    )
}

const styles = StyleSheet.create({

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    icon: { paddingVertical: scale(15), paddingHorizontal: scale(18), backgroundColor: colors.greenBackground, borderRadius: 5 },
    middleContainer: { marginLeft: scale(15) },
    deleteIcon: {
        elevation: 10,
        backgroundColor: '#FFF', paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    }

})

export default ToggleCard