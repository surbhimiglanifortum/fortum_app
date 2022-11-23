import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { qrCodeService, chargingList } from '../../Services/Api';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes';
import SnackContext from '../../Utils/context/SnackbarContext';

export default function QrScanner() {

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const checkActiveSession = useSelector((state) => state.TempStore.checkActiveSession);

    const { setOpenCommonModal } = useContext(SnackContext);

    const navigation = useNavigation()

    const username = mUserDetails?.username
    const payload = {
        username: username
    }

    const onSuccess = (e) => {
        qrCodeService(JSON.parse(e.data).locid, payload).then((r) => {
            let allEvse = r.data?.evses
            for (let i = 0; i < allEvse.length; i++) {
                if (allEvse[i].uid === JSON.parse(e.data).evid) {
                    console.log("Received", allEvse[i]?.status)
                    if (allEvse[i]?.status == 'AVAILABLE') {
                        navigation.replace(routes.PayMinimum, {
                            locid: JSON.parse(e.data).locid,
                            evid: JSON.parse(e.data).evid,
                            name: r.data.name + " - " + allEvse[i].evse_id.replace("IN*CNK*", "").replace(/\*/g, '\-'),
                            evDetails: allEvse[i],
                            callFrom: 'QrScanner'
                        })
                    }
                    if (allEvse[i]?.status == 'CHARGING') {
                        CallCheckActiveSession()
                    }
                    else {
                        setOpenCommonModal({
                            isVisible: true, message: "Connector is not available.", onOkPress: () => {
                                navigation.goBack()
                            }
                        })
                    }

                    break;
                }
            }
        }).catch((error) => {
            console.log("Error in QR Scanner", error)
            setOpenCommonModal({
                isVisible: true, message: "Unable to find charger.", onOkPress: () => {
                    navigation.goBack()
                }
            })
        })
    };

    const CallCheckActiveSession = async () => {
        if (mUserDetails?.username) {
            const response = await chargingList(mUserDetails.username)
            console.log("Check Response of CallCheckActiveSession two", response.data)
            if (response.data && response.data.length > 0) {
                // setOpenCommonModal({
                //     isVisible: true, message: `You have an ongoing charging session at Charger ${response.data[0]?.location?.name} please stop the session if you have done charging!`,
                //     heading: "Ongoing Session",
                //     secondButton: {
                //         onPress: () => {

                //         },
                //         title: "Ignore"
                //     },

                //     onOkPress: () => {
                navigation.replace(routes.OngoingDetails, {
                    locDetails: {
                        ...response.data[0]?.location, address: {
                            "city": response.data[0]?.location?.city,
                            "street": response.data[0]?.location?.address,
                            "countryIsoCode": "IND",
                            "postalCode": "11112"
                        }
                    },
                    evDetails: response.data[0]?.location?.evses[0],
                    paymentMethod: response?.payments?.payment_method
                })
            }
            // })
            // }
            dispatch(AddToRedux(false, Types.CHECKACTIVESESSION))
        }
    }


    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}

        />
    )
}


const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
