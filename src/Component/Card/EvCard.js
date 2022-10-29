import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import IconCard from './IconCard'
import Location1Svg from '../../assests/svg/Location1Svg'
import CommonText from '../Text/CommonText'

const EvCard = ({ onPress, title, subTitle, rightText, backgroundColor, rightTitleColor }) => {

    return (
        <TouchableOpacity style={{ marginVertical: 10 }} onPress={onPress}>
            <Card >
                <View style={styles.container}>
                    <View style={styles.centerView}>
                        <IconCard Svg={Location1Svg} />
                        <View style={styles.cardInner}>
                            <CommonText showText={title} fontSize={16} />
                            <CommonText showText={subTitle} fontSize={13} />
                        </View>
                    </View>
                    <View>
                        <View style={[{ backgroundColor: backgroundColor }, styles.rightCon]}>
                            <CommonText showText={'0/2'} customstyles={{ color: '#fff' }} />
                        </View>

                        <CommonText fontSize={12} showText={rightText} customstyles={{ color: rightTitleColor }} />
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    centerView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    cardInner: {
        marginLeft: 10
    },
    rightCon: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 4,
        width: 35,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    rightText: {
        color: '#fff'
    }
})

export default EvCard