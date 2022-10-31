import { View, Text, Modal, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from '../Button/Button'
import CommonText from '../Text/CommonText'

const WalletModals = ({modalVisible, setModalVisible ,showText }) => {

    const okayBtnHandler = () => {
        setModalVisible(false)
    }

    return (
        <Modal visible={modalVisible} statusBarTranslucent={true} transparent>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                   
                        <View style={styles.header}>
                            
                            <TouchableOpacity style={styles.crossBtn} onPress={() => { setModalVisible(false) }}>
                                <AntDesign name='close' size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerText}>
                            <CommonText showText={showText} fontSize={16} />
                        </View>
                       
                   
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(196,196,196,0.8)',
        alignItems:'center',
        justifyContent:'center'
    },
    innerContainer: {
       borderWidth:1,
       width:'85%',
       backgroundColor:colors.white
        
    },
    
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        justifyContent: 'space-between',
        alignSelf: 'flex-end'
    },
    crossBtn: {
        backgroundColor: colors.white,
        elevation: 5,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 6
    },
    centerText: {
        marginVertical: 50,
        alignSelf: 'center'
    }
})


export default WalletModals