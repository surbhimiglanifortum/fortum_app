import { View, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Button from '../../../Component/Button/Button'
import routes from '../../../Utils/routes'
import BackButton from '../../../Component/Button/BackButton'
import IconCard from '../../../Component/Card/IconCard'
import WalletSvg from '../../../assests/svg/wallet'
import BlackText from '../../../Component/Text/BlackText'
import IconCardLarge from '../../../Component/Card/IconCardLarge'
import BlueText from '../../../Component/Text/BlueText'

const FortumChargeAndDriveCard = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const actiavteButtonHAndler = () => {
        navigation.navigate(routes.ActivateCard)
    }
    const passbookButtonHAndler = () => {
        navigation.navigate(routes.Passbook)
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}

                    <View style={styles.headerCon}>
                        <BackButton />
                        <CommonText showText={'Fortum Charge & Drive Card'} fontSize={20}  />
                    </View>
                   { false&&<>
                    <View style={styles.headerText}>
                        <CommonText showText={'Activate your prepaid card by following ew steps. Today!'} fontSize={15} />
                    </View>
                    <View style={styles.headerText}>
                        <CommonText showText={'Accepted at all merchant outlets & can be used for online Ecom transaction'} fontSize={15} />
                    </View>
                   </>}
                   <View style={{marginTop:20}}>
                    <TouchableOpacity style={styles.card}>
                        <IconCardLarge Svg={WalletSvg} />
                        <BlackText showText={'View Card Details'} fontSize={20} margin={10} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <IconCardLarge Svg={WalletSvg} />
                        <BlackText showText={'Add Money'} fontSize={20} margin={10} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={passbookButtonHAndler}>
                        <IconCardLarge Svg={WalletSvg} />
                        <BlackText showText={'Passbook'} fontSize={20} margin={10} />
                    </TouchableOpacity>
                   </View>
                   <View style={styles.centerText}>
                   <CommonText  showText={'View'} fontSize={16} />
                   <BlueText showText={'Terms And Condition'} fontSize={16} />
                   </View>
                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                <Button showText={'Activate'} onPress={actiavteButtonHAndler} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
    headerText: {
        marginTop: 30,

    },
    btnContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    headerCon:{
        flexDirection:'row',
        alignItems:'center'
    },
    centerText:{
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        marginVertical:20
    },
    card:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:10,
        borderRadius:6,
        backgroundColor:colors.white,
        marginVertical:15,
        
    }
})


export default FortumChargeAndDriveCard