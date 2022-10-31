import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LocationSvg from '../../assests/svg/LocationSvg'
import IconCard from '../../Component/Card/IconCard'
import Location1Svg from '../../assests/svg/Location1Svg'
import routes from '../../Utils/routes'
import CommonText from '../../Component/Text/CommonText'

const SearchLocation = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [searchText, setSearchText] = useState('')
    const locationCardHandler = () => {
        navigation.navigate(routes.dashboard)
    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                            <AntDesign name='left' size={22} />
                        </TouchableOpacity>
                        <View style={styles.searchContainer} >
                             <View style={styles.leftInner}>
                                <AntDesign name='search1' size={20} />
                                <TextInput placeholder='Your Location' value={searchText} onChangeText={(val) => { setSearchText(val) }} />
                            </View>
                            <TouchableOpacity onPress={() => { setSearchText('') }}>
                                <AntDesign name='close' size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <TouchableOpacity style={styles.location}>
                            <LocationSvg />
                        </TouchableOpacity>
                        <CommonText showText={'Current Location Using GPS'} fontSize={15} />
                    </View>
                    <View style={styles.searchList}>
                        <CommonText showText={'Recent Searches'} fontSize={18} />
                        <TouchableOpacity style={styles.card} onPress={locationCardHandler}>
                            <IconCard Svg={Location1Svg} />
                            <View style={styles.cardInner}>
                                <CommonText showText={'Shake Mafia'} fontSize={16} />
                                <CommonText showText={'Shake Mafia'} fontSize={13} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 15
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backBtn: {
        backgroundColor: colors.white,
        paddingVertical: 8,
        // paddingHorizontal:8,
        width: '12%',
        borderRadius: 6,
        alignItems: 'center'
        // marginRight:5
    },
    searchContainer: {
        width: '85%',
        backgroundColor: colors.white,
        // paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    location: {
        backgroundColor: colors.white,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 5,
        marginRight: 10
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    searchList: {
        marginTop: 20
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 10,
        elevation: 5
    },
    cardInner: {
        marginLeft: 10
    }
})


export default SearchLocation