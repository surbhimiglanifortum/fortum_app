import { View, Text, FlatList, StyleSheet, TouchableOpacity,useContext } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CommonCard from '../../Component/Card/CommonCard';
import CommonText from '../../Component/Text/CommonText';
import CommonView from '../../Component/CommonView'
import Header from '../../Component/Header/Header'
import SnackContext from '../../Utils/context/SnackbarContext'

export default function DeliveryAddress({ route,navigation }) {

    const { callbackSelectAddress } = route.params
    const { setOpenCommonModal } = useContext(SnackContext);
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

    return (
        <CommonView>
            <View style={styles.innerContainer}>
                <View style={[styles.header]}>
                    <Header showText={'Delivery Address'} />

                </View>
            </View>
            <FlatList
                data={mUserDetails?.delivery_addresses}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={()=>{
                            callbackSelectAddress(item)
                            navigation.pop()
                        }}>
                            <CommonCard>
                                <CommonText>
                                    {item.first_name + " " + item.last_name}
                                </CommonText>
                                <CommonText fontSize={14} regular>
                                    {item.address + " " + item.address_line_2 + " " + item.city + " " + item.country + " " + item.postal_code}
                                </CommonText>

                            </CommonCard>
                        </TouchableOpacity>
                    )
                }}
            />
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
