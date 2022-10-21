import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import BackButton from '../../Component/Button/BackButton'
import BlackText from '../../Component/Text/BlackText'
import CommonText from '../../Component/Text/CommonText'
import Textinput from '../../Component/Textinput/Textinput'
import Button from '../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
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
                            {scheme == 'dark' ? <CommonText showText={'Profile'} fontSize={25} /> : <BlackText showText={'Profile'} fontSize={25} />}
                        </View>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                    </View>
                    <View style={styles.textinputConatiner}>
                        {scheme == 'dark' ? <CommonText showText={'First Name'} fontSize={12} /> : <BlackText showText={'First Name'} fontSize={12} />}
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        {scheme == 'dark' ? <CommonText showText={'Last Name'} fontSize={12} /> : <BlackText showText={'Last Name'} fontSize={12} />}
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        {scheme == 'dark' ? <CommonText showText={'Email ID'} fontSize={12} /> : <BlackText showText={'Email ID'} fontSize={12} />}
                        <Textinput />
                    </View>
                    <View style={styles.textinputConatiner}>
                        {scheme == 'dark' ? <CommonText showText={'Mobile Number'} fontSize={12} /> : <BlackText showText={'Mobile Number'} fontSize={12} />}
                        <Textinput />
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Button  showText={'Save'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        marginTop: 130
    },
})

export default Profile