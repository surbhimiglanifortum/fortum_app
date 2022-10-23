import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BlackText from '../Text/BlackText'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import Charger1 from '../../assests/svg/charger1'
import CommonText from '../Text/CommonText'
import ToggleCard from '../Card/ToggleCard'
import { Switch } from 'react-native-paper';
import WhiteButton from '../Button/WhiteButton'
import Button from '../Button/Button'


const FilterModal = ({ openFilterModal, setOpenFilterModal }) => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
const applyButtonHandler=()=>{
    setOpenFilterModal(false)
}
    return (
        <Modal visible={openFilterModal} statusBarTranslucent={true}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <BlackText showText={'Filter'} fontSize={19} />
                        <TouchableOpacity onPress={() => { setOpenFilterModal(false) }}
                            style={styles.crossIcon}>
                            <AntDesign name='close' color={colors.black} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.connectorContainer}>
                        <BlackText showText={'Connectors'} fontSize={17} />
                        <View style={styles.cardContainer}>
                            {
                                [2, 2, 2, 2, 2].map((item, ind) => {
                                    return (
                                        <View key={ind} style={styles.cardInner}>
                                            <TouchableOpacity style={styles.card}>
                                                <Charger1 />
                                            </TouchableOpacity>
                                            <View style={styles.text}>
                                                <CommonText showText={'TYPE-1'} />
                                            </View>
                                        </View>
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
            </View>
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
        backgroundColor: colors.white,
        elevation: 5,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginRight: 19,
        flexWrap: 'wrap',


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
        // flexWrap:'wrap',
        overflow: 'hidden'
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