import { View, Modal, StyleSheet, ImageBackground, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import Button from '../Button/Button'
import CommonText from '../Text/CommonText'
import { scale } from 'react-native-size-matters'

const YouSavedModal = ({ openYouSavedModal, setOpenYouSavedModal }) => {

    const scheme = useColorScheme()

    const okayBtnHandler = () => {
        try {
            openYouSavedModal?.onOkPress()
        } catch (error) {

        }
        setOpenYouSavedModal({ isVisible: false, message: "" })
    }

    return (
        <Modal visible={openYouSavedModal.isVisible} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <View style={[styles.innerContainer, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.lightBackGround }]}>
                    <View style={styles.wrapContainer}>
                        <View style={{ width: '100%', height: scale(210) }}>
                            <ImageBackground source={require('../../assests/youSaved.png')} style={{ height: '100%', width: '100%' }} resizeMode='contain'>
                                <CommonText showText={'You have saved'} customstyles={{ position: 'absolute', color: colors.green, top: 50, alignSelf: 'center' }} />
                                <CommonText showText={`₹ ${openYouSavedModal.message}`} fontSize={25} customstyles={{ position: 'absolute', color: colors.green, top: 80, alignSelf: 'center' }} />
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
})

export default YouSavedModal