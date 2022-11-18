import React, { useEffect } from 'react'
import { initialize, PinePerksCardView, setPinePerksSecrets } from 'react-native-pine-perks'
import { getEncryptData } from '../../../Services/Api'
import { useSelector } from 'react-redux';
import CommonView from '../../../Component/CommonView'
import Header from '../../../Component/Header/Header';
import { StyleSheet } from 'react-native'
import { updateCardStatus } from '../../../Services/Api'
import SwitchButton from '../../../Component/Button/SwitchButton';

const CardDetails = () => {
    let encyptKey = ''

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails)

    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        initialize('https://apiuat.pineperks.in', async function (key) {
            console.log("response key", key)
            encyptKey = key
            try {
                const payload = {
                    response_key: encyptKey,
                    username: mUserDetails?.username,
                    card_ref: mUserDetails?.pinelabs_card_conf?.referenceNumber
                }
                console.log("SDOJASD", payload)
                const result = await getEncryptData(payload)
                console.log('Result in encryptedData', result.data)
                const res = setPinePerksSecrets(result.data.encrypt_response_key, result.data.encrypt_reference, result.data.username)
                console.log("Result after setPinePerksSecrets", res)
            } catch (error) {
                console.log("Error in encryptedData", error)
            }
        })
    }, [])

    const cardStatusUpdate = async () => {
        try {
            setIsEnabled(previousState => !previousState)
            const payload = {
                username: mUserDetails?.username,
                cardStatus: isEnabled ? "Active" : "Block"
            }
            const result = await updateCardStatus()
        } catch (error) {

        }
    }

    return (
        <CommonView style={styles.container}>
            <Header showText={'Card Details'} />
            <PinePerksCardView
                cardContainerStyle={{ display: 'flex', flexDirection: "column" }}
                cardBackgroundImage={require('../../../assests/prepaidCard.jpg')}
                cardImageStyle={{ width: '100%', resizeMode: 'contain', height: 250, marginTop: 0 }}
                cardNumberStyle={{ marginTop: 110, marginLeft: 19 }}
                expiryTextStyle={{ marginTop: -5, marginLeft: 19, fontSize: 12 }}
                cvvTextStyle={{ marginTop: -5, fontSize: 12, textAlign: 'center' }}
            />

            <SwitchButton onValueChange={cardStatusUpdate} value={isEnabled} />
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default CardDetails