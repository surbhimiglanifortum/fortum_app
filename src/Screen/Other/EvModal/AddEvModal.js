import { View, Text, SafeAreaView, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import ElectricCarSvg from '../../../assests/svg/ElectricCarSvg'
import routes from '../../../Utils/routes'
import IconCardWithoutBg from '../../../Component/Card/IconCardWithoutBg'
import CommonText from '../../../Component/Text/CommonText'
import { getEvModalService } from '../../../Services/Api'
import { useQuery } from 'react-query'
import CommonCard from '../../../Component/Card/CommonCard/index'
import NoData from '../../../Component/NoDataFound/NoData'
import Loader from '../../../Component/Loader'

const AddEvModal = () => {

  const navigation = useNavigation()
  const scheme = useColorScheme()
  const [loaderOpen, setLoaderOpen] = useState(false)

  const addVehicleHandler = () => {
    navigation.navigate(routes.SelectVehicle)
  }

  const { data, status, isLoading, refetch } = useQuery('evModalData', async () => {
    setLoaderOpen(true)
    const res = await getEvModalService()
    setLoaderOpen(false)
    return res.data
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <View style={styles.innerContainer}>
        {/* <Header /> */}
        <Header showText={'Select Brand'} />
        <View style={styles.cardContainer}>
          {!loaderOpen && data?.length > 0 ?
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={(item) => {
                return (
                  <CommonCard>
                    <TouchableOpacity style={styles.card} onPress={addVehicleHandler}>
                      <IconCardWithoutBg Svg={ElectricCarSvg} backgroundColor={colors.green} />
                      <CommonText showText={item.item.name} customstyles={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                  </CommonCard>
                )
              }
              }
            /> :
            !loaderOpen && <NoData showText={'No Data Found'} />
          }
        </View>
        <Loader modalOpen={loaderOpen} />
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
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  cardContainer: {
    marginVertical: 20,
    // marginBottom: 50
  }
})

export default AddEvModal