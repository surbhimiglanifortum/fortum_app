import React, { useEffect, useContext, useState, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, FlatList } from 'react-native'
import colors from '../../Utils/colors';
import MapList from './ChargerList/MapList';
import IconCardWithoutBg from '../../Component/Card/IconCardWithoutBg';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FilterSvg from '../../assests/svg/FilterSvg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import routes from '../../Utils/routes';
import FilterModal from '../../Component/Modal/FilterModal';
import LocationSvg from '../../assests/svg/LocationSvg';
import DetailsCard from '../../Component/Card/DetailsCard';
import Geolocation from '@react-native-community/geolocation';
import { computeDistance } from '../../Utils/helperFuncations/computeDistance';
import SnackContext from '../../Utils/context/SnackbarContext';
import { useQuery } from 'react-query'
import { API, Auth } from 'aws-amplify'
import * as ApiAction from '../../Services/Api'
import MapCharger from '../Home/MapCharger'
import CommonText from '../../Component/Text/CommonText';
import { useSelector } from 'react-redux'
import CommonCard from '../../Component/Card/CommonCard'
import DenseCard from '../../Component/Card/DenseCard'
import TTNCNotificationDialog from '../../Component/Modal/TNCNotificationDialog'
import { useDispatch } from 'react-redux'
import { AddToRedux } from '../../Redux/AddToRedux';
import * as Types from '../../Redux/Types'

let selectedMarker = {}
let mLocationPayload = {}
export default Home = ({ navigatedata }) => {
  const isFocused = useIsFocused()
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
  const [tncNotification, setTncNotification] = useState(false)
  const [mLocation, setMLocation] = useState([])
  const dispatch = useDispatch()

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const checkActiveSession = useSelector((state) => state.TempStore.checkActiveSession);

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

  const { setOpenCommonModal } = useContext(SnackContext)

  const CallCheckActiveSession = async () => {
    console.log(checkActiveSession)
    if (checkActiveSession) {
      console.log("CHECK actove session")
      if (mUserDetails?.username) {
        const response = await ApiAction.chargingList(mUserDetails.username)
        console.log(response.data)
        if (response.data && response.data.length > 0) {

          setOpenCommonModal({
            isVisible: true, message: `You have an ongoing charging session at Charger ${response.data[0]?.location?.name} please stop the session if you have done charging!`,
            heading: "Ongoing Session",
            secondButton: {
              onPress: () => {

              },
              title: "Ignore"
            },
            onOkPress: () => {
              navigation.navigate(routes.OngoingDetails, {
                locDetails: {
                  ...response.data[0]?.location, address: {
                    "city": response.data[0]?.location?.city,
                    "street": response.data[0]?.location?.address,
                    "countryIsoCode": "IND",
                    "postalCode": "11112"
                  }
                },
                evDetails: response.data[0]?.location?.evses[0],
                paymentMethod: response?.payments?.payment_method
              })
            }
          })
        }
        dispatch(AddToRedux(false, Types.CHECKACTIVESESSION))
      }
    } else {
      console.log("dont CHECK actove session")
    }
  }

  const userDetailsUpdated = async () => {
    const result = await ApiAction.getUserDetails()
    if (result.data) {
      dispatch(AddToRedux(result.data, Types.USERDETAILS))
    }
  }

  useEffect(() => {
    console.log("begore refeth", locationsPayload)
    mLocationPayload = locationsPayload
    refetch({ jhsgd: "SLJ" })
    CallCheckActiveSession()
  }, [location, locationsPayload])

  useEffect(() => {
    getLocationAndAnimate()
    userDetailsUpdated()
  }, [])

  useEffect(() => {
    setTncNotification(!tncNotification)
  }, [isFocused])
 

  const { data, status, isLoading, isRefetching, refetch, refetc } = useQuery('MapData', async () => {
    {
      // console.log("SDKS", context)
      try {

        const payload = { ...mLocationPayload, username: mUserDetails?.username || "" }
        if (payload?.filterByConnectorCategories) {
          Object.keys(payload?.filterByConnectorCategories)?.length <= 0 ? delete payload.filterByConnectorCategories : null
        }

        console.log("final payload_____", payload)
        const res = await ApiAction.getLocation(payload)
        console.log("dskjsajbd", res.data)
        var locationsArray = res.data?.locations[0];
        if (!location.coords) {

        } else {
          if (locationsArray.length > 0) {
            locationsArray.map((data, index) => {
              locationsArray[index].distance = computeDistance([location?.coords?.latitude, location?.coords?.longitude], [
                data?.latitude,
                data?.longitude,
              ])
            })
            locationsArray?.sort(function (a, b) { return a.distance - b.distance })

          }
        }
        setMLocation(locationsArray)
        return locationsArray;
      } catch (error) {
        console.log("Charger Location Error", error)
      }
    }
  }, {
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
    console.log("onFilterClick", filterByConnectorCategories, onlyAvailableConnectors)
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
      <CommonText>{JSON.stringify(mLocation?.length)}</CommonText>
      {selectedTab == 'List' ? <MapList data={mLocation} isRefetching={isRefetching} location={location} setOpenFilterModal={setOpenFilterModal} searchBtnHandler={searchBtnHandler} /> : <MapCharger location={location} data={data} isLoading={isLoading} locationLoading={locationLoading} chargingBtnHandler={chargingBtnHandler} selectedMarker={selectedMarker} />}
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
                <DetailsCard location={location} chargerType={1} item={item} onPress={() => cardDetailsHandler(item)} />
              )
            }
            }
          />

        }
      </View>
      {/* Render List Component */}

      <FilterModal openFilterModal={openFilterModal} setOpenFilterModal={setOpenFilterModal} onFilterClick={onFilterClick} />
      <TTNCNotificationDialog tncNotification={tncNotification} />
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
