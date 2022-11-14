import React from 'react'
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native'
import CommonView from '../CommonView'
import CommonText from '../Text/CommonText'
import Textinput from '../Textinput/Textinput'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../Button/Button'
import WhiteButton from '../Button/WhiteButton'

const PinelabPassbookFilter = ({ isVisible, bgStyle, startDate, endDate, showStartDatePicker, showEndDatePicker, noTrans, setNoTrans, onClosePress, onPress }) => {

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
        >
            <View style={[styles.centeredView, { backgroundColor: bgStyle }]}>
                <CommonView style={styles.modalView} isFlex={false}>
                    <View style={styles.wrapper}>
                        <CommonText showText={'Select Date'} black />
                        <Ionicons name={"close"} size={24} style={{ marginLeft: 10 }} onPress={onClosePress} />
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <CommonText showText={'Start Date'} fontSize={14} />
                        <TouchableOpacity style={[styles.inputWrapper, styles.wrapper]} onPress={showStartDatePicker}>
                            <View style={{ flex: 1 }}>
                                <Textinput
                                    editable={false}
                                    value={startDate}
                                    placeholder={'Please Select Start Date'}
                                />
                            </View>
                            <Ionicons name={"calendar"} size={24} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <CommonText showText={'End Date'} fontSize={14} />
                        <TouchableOpacity style={[styles.inputWrapper, styles.wrapper]} onPress={showEndDatePicker}>
                            <View style={{ flex: 1 }}>
                                <Textinput
                                    editable={false}
                                    value={endDate}
                                    placeholder={'Please Select End Date'}
                                />
                            </View>
                            <Ionicons name={"calendar"} size={24} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <CommonText showText={'Number of Transaction'} />
                        <View style={[styles.inputWrapper, styles.wrapper]}>
                            <View style={{ flex: 1 }} fontSize={14}>
                                <Textinput value={noTrans} placeholder={'Please Enter Number of Transactions'} onChange={setNoTrans} keyboardType={'numeric'} />
                            </View>
                            <Ionicons name={"copy"} size={24} style={{ marginLeft: 10 }} />
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <WhiteButton showText={'Cancel'} style={{ flex: 1, marginRight: 5 }} onPress={onClosePress} />
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Button showText={'Show'} onPress={onPress} />
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
        padding: 15,
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