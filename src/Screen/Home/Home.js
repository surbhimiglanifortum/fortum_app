import React, { useEffect, useContext, useState, useRef } from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import MapView from "react-native-map-clustering";
import { Marker } from 'react-native-maps';
import BlackText from '../../Component/Text/BlackText';
import colors from '../../Utils/colors';
import MapList from './MapList/MapList';
import IconCardWithoutBg from '../../Component/Card/IconCardWithoutBg';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FilterSvg from '../../assests/svg/FilterSvg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import FilterModal from '../../Component/Modal/FilterModal';
import LocationSvg from '../../assests/svg/LocationSvg';
import DetailsCard from '../../Component/Card/DetailsCard';
import Entypo from 'react-native-vector-icons/Entypo'
import WhiteText from '../../Component/Text/WhiteText';
import Geolocation from '@react-native-community/geolocation';
import { computeDistance } from '../../Utils/helperFuncations/computeDistance';
import { postListService } from '../../Services/HomeTabService/HomeTabService';
import SnackContext from '../../Utils/context/SnackbarContext';
import { useQuery } from 'react-query'
import AvailMarker from '../../assests/svg/AvailMarker'
import * as ApiAction from '../../Services/Api'

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

  const regionToZoom = {
    latitude: 23.313561,
    longitude: 78.2863013,
    latitudeDelta: 50.4922,
    longitudeDelta: 0.0521,
  }

  const chargerLocations = async () => {
    try {
      var location = {}
      if (!currentLocation.coords) {
        Geolocation.getCurrentPosition(info => {
          setCurrentLocation(info)
        })
      } else {
        location = currentLocation;
      }
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
      if (!currentLocation.coords || reload) {
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

      {selectedTab != 'List' &&
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          toolbarEnabled={false}
          onRegionChangeComplete={(r) => {
            const getBoundingBox = (region) => ([
              region.longitude - region.longitudeDelta / 2, // westLng - min lng
              region.latitude - region.latitudeDelta / 2, // southLat - min lat
              region.longitude + region.longitudeDelta / 2, // eastLng - max lng
              region.latitude + region.latitudeDelta / 2 // northLat - max lat
            ])
            setVisibleRegion(getBoundingBox(r))
            console.log("onRegions Change", r, getBoundingBox(r))
          }}
          showsMyLocationButton={false}
          onMarkerPress={(e) => {
            if (locationLoading) {
              return false;
            }
            console.log("PRESS", e.nativeEvent.coordinate)
            let marker = data;
            marker = marker.find((item) => {
              // marker
              if (parseFloat(item.latitude) === e.nativeEvent.coordinate.latitude &&
                parseFloat(item.longitude) === e.nativeEvent.coordinate.longitude) {
                console.log("FOUND MARKER")
                return true
              }
            })
            if (marker) {
              console.log("selected marker", marker)
              // setselectedMarker(marker)
              selectedMarker = marker
              if (location.coords) {
                // setShowBottomChargeDrawer(true)
                // setShowBottomDrawer(false)
                console.log("Here One")
              }
            }
          }}
          showsCompass={false}
          showsUserLocation
          style={styles.map}
          initialRegion={regionToZoom}
        // region={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.015,
        //   longitudeDelta: 0.0121,
        // }}
        >
          {isLoading ? null :
            data?.map((item, index) => {
              // console.log(item)
              // console.log(item.id)
              // console.log(item.latitude)
              // console.log(item.longitude)

              const boxCheck = (cordx, cordy, lx, ly, rx, ry) => {
                if (lx <= cordx && ly <= cordy && cordx <= rx && cordy <= ry)
                  return true
                return false
              }

              let lat = item.latitude
              let long = item.longitude
              let vb = visibleRegion
              if (boxCheck(lat, long, vb[1], vb[0], vb[3], vb[2]))
                return (
                  <Marker key={item.id}
                    coordinate={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude)
                    }}
                  >
                    <AvailMarker />
                  </Marker>
                )
            })
          }
        </MapView>}

      {/* Top Tab */}
      <View style={styles.topTab}>
        <View style={styles.topTabInner}>
          <TouchableOpacity onPress={mapButtonHandler}
            style={[styles.tabContainer, selectedTab != 'List' ? { backgroundColor: colors.white, borderRadius: 4, paddingVertical: 3 } : null,]}>
            <WhiteText showText={'Map'} fontSize={16} color={selectedTab != 'List' ? colors.black : colors.white} />
          </TouchableOpacity >
          <TouchableOpacity onPress={listButtonHandler} style={[styles.tabContainer, selectedTab == 'List' ? { backgroundColor: colors.white, borderRadius: 4, paddingVertical: 3 } : null,]}>
            <WhiteText showText={'List'} fontSize={16} color={selectedTab == 'List' ? colors.black : colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* // Charger Icon */}
      {selectedTab != 'List' &&
        <TouchableOpacity style={styles.chargerIcon} onPress={chargingBtnHandler}>
          <View style={styles.chargerIconInner}>
            <Entypo name='flash' size={22} color={colors.white} />
          </View>
        </TouchableOpacity>
      }

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
          <BlackText showText={'Show charging station nearest to'} fontSize={17} />
          <View style={styles.searchInnerContainer}>
            <TouchableOpacity style={styles.searchBox} onPress={searchBtnHandler}>
              <AntDesign name='search1' size={20} />
              <BlackText showText={'Your Location'} margin={6} />
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
                [1, 1, 1, 1, 1, 1].map((item, ind) => {
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
      <View >
        {selectedTab == 'List' && <MapList />}
      </View>
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
