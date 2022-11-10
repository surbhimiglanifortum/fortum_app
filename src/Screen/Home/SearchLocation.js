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
import CommonView from '../../Component/CommonView/index'
import CommonCard from '../../Component/Card/CommonCard/index'
import DenseCard from '../../Component/Card/DenseCard/index'
import Textinput from '../../Component/Textinput/Textinput'
import { NeomorphFlex } from 'react-native-neomorph-shadows'
import CommonIconCard from '../../Component/Card/CommonIconCard/CommonIconCard'
import appconfig from '../../Utils/appconfig'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const SearchLocation = () => {

    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [showSearchText, setShowSearchText] = useState(false)

    const animateToRegionMap = (region) => {
        // console.log("animate",region,region.lat)
        mapRef.current.animateToRegion({
            latitude: region.lat,
            longitude: region.lng,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025
        }, 2000);
    }

    const [searchText, setSearchText] = useState('')
    const locationCardHandler = () => {
        navigation.navigate(routes.dashboard)
    }
    return (
        <CommonView>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <CommonCard>
                            <TouchableOpacity style={styles.backBtn}
                                onPress={() => { navigation.goBack() }}>
                                <AntDesign name='left' size={22} color={scheme == 'dark' ? colors.white : colors.black} />
                            </TouchableOpacity>
                        </CommonCard>
                        {/* <DenseCard padding={4}>
                            <View style={styles.searchContainer} >
                                <View style={styles.leftInner}>
                                    <AntDesign name='search1' size={20} />
                                    <TextInput placeholder='Your Location' value={searchText} onChangeText={(val) => { setSearchText(val) }} />
                                </View>
                                <TouchableOpacity onPress={() => { setSearchText('') }}>
                                    <AntDesign name='close' size={20} />
                                </TouchableOpacity>
                            </View>
                        </DenseCard> */}
                        <View style={{ width: '80%' }}>
                            <NeomorphFlex
                                inner // <- enable shadow inside of neomorph
                                swapShadows // <- change zIndex of each shadow color
                                style={{

                                    shadowRadius: 3,
                                    borderRadius: 12,
                                    backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight,
                                    // margin: 10,
                                    marginVertical: 10,
                                    padding: 5,
                                }}
                            >

                                <View style={{ flex: 1, borderWidth: 1 }}>
                                    <GooglePlacesAutocomplete
                                        placeholder='Search'
                                        onPress={(data, details = null) => console.log(data, details,'.........')}
                                        onFail={error => console.log(error,'........err')}
                                        onNotFound={() => console.log('no results')}
                                        query={{
                                            key: appconfig.MAPS_KEY,
                                            language: 'en',
                                        }}

                                        styles={{
                                            container: {
                                                flex: 1,
                                              },
                                            textInput: {
                                                height: 38,
                                                color: '#5d5d5d',
                                                fontSize: 16,
                                            },
                                            predefinedPlacesDescription: {
                                                color: '#1faadb',
                                            },
                                            textInput: {
                                                backgroundColor: '#fff',
                                                height: 44,
                                                borderRadius: 5,
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                fontSize: 15,
                                                flex: 1,
                                            },
                                        }}
                                    />


                                    {/* <GooglePlacesAutocomplete
                                        placeholder='Search'
                                        fetchDetails={true}

                                        renderRightButton={() =>
                                            <TouchableOpacity onPress={() => { setSearchText('') }}>
                                                <AntDesign name='close' size={20} />
                                            </TouchableOpacity>
                                        }
                                        enablePoweredByContainer={false}
                                        onPress={(data, details = null) => {
                                            console.log(data, '..........data')
                                            console.log(details, '..........details')
                                            if (details && details.geometry && details.geometry.location) {
                                                animateToRegionMap(details.geometry.location)
                                            }
                                        }}

                                        query={{
                                            key: appconfig.MAPS_KEY,
                                            language: 'en',
                                            components: 'country:in',
                                        }}


                                    /> */}
                                </View>








                                {/* <View style={styles.header}>
                                    <View style={styles.leftInner}>
                                        <AntDesign name='search1' size={20} />
                                        <TextInput placeholder='Your Location' value={searchText} onChangeText={(val) => { setSearchText(val) }} />
                                    </View>
                                    <TouchableOpacity onPress={() => { setSearchText('') }}>
                                        <AntDesign name='close' size={20} />
                                    </TouchableOpacity>
                                </View> */}
                            </NeomorphFlex>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <CommonCard>
                            <TouchableOpacity>
                                <LocationSvg fill={scheme == 'dark' ? 'white' : 'black'} />
                            </TouchableOpacity>
                        </CommonCard>
                        <CommonText showText={'Current Location Using GPS'} fontSize={15} />
                    </View>
                    <View style={styles.searchList}>
                        <CommonText showText={'Recent Searches'} fontSize={18} />
                        <CommonCard>
                            <TouchableOpacity style={styles.card} onPress={locationCardHandler}>
                                <CommonIconCard Svg={Location1Svg} />
                                <View style={styles.cardInner}>
                                    <CommonText showText={'Shake Mafia'} fontSize={16} />
                                    <CommonText showText={'Shake Mafia'} fontSize={13} />
                                </View>
                            </TouchableOpacity>
                        </CommonCard>
                    </View>
                </View>
            </ScrollView>
        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        marginVertical: 15
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    backBtn: {
        paddingVertical: 8,
        borderRadius: 6,
    },
    searchContainer: {
        width: '63%',
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftInner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
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
        // backgroundColor: colors.white,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        // borderRadius: 6,
        // marginTop: 10,
        // elevation: 5
    },
    cardInner: {
        marginLeft: 10
    }
})


export default SearchLocation