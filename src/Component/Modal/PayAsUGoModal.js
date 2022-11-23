import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../../Utils/colors";
import { getPaymentOption } from '../../Services/Api'
import { useSelector } from 'react-redux'

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
        >
            <View style={[styles.centeredView, { backgroundColor: bgStyle }]}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={cancelClick} style={{ zIndex: 9999 }}>
                        {/* <FontIcon name="cross" color={AppColors.ModerateBlue} size={30} style={styles.fontIcon} /> */}
                    </TouchableOpacity>
                    <Text style={styles.subheading}>{'Something went wrong'}</Text>
                    <View style={styles.divider} />
                    <View style={styles.wrapper}>
                        <Text style={[styles.subheading, { marginBottom: 0 }]}>{'Do you want to restart the session?'}</Text>
                        <Text style={styles.subheading}>{'Remove the connector and insert the charging gun again.'}</Text>

                        <TouchableOpacity onPress={onRestartClick} style={styles.restartBtn}>
                            <Text style={styles.restartBtnTxt}>{'Restart'}</Text>
                        </TouchableOpacity>

                        <Text style={[styles.subheading, { color: colors.blue }]}>{`Your last charging cost is Rs. ${chargingCost}`}</Text>
                        {
                            walletAllow &&
                            <TouchableOpacity onPress={onWalletClick} style={styles.walletBtn}>
                                {loadingWallet && <ActivityIndicator color={"black"} />}
                                {!loadingWallet && <Text style={styles.walletBtnTxt}>{`Add balance Rs. ${remainingCost} to wallet`}</Text>}
                            </TouchableOpacity>
                        }

                        <TouchableOpacity onPress={onRefundClick} style={styles.refundBtn}>
                            {loadingRefund && <ActivityIndicator color={"black"} />}
                            {!loadingRefund && <Text style={styles.closeText}>{`Refund Rs.${remainingCost}`}</Text>}
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
    },
    modalView: {
        margin: 20,
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
        elevation: 5
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
        color: colors.blue,
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
        borderColor: colors.blue,
        padding: 5,
        borderRadius: 20,
    },
    restartBtn: {
        backgroundColor: colors.blue,
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
        backgroundColor: colors.blue,
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