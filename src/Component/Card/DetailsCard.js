import { View, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { scale } from 'react-native-size-matters'
import CommonText from '../Text/CommonText'
import CommonCard from '../../Component/Card/CommonCard/index'

const DetailsCard = ({ chargerType, onPress, item, favourite }) => {
    const scheme = useColorScheme()

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
                            <TouchableOpacity style={styles.heartIcon}>
                                <AntDesign name='heart' size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.leftIcon}>
                                <Feather name='corner-up-right' size={25} color={colors.white} />
                            </TouchableOpacity>
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
    heartIcon: {
        elevation: 10,
        backgroundColor: colors.white, paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10
    },
    leftIcon: {
        elevation: 10,
        backgroundColor: '#3070ce', paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginLeft: 10
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