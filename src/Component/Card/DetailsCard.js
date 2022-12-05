import { View, StyleSheet, TouchableOpacity, useColorScheme, Platform, Linking } from 'react-native'
import React, { useMemo } from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { scale } from 'react-native-size-matters'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'
import { useSelector, useDispatch } from 'react-redux'
import * as ApiAction from '../../Services/Api'
import { AddToRedux } from '../../Redux/AddToRedux'
import * as Types from '../../Redux/Types'

const DetailsCard = ({ chargerType, onPress, item, favourite, location }) => {

    let favChargers = useSelector((state) => state.commonReducer.favCharger);
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    const scheme = useColorScheme()

    const checkFav = useMemo(() => {
        return favChargers?.findIndex(e => e.location_id === (item.location_id || item.id)) >= 0 ? true : false
    });

    const dispatch = useDispatch()

    const addFav = async () => {

        const result = await ApiAction.addFavouriteCharger(mUserDetails.username, item.location_id || item.id)

        if (result.data.result == 'ok') {
            dispatch(AddToRedux([...favChargers, { location_id: item.id, ...item }], Types.FAVCHARGER))
        }
    }

    const removeFav = async () => {
        const result = await ApiAction.deleteFavouriteCHarger(mUserDetails.username, item?.location_id || item?.id)
        if (result.data.success == 'true') {
            dispatch(AddToRedux(favChargers?.filter(e => e.location_id != (item.location_id || item.id)), Types.FAVCHARGER))
        }
    }

    const navigateToGoogleMap = (latlong) => {
       
        if (latlong?.latitude) {
            const lat = {
                lat: parseFloat(latlong?.latitude),
                long: parseFloat(latlong?.longitude),
            }.lat;
            const lng = {
                lat: parseFloat(latlong?.latitude),
                long: parseFloat(latlong?.longitude),
            }.long;
            const scheme = Platform.select({
                ios: "maps:0,0?q=",
                android: "geo:0,0?q=",
            });
            const latLng = `${lat},${lng}`;
            const label = item.name;
            const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
            });
            Linking.openURL(url);
        }

    }
    return (
        <TouchableOpacity onPress={onPress}>
            <CommonCard>
                <>
                    <View style={styles.innerContainer}>
                        <View>
                            <CommonText showText={item?.name} fontSize={16} />
                            <CommonText fontSize={12} customstyles={{ color: item?.summary?.aggregatedStatus === 'AVAILABLE' ? colors.green : item?.summary?.aggregatedStatus === 'CHARGING' ? colors.red : item?.summary?.aggregatedStatus === 'OCCUPIED' ? colors.red : "#D25564" }}>{item?.summary?.aggregatedStatus}</CommonText>
                            < CommonText fontSize={12} showText={item?.AccessDetails?.chargetType} />
                            {
                                item?.BusineessTime?.map((i, index) => {
                                    return < CommonText fontSize={12} showText={`${i?.startTime} - ${i?.endTime}`} />
                                })
                            }
                        </View>
                        <View style={styles.leftContainer}>
                            <CommonCard margin={1} padding={8}>
                                <TouchableOpacity onPress={checkFav ? removeFav : addFav} >
                                    {checkFav ? <AntDesign name='heart' color={scheme == 'dark' ? colors.svgColorDark : colors.red} size={18} /> : <AntDesign name='hearto' color={scheme == 'dark' ? colors.svgColorDark : colors.svgColor} size={18} />}
                                </TouchableOpacity>
                            </CommonCard>
                            <CommonCard marginLeft={10} margin={1} padding={8} backgroundColor={'#3070CE'}>
                                <TouchableOpacity style={styles.leftIcon} onPress={()=>navigateToGoogleMap(item)}>
                                    <Feather name='corner-up-right' size={18} color={colors.white} />
                                </TouchableOpacity>
                            </CommonCard>
                        </View>
                    </View>
                    <View style={[styles.innerContainer1, { borderColor: scheme == 'dark' ? colors.borderColorDark : colors.borderColor }]}>
                        <View style={styles.longText}>
                            {favourite ? <CommonText fontSize={12} showText={`${item?.address2?.city} ${item?.address2?.street} ${item?.address2?.postalCode}`} /> : <CommonText fontSize={12} showText={`${item?.address?.city} ${item?.address?.street} ${item?.address?.postalCode}`} />}

                        </View>
                        <CommonText fontSize={12} showText={`${item?.distance} Km`} />
                    </View>
                    {/* {chargerType == 1 && <HorizontalCard />}
                    {chargerType == 2 && <VerticalCard />} */}
                </>
            </CommonCard>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: "#ffff"
    },
    innerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    innerContainer1: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 12,

    },
    leftIcon: {
        // elevation: 10,
        // backgroundColor: '#3070CE',
        // padding: 8,
        // borderRadius: 12,
        // margin: 1,
        // marginLeft: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    longText: {
        width: scale(230),
        flexDirection: 'row',
        alignItems: 'center'
    },

})

export default DetailsCard
