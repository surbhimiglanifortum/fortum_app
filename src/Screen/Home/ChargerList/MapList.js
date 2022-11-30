import { View, StyleSheet, TouchableOpacity, FlatList, TextInput, BackHandler, TouchableWithoutFeedback, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsCard from '../../../Component/Card/DetailsCard'
import colors from '../../../Utils/colors'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import routes from '../../../Utils/routes'
import Loader from '../../../Component/Loader'
import CommonCard from '../../../Component/Card/CommonCard'
import DensCard from '../../../Component/Card/DenseCard'
import { Auth } from 'aws-amplify'
import CommonView from '../../../Component/CommonView'

const MapList = ({ data, isRefetching, location, searchBtnHandler, setSelectedTab, selectedTab,refetch }) => {

  const isFocused = useIsFocused()

  const navigation = useNavigation()

  const [loading, setLoading] = useState(isRefetching)
  const [mapData, setMapData] = useState(data)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setMapData(data)
  }, [data])

  const searchButtonHandler = () => {
    searchBtnHandler()
  }

  const favoruiteButtonHandler = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      console.log(result)
      if (result?.signInUserSession) {
        if (result.attributes.phone_number && result.attributes.phone_number != '') {
          navigation.navigate(routes.Favoruite, { location: location })
        } else {
          navigation.navigate(routes.MobileInput, { email_id: result.attributes.email })
        }
        return
      }

    } catch (error) {

    }
    navigation.navigate(routes.login)


  }

  const cardDetailsHandler = async (data) => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      if (result.attributes.phone_number && result.attributes.phone_number != '') {
        navigation.navigate(routes.ChargingStation, {
          data: data
        })
      } else {
        navigation.navigate(routes.MobileInput, { email_id: result.attributes.email })
      }
    } catch (error) {
      navigation.navigate(routes.login)
    }
  }

  const searchLocation = () => {
    var results = [];
    try {
      setLoading(true)
      for (var i = 0; i < data.length; i++) {
        if (data[i].address.city.toLowerCase().includes(search.toLowerCase())) {
          results.push(data[i]);
        }

        else if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
          results.push(data[i]);
        }
      }
    } catch (err) {
      setLoading(false)
    }
    setMapData(results)
    setLoading(false)
  }

  useEffect(() => {
    if (search.length > 3)
      searchLocation()
    else
      setMapData(data)
  }, [search])


  const backAction = () => {
    if (isFocused) {
      setSelectedTab('map')
      return true
    } else {
      return false
    }

  }

  let backHandler

  useEffect(() => {
    backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      backHandler.remove()
    }
  }, [isFocused])

  return (
    <CommonView style={[styles.container]}>
      <View style={styles.searchContainer}>
        <CommonCard padding={1} style={{ flex: 1 }}>
          <TouchableOpacity style={styles.searchContainer} disabled={true}>
            <View>
              <DensCard marginVertical={5}>
                <AntDesign name='search1' size={16} />
              </DensCard>
            </View>
            <TextInput style={{ flex: 1 }}
              placeholder={'Random Location'}
              onChangeText={setSearch}
              value={search}
            />
          </TouchableOpacity>
        </CommonCard>

        <CommonCard padding={16}>
          <TouchableOpacity onPress={favoruiteButtonHandler}>
            <AntDesign name='hearto' color={colors.red} size={20} />
          </TouchableOpacity>
        </CommonCard>
      </View>

      
      <FlatList
         refreshControl={<RefreshControl onRefresh={refetch}  refreshing={isRefetching} />}
        data={mapData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <DetailsCard location={location} chargerType={1} item={item} onPress={() => cardDetailsHandler(item)} />
          )
        }}
      />
    </CommonView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80
  },
  filter: {
    marginRight: 60,
    marginTop: 20,
    backgroundColor: colors.white,
    paddingVertical: 2,
    paddingHorizontal: 4,
    elevation: 5,
    borderRadius: 6,
    alignSelf: 'flex-end'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInner: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default MapList