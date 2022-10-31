import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../Button/Button'
import CommonText from '../Text/CommonText'


const CommonModal = ({ openCommonModal, setOpenCommonModal ,showText }) => {



    const okayBtnHandler = () => {
        setOpenCommonModal(false)
    }
    return (
        <Modal visible={openCommonModal} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.wrapContainer}>
                        <View style={styles.header}>
                            <CommonText showText={'Notifications'} fontSize={20} />
                            <TouchableOpacity style={styles.crossBtn} onPress={() => { setOpenCommonModal(false) }}>
                                <AntDesign name='close' size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerText}>
                            <CommonText showText={showText} fontSize={16} />
                        </View>
                        <View>
                            <Button showText={'Okay'} onPress={okayBtnHandler} />
                        </View>
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

export default CommonModal