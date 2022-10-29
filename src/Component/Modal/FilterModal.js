import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BlackText from '../Text/BlackText'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import Charger1 from '../../assests/svg/charger1'
import CommonText from '../Text/CommonText'
import { Switch } from 'react-native-paper';
import WhiteButton from '../Button/WhiteButton'
import Button from '../Button/Button'
import CommonView from '../../Component/CommonView'
import { useQuery } from 'react-query'
import FontIcon from "../FortumIcons/FontIcon";
import { getChargerMapObject } from '../../Utils/HelperCommonFunctions'
import * as ApiAction from '../../Services/Api'
import CommonCard from '../../Component/Card/CommonCard'
const FilterModal = ({ openFilterModal, setOpenFilterModal }) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const applyButtonHandler = () => {
        setOpenFilterModal(false)
    }

    const { data: filterData, status, isLoading, refetch } = useQuery('MapData', async () => {
        const r = await ApiAction.getUniqueConnectors()
        // console.log("relash",r)
        let data = JSON.parse(r.data)
        data = data.map((item, index) => { return { title: item, active: true } })
        let filter = {}
        data.forEach((item, index) => {
            filter[item] = true
        })
        return data
    })

    return (
        <Modal animationType={'slide'} visible={openFilterModal} statusBarTranslucent={true}>
            <CommonView style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <CommonText >Filter</CommonText>
                        <TouchableOpacity onPress={() => { setOpenFilterModal(false) }}
                            style={styles.crossIcon}>
                            <AntDesign name='close' color={colors.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.connectorContainer}>
                        <CommonText  >Connectors</CommonText>
                        <View style={styles.cardContainer}>
                            {
                                [1]?.map((item, ind) => {
                                    return (
                                        <CommonCard key={ind} style={styles.cardInner}>
                                            <TouchableOpacity style={styles.card}>
                                                {/* <FontIcon name={getChargerMapObject(item.title).icon} /> */}
                                                <Charger1 />
                                            </TouchableOpacity>
                                            <View style={styles.text}>
                                                <CommonText regular fontSize={14} >{getChargerMapObject(item.title).name}</CommonText>
                                            </View>
                                        </CommonCard>
                                    )
                                })
                            }
                        </View>
                    </View>

                    <View style={styles.middleCard}>
                        <BlackText showText={'Show Available Charger Only'} fontSize={15} />
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.green} />
                    </View>
                    <View style={styles.button}>
                        <View style={styles.resetBtn}>
                            <WhiteButton showText={'Reset'} />
                        </View>
                        <View style={styles.resetBtn}>
                            <Button showText={'Apply'} onPress={applyButtonHandler} color={colors.white} />
                        </View>
                    </View>
                </View>
            </CommonView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: scale(200),
        alignSelf: 'flex-end',
        justifyContent: 'space-between'
    },
    crossIcon: {
        backgroundColor: colors.white,
        paddingVertical: 4,
        paddingHorizontal: 6,
        elevation: 5,
        borderRadius: 6
    },
    connectorContainer: {
        marginVertical: 30,
    },
    card: {
        // backgroundColor: colors.white,
        // elevation: 5,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginRight: 19,
        flexWrap: 'wrap',
        height:85


    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        flexWrap: 'wrap',
    },
    text: {
        alignItems: 'center',
        marginVertical: 10
    },
    cardInner: {
        width:'20%'
    },
    middleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        elevation: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scale(280)
    },
    resetBtn: {
        width: '45%',
        elevation: 5,
        backgroundColor: colors.white,
        borderRadius: 8
    }
})

export default FilterModal