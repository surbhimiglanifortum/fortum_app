import { View, Modal, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../Button/Button'
import CommonText from '../Text/CommonText'
import { AirbnbRating } from 'react-native-ratings';
import Textinput from '../Textinput/Textinput'
import CommonView from '../../Component/CommonView'
import CommonCard from '../../Component/Card/CommonCard'
import { useSelector } from 'react-redux'
import * as ApiAction from '../../Services/Api'
import SnackContext from '../../Utils/context/SnackbarContext'

var ratings = 3

const RatingModal = ({ isModalVisible, setShowFeedbackModel }) => {
    const scheme = useColorScheme()
    const [review, setReview] = useState("");
    const [loadingSign, setLoadingSign] = useState(false)

    const mUserDetails = useSelector((state) => state.userTypeReducer.userDetails)

    const { setOpenCommonModal } = useContext(SnackContext);


    const okayBtnHandler = async () => {
        // openCommonModal?.onOkPress()
        // setShowFeedbackModel({ "isVisible": false, "locid": "", "evseid": "", onPress: () => { } })
        if (review == '') {
            setOpenCommonModal({
                isVisible: true, message: "Please add your feedback!!!", onOkPress: () => { }
            })
            return
        }

        const payload = {
            "locid": isModalVisible.locid || "SDS",
            "evseid": isModalVisible.evseid || "SDS",
            "stars": ratings || 3,
            "desc": review || "SADSDSD",
            "user": mUserDetails?.username || "res2GMAIL.COM"
        }

        setLoadingSign(true)
        try {
            const response = await ApiAction.feedback(payload)

            console.log("Req saved", response.data)
            if (response.data.result == "ok") {
                setOpenCommonModal({
                    isVisible: true, message: "Your feedback has been saved", onOkPress: () => { }
                })
                setShowFeedbackModel({ "isVisible": false, "locid": "", "evseid": "" })
                setLoadingSign(false)
            } else {
                setShowFeedbackModel({ "isVisible": false, "locid": "", "evseid": "" })
                setLoadingSign(false)
                setOpenCommonModal({
                    isVisible: true, message: "Failed to save Feedback", onOkPress: () => { }
                })
            }
        } catch (error) {
            setLoadingSign(false)
            setOpenCommonModal({
                isVisible: true, message: error, onOkPress: () => { }
            })
        }

    }

    const onFinishRating = (data) => {
        ratings = data
    }

    return (
        <Modal visible={isModalVisible.isVisible} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <CommonView style={[styles.innerContainer]}>
                    <View style={styles.wrapContainer}>
                        <View style={styles.header}>
                            <CommonText showText={'How was your charging exprerience today?'} fontSize={20} />
                            <TouchableOpacity style={styles.crossBtn} onPress={() => { setShowFeedbackModel({ "isVisible": false, "locid": "", "evseid": "" }) }}>
                                <CommonCard >
                                    <AntDesign name='close' size={20} />
                                </CommonCard>
                            </TouchableOpacity>
                        </View>
                        <AirbnbRating onFinishRating={onFinishRating} defaultRating={ratings} />
                        <CommonText showText={'Tell us more'} />
                        <Textinput value={review} onChange={setReview} />
                        <View>
                            <Button onLoading={loadingSign} showText={'Submit'} onPress={okayBtnHandler} />
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
    },
    centerText: {
        marginVertical: 50,
        alignSelf: 'center'
    }
})


export default RatingModal