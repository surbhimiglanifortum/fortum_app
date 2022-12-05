import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import React from 'react'
import CommonText from '../Text/CommonText'
import CommonCard from '../Card/CommonCard'
import IEC_62196_T2_COMBO from '../../../src/assests/svg/IEC_62196_T2_COMBO'
import IEC_62196_T1 from '../../../src/assests/svg/IEC_62196_T1'
import CHADEMO from '../../../src/assests/svg/CHADEMO'
import IEC_62196_T1_COMBO from '../../../src/assests/svg/IEC_62196_T1_COMBO'
import IEC_62196_T2 from '../../../src/assests/svg/IEC_62196_T2'
import colors from '../../Utils/colors'

const EvCard = ({ item, onPress, title, subTitle, rightText, backgroundColor, rightTitleColor }) => {
    const scheme = useColorScheme()
    const getFile = (key) => {
        switch (key) {
            case 'IEC_62196_T1':
                return <IEC_62196_T1 fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
            case 'IEC_62196_T2_COMBO':
                return <IEC_62196_T2_COMBO fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
            case 'CHADEMO':
                return <CHADEMO fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
            case 'IEC_62196_T2':
                return <IEC_62196_T2 fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
            case 'IEC_62196_T1_COMBO':
                return <IEC_62196_T1_COMBO fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
            case 'DOMESTIC_F':
                return <IEC_62196_T2_COMBO fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
            default:
                return <IEC_62196_T2_COMBO fill={scheme == 'dark' ? colors.white : colors.black} />
                break;
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <CommonCard>
                <View style={styles.container}>
                    <View style={styles.centerView}>
                        <TouchableWithoutFeedback style={styles.card}>
                            {getFile(item?.standard)}
                        </TouchableWithoutFeedback>
                        <View style={styles.cardInner}>
                            <CommonText showText={title} fontSize={16} />
                            <CommonText showText={subTitle} fontSize={13} />
                        </View>
                    </View>
                    <View>

                        <CommonText fontSize={12} showText={rightText} customstyles={{ color: rightTitleColor }} />
                    </View>
                </View>
            </CommonCard>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    centerView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    cardInner: {
        marginLeft: 10
    },
})

export default EvCard