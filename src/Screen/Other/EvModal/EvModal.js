import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import DeleteCard from '../../../Component/Card/DeleteCard'
import ElectricCarSvg from '../../../assests/svg/ElectricCarSvg'
import routes from '../../../Utils/routes'
import { useQuery } from 'react-query'
import { getEvModalService } from '../../../Services/Api'

const EvModal = () => {
    const navigation = useNavigation()
    const scheme = useColorScheme()
const[loaderOpen,setLoaderOpen]=useState(false)

const addEvModalBtnHandler=()=>{
    navigation.navigate(routes.AddEvModal)
}


// const { data, status, isLoading, refetch } = useQuery('evModalData', async () => {
//     setLoaderOpen(true)
//     const res = await getEvModalService()
//     setLoaderOpen(false)
//     return res.data
//   })


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    {/* <Header /> */}
                    <Header showText={'Ev Modals'} />
                    <View style={{ marginVertical: 20 }}>
                    </View>
                    {
                        [1,1,1,1,1,1,1,1].map((item,ind)=>{
                            return(

                                <DeleteCard Svg={ElectricCarSvg} />
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.button}>
                <Button showText={'Add Ev Modal'} onPress={addEvModalBtnHandler} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    button: {
        marginVertical: 20,
        paddingHorizontal: 20

    },
})

export default EvModal