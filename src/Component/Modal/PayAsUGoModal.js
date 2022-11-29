import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../../Utils/colors";
import { getPaymentOption } from '../../Services/Api'
import { useSelector } from 'react-redux'
import CommonText from "../Text/CommonText";
import AntDesign from 'react-native-vector-icons/AntDesign'
const PayAsUGoModal = ({ modalVisible, bgStyle, onRefundClick, onRestartClick, onWalletClick, cancelClick, chargingCost, remainingCost, loadingRefund, loadingWallet }) => {

    const [walletAllow, setWalletAllow] = useState(false)

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    useEffect(() => {
        paymentOptions()
    }, [])

    const paymentOptions = async () => {
        try {
            const result = await getPaymentOption(mUserDetails?.username)
            if (result.data.result?.allPaymentOptions?.length > 0) {
                const tempAllowMethods = result.data.result?.allPaymentOptions
                const isWallet = tempAllowMethods.includes("CLOSED_WALLET")
                setWalletAllow(isWallet)
            }
        } catch (error) {
            console.log("getPaymentOption PayAsyougomodal catch block", error)
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
        >
            <View style={[styles.centeredView, { backgroundColor: bgStyle }]}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={cancelClick} style={{ position: 'absolute', right: 10, top: 15 }}>
                        <AntDesign name="close" size={25} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                        <CommonText showText={'Something went wrong'} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.wrapper}>
                        <View style={{ alignItems: 'center' }}>
                            <CommonText regular showText={'Do you want to restart the session?'} />
                            <CommonText regular showText={'Remove the connector and insert the charging gun again.'} customstyles={{ textAlign: 'center', marginVertical: 5 }} />
                        </View>
                        <TouchableOpacity onPress={onRestartClick} style={styles.restartBtn}>
                            <CommonText regular showText={'Restart'} customstyles={{ color: colors.white }} />
                        </TouchableOpacity>
                        <CommonText regular showText={`Your last charging cost is Rs. ${chargingCost}`} customstyles={{ textAlign: 'center', marginVertical: 8 }} />

                        {
                            walletAllow &&
                            <TouchableOpacity onPress={onWalletClick} style={styles.walletBtn}>
                                {loadingWallet && <ActivityIndicator color={"black"} />}
                                {!loadingWallet && <CommonText regular showText={`Add balance Rs. ${remainingCost} to wallet`} customstyles={{ color: colors.white, textAlign: 'center' }} />}
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={onRefundClick} style={styles.refundBtn}>
                            {loadingRefund && <ActivityIndicator color={"black"} />}
                            {!loadingRefund && <CommonText regular showText={`Refund Rs.${remainingCost}`} customstyles={{ color: colors.green, textAlign: 'center' }} />}
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth:1,

    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 10,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    heading: {
        fontSize: 20,
        color: colors.red,
    },
    subheading: {
        fontSize: 14,
        color: colors.black,
        marginBottom: 10,
        textAlign: 'center'
    },
    closeText: {
        color: colors.green,
        textAlign: 'center'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 20
    },
    refundBtn: {
        borderWidth: 1,
        borderColor: colors.green,
        padding: 5,
        borderRadius: 20,
    },
    restartBtn: {
        backgroundColor: colors.green,
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 5,
        elevation: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10
    },
    restartBtnTxt: {
        color: '#fff',
        fontSize: 16
    },
    walletBtn: {
        backgroundColor: colors.green,
        padding: 8,
        borderRadius: 20,
        marginBottom: 15
    },
    walletBtnTxt: {
        color: colors.white,
        textAlign: 'center'
    },
    fontIcon: {
        position: 'absolute',
        right: 5,
        top: -4,
        width: 30,
        height: 30,
        borderRadius: 15
    },
    divider: {
        height: 2,
        backgroundColor: colors.grey
    },
    wrapper: {
        padding: 35,
        paddingTop: 15
    }
});

export default PayAsUGoModal