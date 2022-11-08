import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import routes from '../../../Utils/routes'
import CommonText from '../../../Component/Text/CommonText'
import ToggleCard from '../../../Component/Card/ToggleCard'
import Charger from '../../../assests/svg/charger'
import CommonView from '../../../Component/CommonView/index'
const Preference = () => {
    const navigation = useNavigation()
    const scheme = useColorScheme()
    const addEvModalBtnHandler = () => {
        navigation.navigate(routes.AddEvModal)
    }
    return (
        <CommonView>
            <View style={styles.innerContainer}>
                {/* <Header /> */}
                <Header showText={'Prefernce'} />

                <View style={styles.headerText}>
                    <CommonText showText={'Internal Marketing'} fontSize={20} customstyles={{marginLeft:12 }} />
                    <View style={{ marginVertical: 7 ,marginLeft:12 }}>
                        <CommonText showText={'Yes, I want to receive internal marketing communication via'} fontSize={15} />
                    </View>
                </View>
                <ToggleCard Svg={Charger} showText={'Email'} fontSize={16} />
                <ToggleCard Svg={Charger} showText={'Push Notifications'} fontSize={16} />
                <ToggleCard Svg={Charger} showText={'SMS'} fontSize={16} />
                <View style={styles.headerText}>
                    <CommonText showText={'External Marketing'} fontSize={20}  customstyles={{marginLeft:12 }} />
                    <View style={{ marginVertical: 7 ,marginLeft:12 }}>
                        <CommonText showText={'Yes, I want to receive internal marketing communication via'} fontSize={15} />
                    </View>
                </View>
                <ToggleCard Svg={Charger} showText={'Email'} fontSize={16} />
                <ToggleCard Svg={Charger} showText={'Push Notifications'} fontSize={16} />
                <ToggleCard Svg={Charger} showText={'SMS'} fontSize={16} />
            </View>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {

        marginTop: 20
    },
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
    headerText: {
        marginTop: 25,

    }
})

export default Preference