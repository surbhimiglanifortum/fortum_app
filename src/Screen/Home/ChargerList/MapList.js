import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import DetailsCard from '../../../Component/Card/DetailsCard'
import FilterSvg from '../../../assests/svg/FilterSvg'
import colors from '../../../Utils/colors'
import { useNavigation } from '@react-navigation/native'
import FilterModal from '../../../Component/Modal/FilterModal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import routes from '../../../Utils/routes'
import SnackContext from '../../../Utils/context/SnackbarContext'
import CommonText from '../../../Component/Text/CommonText'
import Loader from '../../../Component/Loader'

const MapList = ({ data, setOpenFilterModal, isRefetching }) => {

  const navigation = useNavigation()
  const [listData, setListData] = useState([])



  const { currentLocation, setCurrentLocation, } = useContext(SnackContext)

  const filterButtonHandler = () => {
    setOpenFilterModal(true)
  }
  const searchButtonHandler = () => {
    navigation.navigate(routes.SearchLocation)
  }
  const favoruiteButtonHandler = () => {
    navigation.navigate(routes.Favoruite)
  }
  const cardDetailsHandler = (data) => {
    navigation.navigate(routes.ChargingStation, {
      data: data
    })
  }

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
              <CommonText showText={'Random Location'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={favoruiteButtonHandler} style={styles.favContainer}>
              <AntDesign name='hearto' color={colors.red} size={20} />
            </TouchableOpacity>
          </View>

          {isRefetching && <Loader />}

          <ScrollView nestedScrollEnabled={true}>
            {/* Render Details Card */}
            {
              data?.map((item, ind) => {
                return (
                  <View key={ind}>
                    <DetailsCard chargerType={1} item={item} onPress={() => cardDetailsHandler(item)} />
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
  },
  innerContainer: {
    // width: '90%',
    alignSelf: 'center',
    // marginTop: 20
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