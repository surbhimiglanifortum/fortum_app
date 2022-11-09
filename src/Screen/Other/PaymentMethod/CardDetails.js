import { SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { initialize, PinePerksCardView, setPinePerksSecrets } from 'react-native-pine-perks'
import { getEncryptData } from '../../../Services/Api'
import { useSelector } from 'react-redux';

const CardDetails = () => {
    let encyptKey = ''

    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails)

    useEffect(() => {
        initialize('https://apiuat.pineperks.in', async function (key) {
            console.log("response key", key)
            encyptKey = key
            try {
                const payload = {
                    response_key: encyptKey,
                    username: mUserDetails.username
                }
                console.log("SDOJASD", payload)
                const result = await getEncryptData(payload)
                console.log('Result in encryptedData', result.data)
                const res = setPinePerksSecrets(result.data.encrypt_response_key, result.data.encrypt_reference, "WttVcvlC5uKxlHeRKNP34g==")
                console.log("Result after setPinePerksSecrets", res)
            } catch (error) {
                console.log("Error in encryptedData", error)
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <PinePerksCardView
                cardContainerStyle={{ display: 'flex', flexDirection: "column" }}
                cardBackgroundImage={require('../../../assests/prepaidCard.jpg')}
                cardImageStyle={{ width: '100%', resizeMode: 'contain', height: 250, marginTop: 0 }}
                cardNumberStyle={{ marginTop: 110, marginLeft: 19 }}
                expiryTextStyle={{ marginTop: -5, marginLeft: 19, fontSize: 12 }}
                cvvTextStyle={{ marginTop: -5, fontSize: 12, textAlign: 'center' }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    }
})

export default CardDetails