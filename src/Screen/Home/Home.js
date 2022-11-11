import React, { useEffect, useContext, useState, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, FlatList } from 'react-native'
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
import { Auth } from 'aws-amplify'
import * as ApiAction from '../../Services/Api'
import MapCharger from '../Home/MapCharger'
import CommonText from '../../Component/Text/CommonText';
import { useSelector } from 'react-redux'
import CommonCard from '../../Component/Card/CommonCard'
import DenseCard from '../../Component/Card/DenseCard'


let selectedMarker = {}

export default Home = ({ navigatedata }) => {

  const mapRef = useRef();
  const navigation = useNavigation()
  const [location, setLocation] = useState({})
  const [selectedTab, setSelectedTab] = useState('Map')
  const [selectedCharger, setSelectedCharger] = useState(false)
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationsPayload, setLocationsPayload] = useState({
    onlyAvailableConnectors: false,
  })

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const scheme = useColorScheme()

  const mapButtonHandler = () => {
    setSelectedTab('')
  }
  const listButtonHandler = () => {
    setSelectedTab('List')
  }
  const favButtonHandler = () => {
    navigation.navigate(routes.Favoruite, { location: location })
  }
  const filterButtonHandler = () => {
    setOpenFilterModal(true)
  }
  const scannerButtonHandler = () => {

    Auth.currentSession().then(r => {
      if (!r) {
        navigation.navigate(routes.login)

      }
      else {
        if (mUserDetails.phone_number && mUserDetails.phone_number != '') {
          navigation.navigate("QRScannerPage")
        }
      }
    }).catch(err => { console.log(err); navigation.navigate("MakeChargingEasySplash") });

  }

  const searchedLocation = (payload) => {
    setLocation({
      coords: {
        latitude: payload.lat,
        longitude: payload.lng
      }
    })
  }

  const searchBtnHandler = () => {
    navigation.navigate(routes.SearchLocation, {
      searchedLocation,
      getLocationAndAnimate
    })
  }
  const locationBtnHandler = () => {
    getLocationAndAnimate()
  }
  const chargingBtnHandler = () => {

    setSelectedCharger(!selectedCharger)
  }
  const chargingCardHandler = () => {
    navigation.navigate(routes.ChargingStation)
  }

  const { currentLocation, setCurrentLocation, } = useContext(SnackContext)

  useEffect(() => {
    refetch()
  }, [location, locationsPayload])


  useEffect(() => {
    getLocationAndAnimate()
  }, [])


  const chargerLocations = async () => {
    try {

      const res = await ApiAction.getLocation({ ...locationsPayload, username: mUserDetails?.username || "" })
      var locationsArray = res.data?.locations[0];
      if (!location.coords) {
        return locationsArray
      } else {
        locationsArray.map((data, index) => {
          locationsArray[index].distance = computeDistance([location?.coords?.latitude, location?.coords?.longitude], [
            data?.latitude,
            data?.longitude,
          ])
        })
        locationsArray?.sort(function (a, b) { return a.distance - b.distance })
        return locationsArray;
      }

      return [];
    } catch (error) {
      console.log("Charger Location Error", error)
    }
  }

  const { data, status, isLoading, isRefetching, refetch } = useQuery('MapData', chargerLocations, {
    refetchInterval: 15000,
  })

  const getLocationAndAnimate = async (reload) => {
    try {
      setLocationLoading(true)
      Geolocation.getCurrentPosition(info => {

        setLocation(info)
        setLocationLoading(false)
      }, error => {
        console.log(error)
      })

    } catch (error) {
      setLocationLoading(false);
      console.log(error);
    }
  }



  const onFilterClick = useCallback((filterByConnectorCategories, onlyAvailableConnectors) => {

    let tlocationsPayload = {
      onlyAvailableConnectors: onlyAvailableConnectors,
      filterByConnectorCategories: filterByConnectorCategories
    }

    setLocationsPayload(tlocationsPayload)
  }, [locationsPayload])


  const cardDetailsHandler = (data) => {
    navigation.navigate(routes.ChargingStation, {
      data: data
    })
  }




  return (
    <View style={styles.container}>
      {selectedTab == 'List' ? <MapList data={data} isRefetching={isRefetching} location={location} setOpenFilterModal={setOpenFilterModal} /> : <MapCharger location={location} data={data} isLoading={isLoading} locationLoading={locationLoading} chargingBtnHandler={chargingBtnHandler} selectedMarker={selectedMarker} />}
      {/* Top Tab */}
      <View style={styles.topTab}>
        <View style={styles.topTabInner}>
          {selectedTab != 'List' ?
            <DenseCard paddingLeft={40} paddingRight={40} padding={7} marginVertical={2} margin={2}>
              <TouchableOpacity onPress={listButtonHandler} >
                <CommonText showText={'Map'} fontSize={16} customstyles={{ color: scheme == 'dark' ? selectedTab != 'List' ? colors.green : colors.white : selectedTab != 'List' ? colors.mapTitle : colors.white }} />
              </TouchableOpacity>
            </DenseCard>
            : <TouchableOpacity onPress={mapButtonHandler}
              style={[styles.tabContainer]}>
              <CommonText showText={'Map'} fontSize={16} customstyles={{ color: scheme == 'dark' ? selectedTab != 'List' ? colors.green : colors.white : selectedTab != 'List' ? colors.mapTitle : colors.white }} />
            </TouchableOpacity >
          }

          {selectedTab == 'List' ? <DenseCard paddingLeft={40} paddingRight={40} padding={7} marginVertical={2} margin={2}>
            <TouchableOpacity onPress={listButtonHandler} >
              <CommonText showText={'List'} fontSize={16} customstyles={{ color: scheme == 'dark' ? selectedTab == 'List' ? colors.green : colors.white : selectedTab == 'List' ? colors.mapTitle : colors.white }} />
            </TouchableOpacity>
          </DenseCard> : <TouchableOpacity onPress={listButtonHandler} style={[styles.tabContainer]}>
            <CommonText showText={'List'} fontSize={16} customstyles={{ color: scheme == 'dark' ? selectedTab == 'List' ? colors.green : colors.white : selectedTab == 'List' ? colors.mapTitle : colors.white }} />
          </TouchableOpacity>
          }
        </View>

        {selectedTab == 'List' && <TouchableOpacity onPress={filterButtonHandler}
          style={{ position: 'absolute', right: -70 }}>
          <CommonCard>
            <FilterSvg fill={scheme == 'dark' ? colors.white : colors.black} />
          </CommonCard>
        </TouchableOpacity>}
      </View>

      {/* Fillter ,favrouite,scan ,search Button  */}
      <View style={styles.iconContainer}>
        {selectedTab != 'List' && <View style={styles.iconContainer1}>
          <CommonCard>
            <TouchableOpacity onPress={favButtonHandler}>
              <AntDesign name='hearto' color={colors.red} size={22} />
            </TouchableOpacity>
          </CommonCard>

          <CommonCard>
            <TouchableOpacity onPress={filterButtonHandler}>
              <FilterSvg fill={scheme == 'dark' ? '#FAFAFA' : '#000'} />
            </TouchableOpacity>
          </CommonCard>

          <CommonCard>
            <TouchableOpacity onPress={scannerButtonHandler}>
              <MaterialIcons name='qr-code-scanner' color={scheme == 'dark' ? colors.white : colors.black} size={22} />
            </TouchableOpacity>
          </CommonCard>
        </View>}

        {true && selectedTab != 'List' &&
          <CommonCard padding={0} margin={1}>
            <View >
              <CommonText showText={'Show charging station nearest to'} fontSize={17} customstyles={{ marginVertical: 8 }} />
              <View style={styles.searchInnerContainer}>
                <View style={{ width: '80%' }}>
                  <DenseCard >
                    <TouchableOpacity style={styles.searchBox} onPress={searchBtnHandler}>
                      <AntDesign name='search1' size={20} />
                      <CommonText showText={'Your Location'} margin={6} />
                    </TouchableOpacity>
                  </DenseCard>
                </View>
                <CommonCard>
                  <TouchableOpacity style={styles.locationBtn} onPress={locationBtnHandler}>
                    <LocationSvg fill={scheme == 'dark' ? 'white' : 'black'} />
                  </TouchableOpacity>
                </CommonCard>
              </View>
            </View>
          </CommonCard>
        }

        {selectedTab != 'List' && selectedCharger &&
          <FlatList
            horizontal={true}
            data={data || []}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <DetailsCard chargerType={1} item={item} onPress={() => cardDetailsHandler(item)} />
              )
            }
            }
          />

        }
      </View>
      {/* Render List Component */}

      <FilterModal openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} onFilterClick={onFilterClick} />
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
    paddingVertical: 3,
    paddingHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12
  },
  tabContainer: {
    // padding:10,
    paddingLeft: 40,
    paddingRight: 40,

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

  searchInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',

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
