import { View, Text, useColorScheme, StyleSheet, FlatList, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import { getFaqService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import CommonView from '../../../Component/CommonView/index'
import Header from '../../../Component/Header/Header'
import CommonCard from '../../../Component/Card/CommonCard/index'
import CommonText from '../../../Component/Text/CommonText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../../../Utils/colors'
import NoData from '../../../Component/NoDataFound/NoData'
import Loader from '../../../Component/Loader'

const FaqPage = () => {

    const [loaderOpen, setLoaderOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [faqData, setFaqData] = useState([])
    const scheme = useColorScheme()

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand = (id) => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const result = faqData.map(e => e)
        const index = result.findIndex(e => e.id == id)
        result[index].isOpen = !result[index].isOpen
        setFaqData(result)

    }

    const { data, status, isLoading, refetch } = useQuery('faqPage', async () => {
        setLoaderOpen(true)
        const res = await getFaqService()
        const result = res.data.map((item) => {

            return { ...item, isOpen: false }
        })
        setLoaderOpen(false)
        setFaqData(result)
        return res.data
    })

    return (
        <CommonView>
            <Header showText={'FAQ'} />
            {!loaderOpen && data?.length > 0 ?
                <FlatList
                    data={faqData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <CommonCard>
                                <TouchableOpacity style={styles.innerCard} onPress={() => { toggleExpand(item?.id) }} >
                                    <CommonText showText={item?.q} />
                                    <AntDesign name={item?.isOpen == false ? 'down' : 'up'} size={22} color={scheme == 'dark' ? colors.white : colors.black} />
                                </TouchableOpacity>
                                {
                                    item?.isOpen == true &&
                                    <View style={{ marginVertical: 15 }}>
                                        <CommonText showText={item?.a} />
                                    </View>
                                }
                            </CommonCard>
                        )
                    }
                    }
                /> :
                !loaderOpen && <NoData showText={'No FAQ Available'} />
            }

            <Loader modalOpen={loaderOpen} />
        </CommonView>
    )
}

const styles = StyleSheet.create({
    innerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    }
})

export default FaqPage