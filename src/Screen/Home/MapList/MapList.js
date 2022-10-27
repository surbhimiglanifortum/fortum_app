import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsCard from '../../../Component/Card/DetailsCard'
import FilterSvg from '../../../assests/svg/FilterSvg'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import FilterModal from '../../../Component/Modal/FilterModal'
import BlackText from '../../../Component/Text/BlackText'
import AntDesign from 'react-native-vector-icons/AntDesign'
import routes from '../../../Utils/routes'
import { postListService } from '../../../Services/HomeTabService/HomeTabService'
import { useQuery } from 'react-query'

const MapList = () => {

  const navigation = useNavigation()
  const [listData, setListData] = useState([])
  const [openFilterModal, setOpenFilterModal] = useState(false)

  const filterButtonHandler = () => {
    setOpenFilterModal(true)
  }
  const searchButtonHandler = () => {
    navigation.navigate(routes.SearchLocation)
  }
  const favoruiteButtonHandler = () => {
    navigation.navigate(routes.Favoruite)
  }
  const cardDetailsHandler = () => {
    navigation.navigate(routes.ChargingStation)
  }

  // const listDataFunction = async () => {
  //   try {
  //     const res = await postListService()
  //     // console.log(res.data.locations[0],'..........data')
  //     setListData(res.data.locations[0])

  //     var locationsArray = res.data.locations[0];
  //     locationsArray.map((data, index) => {
  //       console.log(data, '............ggdata')
  //       locationsArray[index] = computeDistance([location.coords.latitude, location.coords.longitude], [
  //         data.latitude,
  //         data.longitude,
  //       ])
  //     })
  //     console.log(locationsArray, '.............................loc')
  //     locationsArray.sort(function (a, b) { return a.distance - b.distance })
  //     return locationsArray;
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    postListService()
  }, [])

  const { data, status, refetch } = useQuery('MapDataList', postListService, {
    // Refetch the data every second
    refetchInterval: 15000,
  })


  // console.log("Check Map List Data FRom New 123 abc", data)
  // console.log("Check Map List Status FRom New", status)

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <TouchableOpacity onPress={filterButtonHandler}
          style={styles.filter}>
          <FilterSvg />
        </TouchableOpacity>
        <View style={styles.innerContainer}>

          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={searchButtonHandler} style={styles.searchInner}>
              <AntDesign name='search1' size={20} style={{ marginRight: 5 }} />
              <BlackText showText={'Random Location'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={favoruiteButtonHandler} style={styles.favContainer}>
              <AntDesign name='hearto' color={colors.red} size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView nestedScrollEnabled={true}>
            {/* Render Details Card */}
            {
              data?.locations[0].map((item, ind) => {
                console.log(item, '.............item')
                return (
                  <View key={ind}>
                    <DetailsCard chargerType={1} item={item} onPress={cardDetailsHandler} />
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <FilterModal openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  searchInner: {
    width: '85%',
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  favContainer: {
    width: '13%',
    backgroundColor: colors.white,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 6,
    alignItems: 'center'
  }
})

export default MapList