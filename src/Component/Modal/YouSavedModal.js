import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../Button/Button'
import CommonText from '../Text/CommonText'
import YouSavedSvg from '../../assests/svg/YouSavedSvg'

import { scale } from 'react-native-size-matters'
const YouSavedModal = ({ openCommonModal, setOpenCommonModal }) => {

    const scheme = useColorScheme()
    const okayBtnHandler = () => {
        openCommonModal?.onOkPress()
        setOpenCommonModal({ isVisible: false, message: "" })
    }

    return (
        <Modal visible={false} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <View style={[styles.innerContainer, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.lightBackGround }]}>
                    <View style={styles.wrapContainer}>
                        <View style={{ width: '100%', height: scale(210) }}>
                            <ImageBackground source={require('../../assests/youSaved.png')} style={{ height: '100%', width: '100%' }} resizeMode='contain'>
                                <CommonText showText={'You have saved'} customstyles={{ position: 'absolute', color: colors.green, top: 50, alignSelf: 'center' }} />
                                <CommonText showText={`₹ ${'78'}`} fontSize={25} customstyles={{ position: 'absolute', color: colors.green, top: 80, alignSelf: 'center' }} />
                                <CommonText showText={`Drive more, Save more with Charge & Drive`} fontSize={14} customstyles={{ position: 'absolute', color: colors.green, bottom: 45, alignSelf: 'center' }} />
                            </ImageBackground>

                        </View>
                        <Button showText={'Continue'} onPress={okayBtnHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(196,196,196,0.8)'
    },
    innerContainer: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 0,
        borderRadius: 6
    },
    wrapContainer: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        justifyContent: 'space-between',
        alignSelf: 'flex-end'
    },
    crossBtn: {
        backgroundColor: colors.white,
        elevation: 5,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 6
    },
    centerText: {
        marginVertical: 50,
        alignSelf: 'center'
    }
})


export default YouSavedModal