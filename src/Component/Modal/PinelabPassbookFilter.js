import React from 'react'
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native'
import CommonView from '../CommonView'
import CommonText from '../Text/CommonText'
import Textinput from '../Textinput/Textinput'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PinelabPassbookFilter = ({ isVisible, bgStyle, startDate, endDate, showStartDatePicker, showEndDatePicker, noTrans, setNoTrans }) => {

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
        >
            <View style={[styles.centeredView, { backgroundColor: bgStyle }]}>
                <CommonView style={styles.modalView} isFlex={false}>
                    <View style={{ marginVertical: 10 }}>
                        <CommonText showText={'Start Date'} />
                        <TouchableOpacity style={[styles.inputWrapper, styles.wrapper]} onPress={showStartDatePicker}>
                            <Textinput editable={false} value={startDate} placeholder={'Please Select Start Date'} />
                            <Ionicons name={"calendar"} size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <CommonText showText={'End Date'} />
                        <TouchableOpacity style={[styles.inputWrapper, styles.wrapper]} onPress={showEndDatePicker}>
                            <Textinput editable={false} value={endDate} placeholder={'Please Select End Date'} />
                            <Ionicons name={"calendar"} size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <CommonText showText={'Number of Transaction'} />
                        <View style={[styles.inputWrapper, styles.wrapper]}>
                            <Textinput value={noTrans} placeholder={'Please Enter Number of Transactions'} onChangeText={setNoTrans} keyboardType={'numeric'} />
                            <Ionicons name={"copy"} size={24} />
                        </View>
                    </View>
                </CommonView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        paddingTop: 10,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    inputWrapper: {
        borderRadius: 4,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

export default PinelabPassbookFilter