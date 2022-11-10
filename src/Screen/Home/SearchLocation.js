import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, Text, TextInput, ScrollView, RefreshControl, FlatList } from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux'
import NoData from '../../Component/NoDataFound/NoData'

const SearchLocation = ({ route }) => {
    const serachData = useSelector((state) => state.addSearchLocationReducer.searchItem)
    const dispatch = useDispatch()
    route.params.getLocationAndAnimate
    const navigation = useNavigation()
    const scheme = useColorScheme()
    const [showSearchText, setShowSearchText] = useState('')

    const animateToRegionMap = (region) => {
        route.params.searchedLocation({ lat: JSON.parse(region).lat, lng: JSON.parse(region).lng })
    }

    const locationCardHandler = () => {
        navigation.navigate(routes.dashboard)
    }

    const liveLocationHAndler = () => {
        route.params.getLocationAndAnimate()
        navigation.goBack()
    }

    return (
        <CommonView>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <CommonCard>
                        <TouchableOpacity style={styles.backBtn}
                            onPress={() => { navigation.goBack() }}>
                            <AntDesign name='left' size={22} color={scheme == 'dark' ? colors.white : colors.black} />
                        </TouchableOpacity>
                    </CommonCard>
                </View>
                <View style={{ width: '80%', flex: 1, position: 'absolute', left: 60, zIndex: 999 }}>
                    <NeomorphFlex
                        inner // <- enable shadow inside of neomorph
                        swapShadows // <- change zIndex of each shadow color
                        style={{
                            shadowRadius: 3, borderRadius: 12, backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight, marginVertical: 10, padding: 5,
                        }}>
                        <View style={{}}>
                            <GooglePlacesAutocomplete
                                placeholder='Search'
                                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                                fetchDetails={true} // you need this to fetch the details object onPress

                                textInputProps={{
                                    onChangeText: (text) => { }
                                }}
                                onPress={(data, details = null) => {
                                    dispatch({
                                        type: 'ADD_TO_SEARCH',
                                        payload: { data }
                                    })
                                    if (details && details.geometry && details?.geometry?.location) {
                                        animateToRegionMap(JSON.stringify(details?.geometry?.location))
                                        navigation.goBack()
                                    }
                                }}
                                onFail={error => console.log(error, '........err')}
                                onNotFound={() => console.log('no results')}
                                query={{
                                    key: appconfig.MAPS_KEY,
                                    language: 'en',
                                }}
                                styles={{
                                    container: { flex: 1, },
                                    textInput: { height: 38, color: '#5d5d5d', fontSize: 16, },
                                    predefinedPlacesDescription: { color: '#1faadb', },
                                    textInput: { backgroundColor: colors.lightBackGround, height: 44, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, fontSize: 15, flex: 1, },
                                    row: { backgroundColor: colors.lightBackGround, padding: 13, height: 40, flexDirection: 'row', }
                                }}
                            />
                        </View>
                    </NeomorphFlex>
                </View>
                <TouchableOpacity onPress={liveLocationHAndler} style={styles.locationContainer}>
                    <CommonCard>
                        <TouchableOpacity >
                            <LocationSvg fill={scheme == 'dark' ? 'white' : 'black'} />
                        </TouchableOpacity>
                    </CommonCard>
                    <CommonText showText={'Current Location Using GPS'} fontSize={15} />
                </TouchableOpacity>
                <View style={[styles.searchList, {flex:1}]}>
                    <CommonText showText={'Recent Searches'} fontSize={18} customstyles={{ paddingHorizontal: 12 }} />
                    {serachData?.length > 0 ?
                        <FlatList
                            data={serachData}
                            // refreshControl={<RefreshControl onRefresh={refetch} />}
                            keyExtractor={item => item.id}
                            renderItem={(item) => {
                                return (
                                    <CommonCard>
                                        <TouchableOpacity style={styles.card} onPress={locationCardHandler}>
                                            <CommonIconCard Svg={Location1Svg} />
                                            <View style={styles.cardInner}>
                                                <CommonText showText={item?.item?.data?.structured_formatting?.main_text} fontSize={16} />
                                                {/* <CommonText showText={'Shake Mafia'} fontSize={13} /> */}
                                            </View>
                                        </TouchableOpacity>
                                    </CommonCard>
                                )
                            }
                            }
                        /> :
                        <NoData showText={'No Search Found'} />
                    }

                </View>
            </View>

        </CommonView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        marginVertical: 15,
        flex:1
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
    },
    cardInner: {
        marginLeft: 10
    }
})


export default SearchLocation