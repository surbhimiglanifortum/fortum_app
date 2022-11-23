import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonCard from '../../Component/Card/CommonCard';
import DenseCard from '../../Component/Card/DenseCard';
import CommonText from '../../Component/Text/CommonText';
import CommonView from '../../Component/CommonView'
import Header from '../../Component/Header/Header'
import SnackContext from '../../Utils/context/SnackbarContext'
import Button from '../../Component/Button/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import * as ApiAction from '../../Services/Api'
import { AddToRedux } from '../../Redux/AddToRedux';
import Types, { USERDETAILS } from '../../Redux/Types'
import { useState } from 'react';
export default function DeliveryAddress({ route, navigation }) {
    const dispatch = useDispatch()
    const navigationScreen = useNavigation()
    const { callbackSelectAddress } = route.params
    const { setOpenCommonModal } = useContext(SnackContext);
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const [loaderOpen, setLoaderOpen] = useState(false)

    const addAddressHandler = () => {
        navigationScreen.navigate(routes.AddAddress)
    }

    const refetch = async () => {
        setLoaderOpen(true)
        const result = await ApiAction.getUserDetails()
        if (result.data) {
            dispatch(AddToRedux(result.data, USERDETAILS))
        }
        setLoaderOpen(false)
    }

    return (
        <CommonView>
            <Header showText={'Select Delivery Address'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={mUserDetails?.delivery_addresses}
                    refreshControl={<RefreshControl refreshing={loaderOpen} onRefresh={refetch} />}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                callbackSelectAddress(item)
                                navigation.pop()
                            }}>
                                <DenseCard>
                                    <CommonText>
                                        {item.first_name + " " + item.last_name}
                                    </CommonText>
                                    <CommonText fontSize={14} regular>
                                        {item.address + " " + item.address_line_2 + " " + item.city + " " + item.country + " " + item.postal_code}
                                    </CommonText>

                                </DenseCard>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <Button isFlex={false} showText={'Add Address'} onPress={addAddressHandler} />
        </CommonView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30
    },

})
