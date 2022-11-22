import React, { useEffect, useState } from 'react'
import { initialize, PinePerksCardView, setPinePerksSecrets } from 'react-native-pine-perks'
import { getEncryptData } from '../../../Services/Api'
import { useSelector } from 'react-redux';
import CommonView from '../../../Component/CommonView'
import Header from '../../../Component/Header/Header';
import { StyleSheet } from 'react-native'
import { updateCardStatus } from '../../../Services/Api'
import SwitchButton from '../../../Component/Button/SwitchButton';
import CommonText from '../../../Component/Text/CommonText';
import { View } from 'react-native'

const CardDetails = () => {
    let encyptKey = ''

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails)
    const [isEnabled, setIsEnabled] = useState(mUserDetails?.pinelabs_card_conf?.CardStatus === 'Active' ? true : false);

    useEffect(() => {
        initialize('https://apiuat.pineperks.in', async function (key) {
            encyptKey = key
            try {
                const payload = {
                    response_key: encyptKey,
                    username: mUserDetails?.username,
                    card_ref: mUserDetails?.pinelabs_card_conf?.referenceNumber.toString()
                }
                const result = await getEncryptData(payload)
                const res = setPinePerksSecrets(result.data.encrypt_response_key, result.data.encrypt_reference, result.data.username)
            } catch (error) {
                console.log("Error in encryptedData", error)
            }
        })
    }, [])

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const cardStatusUpdate = async () => {
        try {
            let payload = {}
            if (isEnabled) {
                payload = {
                    username: mUserDetails?.username,
                    cardStatus: "Active"
                }
            } else {
                payload = {
                    username: mUserDetails?.username,
                    cardStatus: "Block"
                }
            }
            const result = await updateCardStatus(payload)
        } catch (error) {
            console.log("Pinelab Card Staus Error", error)
        }
    }

    useEffect(() => {
        cardStatusUpdate()
    }, [isEnabled])

    return (
        <CommonView style={styles.container}>
            <Header showText={'Card Details'} />
            <View  style={{alignContent:'center',marginLeft:10}}>
                <PinePerksCardView
                    cardContainerStyle={{ justifyContent:'center',justifyContent:'center',alignContent:'center'}}
                    cardBackgroundImage={require('../../../assests/card.jpg')}
                    cardImageStyle={{ width: '100%', resizeMode: 'contain', height: 250, marginTop: 0 }}
                    cardNumberStyle={{ marginTop: 110, marginLeft: 19 }}
                    expiryTextStyle={{ marginTop: -5, marginLeft: 19, fontSize: 12 }}
                    cvvTextStyle={{ marginTop: -5,marginRight:130, fontSize: 12, textAlign: 'center' }}
                />
            </View>

            <View style={styles.row}>
                <CommonText showText={'Update Card Status'} />
                <SwitchButton onValueChange={toggleSwitch} value={isEnabled} />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default CardDetails