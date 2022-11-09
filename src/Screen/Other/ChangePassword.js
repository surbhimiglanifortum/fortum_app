import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'

const ChangePassword = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <View style={styles.header}>
                        <BackButton />
                        <View style={styles.headerText}>
                            <CommonText showText={'ChangePassword'} fontSize={20} />
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Old Password'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'New Password'} fontSize={12} />
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        <CommonText showText={'Confirm Password'} fontSize={12} />
                        <Textinput />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} >
                <Button showText={'Save'} />
            </TouchableOpacity>
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
    header: {
        flexDirection: 'row',

    },
    headerText: { alignItems: 'center', marginLeft: 70 },
    textinputConatiner: {
        marginVertical: 15
    },
    button: {
       marginHorizontal:15
    },
})

export default ChangePassword