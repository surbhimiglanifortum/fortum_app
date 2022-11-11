import React, { useEffect, useState } from 'react'
import { View, Modal, StyleSheet, Linking } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { differenceInDays } from 'date-fns'
import { AddToRedux } from '../../Redux/AddToRedux';
import * as TYPES from '../../Redux/Types'
import colors from '../../Utils/colors';
import GlobalDefines from '../../Utils/globalDefines';
import { getTncVersion, acceptTnc } from '../../Services/Api'
import CommonText from '../Text/CommonText';
import Button from '../Button/Button';
import CommonView from '../CommonView'

const TNCNotificationDialog = (props) => {

    const dispatch = useDispatch();
    const [isVisible, showVisible] = useState(false)

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const tnc_last_called = useSelector((state) => state.commonReducer.tnc_last_called);

    console.log("Check Props", props.tncNotification, mUserDetails?.username)

    useEffect(() => {
        refreshTNC()
    }, [props.tncNotification])


    useEffect(() => {
        refreshTNC()
    }, [])

    const refreshTNC = () => {
        setTimeout(async () => {
            console.log("tnc_last_called", tnc_last_called)
            if (mUserDetails?.username) {
                let refershTnc = false
                if (!tnc_last_called) {
                    refershTnc = true
                } else {
                    let diffDay = differenceInDays(new Date(), new Date(tnc_last_called))
                    if (diffDay >= 1) {
                        refershTnc = true
                    }
                }
                if (refershTnc) {
                    // refetch TNC 
                    const result = await getTncVersion(mUserDetails?.username)
                    console.log("tncversion", result.data)
                    if (result.data?.showdialog) {
                        // show accept Alert
                        showVisible(true)
                    }
                }
            }

        }, 3000);

    }

    const accept = async () => {
        await acceptTnc(mUserDetails?.username)
        dispatch(AddToRedux(new Date().toString(), TYPES.UPDATE_TNC_LAST_CALLED))
        showVisible(false)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            style={{ flex: 1, zIndex: 99999 }}
        >
            <View style={[styles.centeredView]}>
                <CommonView style={styles.modalView} isFlex={false}>
                    <View style={styles.wrapper}>
                        <CommonText style={styles.heading} showText={'Terms & Conditions'} fontSize={18} />
                        <CommonText customstyles={styles.subHeading}>Please accept the updated <CommonText onPress={() => { Linking.openURL(GlobalDefines.tncURL) }} customstyles={{ color: colors.blue }} >Terms and conditions</CommonText> and
                            <CommonText onPress={() => { Linking.openURL(GlobalDefines.privacyURL) }} customstyles={{ color: colors.blue }}> Privacy Policy</CommonText>.  </CommonText>
                    </View>
                    <View>
                        <Button showText={'Accept'} onPress={() => accept()} />
                    </View>
                </CommonView>
            </View>
        </Modal >
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
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    heading: {
        color: colors.black,
        fontSize: 20,
    },
    text: {
        color: colors.grey,
    },
    subHeading: {
        color: colors.greyText,
        fontSize: 16,
        padding: 10
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    webView: {
        marginTop: 20,
        borderWidth: 5
    }
})

export default TNCNotificationDialog