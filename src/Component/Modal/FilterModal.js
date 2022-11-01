import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView, NativeModules } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
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
// import * as ApiAction from '../../Services/Api'
import CommonCard from '../../Component/Card/CommonCard'
import axios from 'axios'
import * as ApiAction from '../../Services/Api'
import IEC_62196_T2_COMBO from '../../../src/assests/svg/IEC_62196_T2_COMBO'
import IEC_62196_T1 from '../../../src/assests/svg/IEC_62196_T1'
import CHADEMO from '../../../src/assests/svg/CHADEMO'
import IEC_62196_T1_COMBO from '../../../src/assests/svg/IEC_62196_T1_COMBO'
import IEC_62196_T2 from '../../../src/assests/svg/IEC_62196_T2'

import DenseCard from '../Card/DenseCard'
import { StatusBar } from 'react-native';


const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;


const FilterModal = ({ openFilterModal, setOpenFilterModal }) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const applyButtonHandler = () => {
        setOpenFilterModal(false)
    }

    const { data: filterData, status, isLoading, refetch } = useQuery('FilterData', async () => {
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

    const getFile = (key) => {
        console.log(key)
        switch (key) {
            case 'IEC_62196_T1':
            return <IEC_62196_T1/>
            
                break;
            case 'IEC_62196_T2_COMBO':
                return <IEC_62196_T2_COMBO/>
                break;
            case 'CHADEMO':
                return <CHADEMO/>
                break;
            case 'IEC_62196_T2':
                return <IEC_62196_T2/>
                break;
            case 'IEC_62196_T1_COMBO':
                return <IEC_62196_T1_COMBO/>
                break;
            case 'DOMESTIC_F':
                return <IEC_62196_T2_COMBO/>
                break;

            default:
                return <IEC_62196_T2_COMBO/>
                break;
        }
    }

    return (
        <Modal animationType={'slide'} visible={openFilterModal} statusBarTranslucent={true}>
            <CommonView style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <View></View>
                        <CommonText >Filter</CommonText>
                        <TouchableOpacity onPress={() => { setOpenFilterModal(false) }}
                            style={styles.crossIcon}>
                            <AntDesign name='close' color={colors.black} />
                        </TouchableOpacity>
                    </View>
                   
                    <View style={styles.connectorContainer}>
                        <CommonText>Connectors</CommonText>
                        <View style={styles.cardContainer}>
                            {
                                filterData?.map((item, ind) => {
                                    return (
                                        <View>
                                            <CommonCard key={ind} style={styles.cardInner}>
                                                <TouchableOpacity style={styles.card}>
                                                   {getFile(item.title)}
                                                </TouchableOpacity>
                                            </CommonCard>
                                            <View style={styles.text}>
                                                <CommonText regular fontSize={14} >{getChargerMapObject(item.title).name}</CommonText>
                                            </View>
                                        </View>


                                    )
                                })
                            }
                        </View>
                    </View>
                    <DenseCard style={styles.middleCard}>
                        <CommonText showText={'Show Available Charger Only'} fontSize={15} />
                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.green} />
                    </DenseCard>
                   
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
        marginTop: STATUSBAR_HEIGHT,
    },
    innerContainer: {

        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
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

    },
    card: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    text: {
        alignItems: 'center',
        marginVertical: 10
    },
    cardInner: {
        position: 'relative',
        margin: 10,
        padding: 30,
        width: 69,
        height: 69,

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