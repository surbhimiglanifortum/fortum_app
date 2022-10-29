import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import BlackText from '../Text/BlackText'
import colors from '../../Utils/colors'
import commonFonts from '../../Utils/fonts/fonts'
import RedText from '../Text/RedText'
import IconCard from './IconCard'
import Location1Svg from '../../assests/svg/Location1Svg'
import WhiteText from '../Text/WhiteText'
import AppText from '../Text/AppText'

const DetailsCard = ({ onPress, title, subTitle }) => {

    return (
        <TouchableOpacity style={{ marginVertical: 10 }} onPress={onPress}>
            <Card >
                <View style={styles.container}>
                    <View style={styles.centerView}>
                        <IconCard Svg={Location1Svg} />
                        <View style={styles.cardInner}>
                            <BlackText showText={title} fontSize={16} />
                            <BlackText showText={subTitle} fontSize={13} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.rightCon}>
                            <WhiteText showText={'0/2'} />
                        </View>

                        <AppText
                            text={'Out Of Order'}
                        />
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
        backgroundColor: colors.green,
        paddingVertical: 4,
        paddingHorizontal: 4,
        borderRadius: 4,
        width: 35,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
})

export default DetailsCard