import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../Button/Button'
import CommonText from '../Text/CommonText'
import CommonView from '../CommonView'
import WhiteButton from '../Button/WhiteButton'

const CommonModal = ({ openCommonModal, setOpenCommonModal, heading, showBtnText }) => {

    const okayBtnHandler = () => {
        try {
            openCommonModal?.onOkPress()
        } catch (error) {
        }

        setOpenCommonModal({ isVisible: false, message: "", heading: '', showBtnText: "" })
    }

    return (
        <Modal visible={openCommonModal?.isVisible} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <CommonView style={styles.innerContainer}>
                    <View style={styles.wrapContainer}>
                        <View style={styles.header}>
                            <CommonText showText={openCommonModal.heading ? openCommonModal?.heading : 'Notification'} customstyles={styles.heading} />
                            <TouchableOpacity style={styles.crossBtn} onPress={() => { setOpenCommonModal({ isVisible: false, message: "" }) }}>
                                <AntDesign name='close' size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerText}>
                            <CommonText showText={openCommonModal?.message} fontSize={16} regular />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>

                            {openCommonModal.secondButton &&
                                <View style={{ flex: 1, marginHorizontal: 4 }}>
                                    <WhiteButton onPress={() => {
                                        try {
                                            openCommonModal?.secondButton?.onPress()
                                        } catch (error) {

                                        }
                                        setOpenCommonModal({ isVisible: false, message: "", heading: '', showBtnText: "" })

                                    }} showText={openCommonModal.secondButton?.title}></WhiteButton>
                                </View>
                            }
                            <View style={{ flex: 1, marginHorizontal: 4 }}>
                                <Button showText={openCommonModal.showBtnText ? openCommonModal?.showBtnText : 'Okay'} onPress={okayBtnHandler} />
                            </View>
                        </View>
                    </View>
                </CommonView>
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
        position: 'absolute',
        bottom: 0,

    },
    wrapContainer: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 20,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%'
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
    },
    heading: {
        textAlign: 'center',
        flex: 1,
        marginLeft: 35
    }
})

export default CommonModal