import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonText from '../Text/CommonText'
import Feather from 'react-native-vector-icons/Feather'

const WalletModals = ({ modalVisible, setModalVisible, showStartDatePicker, showEndDatePicker, startDate, endDate, showDateList }) => {

    const showBtnhandler = () => {
        setModalVisible(false)
    }

    return (
        <Modal visible={modalVisible} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={styles.crossBtn} onPress={() => { setModalVisible(false) }}>
                        <AntDesign name='close' size={20} />
                    </TouchableOpacity>
                    <View style={styles.centerText}>
                        <CommonText showText={'Select Date'} fontSize={20} customstyles={{ color: colors.red }} />
                    </View>
                    <CommonText showText={'Start Date'} customstyles={{ color: colors.black }} />
                    <TouchableOpacity style={styles.textinputCon} onPress={() => { showStartDatePicker() }}>
                        <TextInput editable={false} placeholder='Please Select Start Date' value={startDate} />
                        <Feather name='calendar' size={20} />
                    </TouchableOpacity>
                    <CommonText showText={'End Date'} customstyles={{ color: colors.black }} />
                    <TouchableOpacity style={styles.textinputCon} onPress={() => { showEndDatePicker() }}>
                        <TextInput editable={false} placeholder='Please Select End Date' value={endDate} />
                        <Feather name='calendar' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { showDateList() }}>
                        <CommonText showText={'Show'} customstyles={styles.greenText} />
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(196,196,196,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        width: '85%',
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    crossBtn: {
        backgroundColor: colors.white,
        elevation: 5,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 6,
        alignSelf: 'flex-end',
        marginVertical: 10
    },
    centerText: {
        marginBottom: 20
    },
    textinputCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    greenText: {
        color: colors.green,
        marginVertical: 20,
    },

})


export default WalletModals