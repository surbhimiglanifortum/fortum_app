import { View, Text, Modal, StyleSheet, TouchableOpacity, BackHandler, NativeModules, useColorScheme } from 'react-native'
import React, { useState, memo, useEffect } from 'react'
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
import Loader from '../Loader'
import DenseCard from '../Card/DenseCard'

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

let payloadConnectors = {}
let allCon = {}
let mSwitchOn = false

let backHandler

const FilterModal = ({ openFilterModal, setOpenFilterModal, onFilterClick }) => {
    const scheme = useColorScheme()

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [connectorTypes, setConnectorTypes] = useState([])

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
    };
    useEffect(() => {
        mSwitchOn = isSwitchOn

    }, [isSwitchOn])

    const applyButtonHandler = () => {
        onFilterClick(payloadConnectors, mSwitchOn)
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

        setConnectorTypes(data)
        return data
    })

    // useEffect(() => {
    //     console.log("Check Filter Call")
    //     backHandler = BackHandler.addEventListener('hardwareBackPress', () => setOpenFilterModal(false))
    //     return () => {
    //         backHandler.remove()
    //     }
    // }, [])


    const getFile = (key) => {
        switch (key) {
            case 'IEC_62196_T1':
                return <IEC_62196_T1 fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />

                break;
            case 'IEC_62196_T2_COMBO':
                return <IEC_62196_T2_COMBO fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
                break;
            case 'CHADEMO':
                return <CHADEMO fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
                break;
            case 'IEC_62196_T2':
                return <IEC_62196_T2 fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
                break;
            case 'IEC_62196_T1_COMBO':
                return <IEC_62196_T1_COMBO fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
                break;
            case 'DOMESTIC_F':
                return <IEC_62196_T2_COMBO fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
                break;

            default:
                return <IEC_62196_T2_COMBO fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
                break;
        }
    }

    const onItemPress = (title) => {
        payloadConnectors = {}
        allCon = {}

        allCon = connectorTypes.map((item, index) => {
            if (item.title === title) {
                return {
                    title,
                    active: !item.active
                }
            } else {
                return item
            }
        })
        console.log("ALLCON", allCon)
        allCon.forEach((item, index) => {
            payloadConnectors[item.title] = item.active
        })
        setConnectorTypes(allCon)
    }

    return (
        <Modal animationType={'slide'} visible={openFilterModal} statusBarTranslucent={false} >
            <CommonView style={styles.container}>
                <View style={styles.innerContainer}>

                    <View>
                        <View style={styles.header}>
                            <View>
                            </View>
                            <View style={{}}>
                                <CommonText fontSize={16} >Filter</CommonText>
                            </View>
                            <View>
                                {/* <CommonCard>
                                    <TouchableOpacity onPress={() => { setOpenFilterModal(false) }}
                                        style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                        <AntDesign size={20} name='close' color={scheme == 'dark' ? colors.backgroundLight : colors.ligthIcon} />
                                    </TouchableOpacity>

                                </CommonCard> */}
                            </View>


                        </View>


                        <View style={{ marginTop: scale(20) }}>
                            <CommonText fontSize={16}> Connectors</CommonText>
                            {isLoading && <Loader />}
                            <View style={styles.cardContainer}>
                                {
                                    connectorTypes?.map((item, ind) => {
                                        return (
                                            <View>

                                                <CommonCard active={item?.active ? true : false} key={item?.active ? `${ind}mc` : `${ind}bc`} style={[styles.cardInner]}>
                                                    <TouchableOpacity style={{ width: 59, height: 49, alignItems: 'center', justifyContent: 'center' }} onPress={() => onItemPress(item.title)} >
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
                        <View style={{ marginTop: 30 }}>
                            <DenseCard>
                                <View style={styles.middleCard}>
                                    <CommonText showText={'Show Available Charger Only'} fontSize={15} />
                                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.green} />
                                </View>

                            </DenseCard>
                        </View>



                    </View>




                    <View style={styles.button}>
                        <View style={styles.resetBtn}>
                            <WhiteButton showText={'Reset'} onPress={() => {
                                setConnectorTypes(filterData)
                                setIsSwitchOn(false)
                                mSwitchOn = false
                                payloadConnectors = {}
                                applyButtonHandler()
                            }} />
                        </View>
                        <View style={styles.resetBtn}>
                            <Button showText={'Apply'} onPress={applyButtonHandler} color={colors.white} />
                        </View>
                    </View>

                </View>
            </CommonView>
        </Modal >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    connectorContainer: {

    },
    card: {
    },
    cardContainer: {

        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',

    },
    text: {
        alignItems: 'center',

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
        justifyContent: 'space-between',

    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    resetBtn: {
        width: '45%',
        borderRadius: 8
    }
})

export default memo(FilterModal)