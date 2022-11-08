import { View, SafeAreaView, StyleSheet, useColorScheme, Image, } from 'react-native'
import React from 'react'
import colors from '../../../Utils/colors'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import { getChargingKeyDetailsService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import DenseCard from '../../../Component/Card/DenseCard/index'
import ChargingKeySvg from '../../../assests/svg/ChargingKeySvg'
import IconCard from '../../../Component/Card/IconCard'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'

const ChargingKeyDetails = ({ route }) => {

    const paramsData = route.params.data.item
    const scheme = useColorScheme()
   
    const { data, status, isLoading, refetch } = useQuery('chargingDetailsKey', async () => {
        const res = await getChargingKeyDetailsService(paramsData?.auth_id)
        return res.data
    })


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <View style={styles.innerContainer}>
                <Header showText={'Charging Key'} />
                <DenseCard style={styles.card}>
                    <View style={styles.keyInner}>
                        <CommonIconCard Svg={ChargingKeySvg} backgroundColor={colors.lightgreen} />
                        <View style={styles.textCon}>
                            <CommonText showText={(data?.visual_number || "").startsWith("VIRTUAL_TOKEN")
                                ? "App charging key"
                                : data?.visual_number} />
                            <CommonText showText={data?.uid || ""} fontSize={14} />
                        </View>
                    </View>
                </DenseCard>
                <DenseCard style={styles.card}>
                    <View style={styles.keyInner1}>
                        <View >
                            <CommonText showText={'Type'} customstyles={styles.textType} />
                            <CommonText showText={'Valid'} />
                        </View>
                        <View>
                            <CommonText showText={data?.type || ""} customstyles={styles.textType} />
                            <CommonText showText={data?.valid ? "YES" : "NO" || ""} />
                        </View>
                    </View>
                </DenseCard>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'
    },
    card: {
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    keyInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    keyInner1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textCon: {
        marginLeft: 14
    },
    textType: { marginVertical: 10, },


})


export default ChargingKeyDetails