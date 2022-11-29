import React, { useContext } from 'react'
import OrderConfirm from '../../../Component/MajorComponents/OrderConfirm'
import SnackContext from '../../../Utils/context/SnackbarContext'
import { StyleSheet } from 'react-native'
import routes from '../../../Utils/routes'
import { useNavigation } from '@react-navigation/native'

const KycDone = ({ route }) => {

    const { setOpenCommonModal } = useContext(SnackContext);

    const navigation = useNavigation()

    const onOkPress = () => {
        setOpenCommonModal({
            isVisible: true, message: 'Please confirm if you have saved the pin else you will have to reset the pin.', onOkPress: () => {
                navigation.replace(routes.Pinelab, {
                    response: route.params?.response,
                    name: route.params?.name
                })
            }
        })
    }

    return (
        <OrderConfirm
            header={'Card Successfully Generated'}
            subHeading={`Below is the pin generated for your card for further transactions.\n \n Card Pin:${route.params?.pin} \n`}
            subHeadingStyle={styles.subHeading}
            btnText={'Okay'}
            onPress={onOkPress}
        />
    )
}

const styles = StyleSheet.create({
    subHeading: {
        textAlign: 'center',
        paddingHorizontal: 30
    }
})

export default KycDone