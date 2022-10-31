import React, { useEffect, useContext, useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import colors from '../../Utils/colors';
import MapList from './ChargerList/MapList';
import IconCardWithoutBg from '../../Component/Card/IconCardWithoutBg';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FilterSvg from '../../assests/svg/FilterSvg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import FilterModal from '../../Component/Modal/FilterModal';
import LocationSvg from '../../assests/svg/LocationSvg';
import DetailsCard from '../../Component/Card/DetailsCard';
import Geolocation from '@react-native-community/geolocation';
import { computeDistance } from '../../Utils/helperFuncations/computeDistance';
import { postListService } from '../../Services/HomeTabService/HomeTabService';
import SnackContext from '../../Utils/context/SnackbarContext';
import { useQuery } from 'react-query'

import * as ApiAction from '../../Services/Api'
import MapCharger from '../Home/MapCharger'
import CommonText from '../../Component/Text/CommonText';
let selectedMarker = {}

export default Home = () => {

  const mapRef = useRef();
  const navigation = useNavigation()
  const [location, setLocation] = useState({})
  const [selectedTab, setSelectedTab] = useState('Map')
  const [selectedCharger, setSelectedCharger] = useState(false)
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [visibleRegion, setVisibleRegion] = useState([0, 0, 0, 0])

  const mapButtonHandler = () => {
    setSelectedTab('')
  }
  const listButtonHandler = () => {
    setSelectedTab('List')
  }
  const favButtonHandler = () => {
    navigation.navigate(routes.Favoruite)
  }
  const filterButtonHandler = () => {
    setOpenFilterModal(true)
  }
  const scannerButtonHandler = () => {

  }
  const searchBtnHandler = () => {
    navigation.navigate(routes.SearchLocation)
  }
  const locationBtnHandler = () => {

  }
  const chargingBtnHandler = () => {
    setSelectedCharger(true)
  }
  const chargingCardHandler = () => {
    navigation.navigate(routes.ChargingStation)
  }

  const { currentLocation, setCurrentLocation, } = useContext(SnackContext)

  useEffect(() => {
    refetch()
  }, [currentLocation])


  const chargerLocations = async () => {
    try {
      let location = {}
      if (!currentLocation.coords) {
        const result = Geolocation.getCurrentPosition(info => {
          setCurrentLocation(info)

        })
      } else {
        location = currentLocation;
      }
      if (location?.coords) {
        const res = await ApiAction.getLocation()
        var locationsArray = res.data?.locations[0];
        locationsArray.map((data, index) => {
          locationsArray[index].distance = computeDistance([location?.coords?.latitude, location?.coords?.longitude], [
            data?.latitude,
            data?.longitude,
          ])
        })
        locationsArray.sort(function (a, b) { return a.distance - b.distance })
        return locationsArray;
      }

      return [];
    } catch (error) {
      console.log("Charger Location Error", error)
    }
  }

  const { data, status, isLoading, refetch } = useQuery('MapData', chargerLocations, {
    // manual: true,
    // refetchInterval: 15000,
  })

  const getLocationAndAnimate = async (reload) => {
    try {
      setLocationLoading(true)
      let tlocation = {}
      if (!currentLocation?.coords || reload) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        tlocation = await Location.getCurrentPositionAsync({});
        // console.log(location)
        setCurrentLocation(tlocation)
        setLocation(tlocation)
        mapRef.current.animateToRegion({
          latitude: tlocation.coords.latitude,
          longitude: tlocation.coords.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025
        }, 2000);

      } else {
        setLocation(currentLocation)
        tlocation = currentLocation
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: tlocation.coords.latitude,
              longitude: tlocation.coords.longitude,
              latitudeDelta: 0.025,
              longitudeDelta: 0.025
            }, 2000);
          }
        }, 1000);
      }
      setLocationLoading(false)
    } catch (error) {
      setLocationLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getLocationAndAnimate()
  }, [])


  return (
    <View style={styles.container}>
      {selectedTab == 'List' ? <MapList data={data} /> : <MapCharger data={data} isLoading={isLoading} locationLoading={locationLoading} chargingBtnHandler={chargingBtnHandler} selectedMarker={selectedMarker} />}
      {/* Top Tab */}
      <View style={styles.topTab}>
        <View style={styles.topTabInner}>
          <TouchableOpacity onPress={mapButtonHandler}
            style={[styles.tabContainer, selectedTab != 'List' ? { backgroundColor: colors.white, borderRadius: 4, paddingVertical: 3 } : null,]}>
            <CommonText showText={'Map'} fontSize={16} customstyles={{ color: selectedTab != 'List' ? colors.black : colors.white }} />
          </TouchableOpacity >
          <TouchableOpacity onPress={listButtonHandler} style={[styles.tabContainer, selectedTab == 'List' ? { backgroundColor: colors.white, borderRadius: 4, paddingVertical: 3 } : null,]}>
            <CommonText showText={'List'} fontSize={16} customstyles={{ color: selectedTab == 'List' ? colors.black : colors.white }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Fillter ,favrouite,scan ,search Button  */}
      <View style={styles.iconContainer}>
        {selectedTab != 'List' && <View style={styles.iconContainer1}>
          <TouchableOpacity style={styles.icon} onPress={favButtonHandler}>
            <AntDesign name='hearto' color={colors.red} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={filterButtonHandler}>
            <IconCardWithoutBg Svg={FilterSvg} backgroundColor={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={scannerButtonHandler}>
            <MaterialIcons name='qr-code-scanner' color={colors.black} size={22} />
          </TouchableOpacity>
        </View>}
        {selectedTab != 'List' && <View style={styles.searchContainer}>
          <CommonText showText={'Show charging station nearest to'} fontSize={17} />
          <View style={styles.searchInnerContainer}>
            <TouchableOpacity style={styles.searchBox} onPress={searchBtnHandler}>
              <AntDesign name='search1' size={20} />
              <CommonText showText={'Your Location'} margin={6} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationBtn} onPress={locationBtnHandler}>
              <LocationSvg />
            </TouchableOpacity>
          </View>
        </View>}
        {selectedTab != 'List' && selectedCharger &&
          <View>
            <ScrollView horizontal>
              {
                data.map((item, ind) => {
                  return (
                    <View key={ind} style={{
                      paddingHorizontal: 8
                    }} >
                      <DetailsCard chargerType={2} item={item} onPress={chargingCardHandler} />
                    </View>
                  )
                })
              }

            </ScrollView>
          </View>
        }
      </View>
      {/* Render List Component */}

      <FilterModal openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
  topTab: {
    top: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  topTabInner: {
    backgroundColor: colors.greenBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6
  },
  tabContainer: {
    width: 70,
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 20,
    alignSelf: 'flex-end'
  },
  searchContainer: {
    backgroundColor: colors.lightblue,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  searchInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 10
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: colors.white,
    overflow: 'hidden',
    width: '85%'
  },
  locationBtn: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    elevation: 5,
    overflow: 'hidden'
  },
  chargerIcon: {

    position: 'absolute',
    backgroundColor: colors.green,
    top: 100,
    left: 100,
    backgroundColor: colors.green,
    borderRadius: 100
  },
  chargerIconInner: {

    paddingVertical: 6,
    paddingHorizontal: 6,
    overflow: 'hidden',
    borderRadius: 100

  },

});
