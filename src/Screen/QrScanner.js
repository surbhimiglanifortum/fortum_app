import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity, Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { qrCodeService } from '../Services/Api';
import { useSelector } from 'react-redux';

export default function QrScanner() {


    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const username = mUserDetails?.username
    const payload = {
        username: username
    }

    const onSuccess = async (e) => {
        console.log(typeof (e))
        console.log(JSON.parse(e.data).locid, '............id')
        const res = await qrCodeService(JSON.parse(e.data).locid, payload)
        console.log(res.data, '...............res')

    };

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
