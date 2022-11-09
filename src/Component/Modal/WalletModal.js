import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommonText from '../Text/CommonText'
import Feather from 'react-native-vector-icons/Feather'
import CommonCard from '../../Component/Card/CommonCard/index'

const WalletModals = ({ modalVisible, setModalVisible, showStartDatePicker, showEndDatePicker, startDate, endDate, showDateList }) => {


    return (
        <Modal visible={modalVisible} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <CommonCard>
                        <TouchableOpacity style={styles.crossBtn} onPress={() => { setModalVisible(false) }}>
                            <CommonCard>
                                <AntDesign name='close' size={20} />
                            </CommonCard>
                        </TouchableOpacity>
                        <View style={styles.centerText}>
                            <CommonText showText={'Select Date'} fontSize={20} customstyles={{ color: colors.red }} />
                        </View>
                        <CommonText showText={'Start Date'} />
                        <TouchableOpacity style={styles.textinputCon} onPress={() => { showStartDatePicker() }}>
                            <TextInput editable={false} placeholder='Please Select Start Date' value={startDate} />
                            <Feather name='calendar' size={20} />
                        </TouchableOpacity>
                        <CommonText showText={'End Date'} />
                        <TouchableOpacity style={styles.textinputCon} onPress={() => { showEndDatePicker() }}>
                            <TextInput editable={false} placeholder='Please Select End Date' value={endDate} />
                            <Feather name='calendar' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { showDateList() }}>
                            <CommonText showText={'Show'} customstyles={styles.greenText} />
                        </TouchableOpacity>
                    </CommonCard>
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
        width: '95%',
    },
    crossBtn: {
        alignSelf: 'flex-end',
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