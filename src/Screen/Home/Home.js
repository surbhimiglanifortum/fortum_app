import React, { useEffect, useContext, useState, useRef, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme, FlatList, BackHandler } from 'react-native'
import colors from '../../Utils/colors';
import MapList from './ChargerList/MapList';
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
import { Auth } from 'aws-amplify'
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
import axios from '../../Services/BaseUrl'
import * as axiosLib from 'axios'
import appConfig from '../../../appConfig'

let selectedMarker = ""
let mLocationPayload = {}
let flatListBottomList
let backHandler

export default Home = ({ navigatedata, tabName, unpaidSessionlist }) => {

  const isFocused = useIsFocused()
  const mapRef = useRef();
  flatListBottomList = useRef();
  const navigation = useNavigation()
  const [location, setLocation] = useState({})
  const [selectedTab, setSelectedTab] = useState('Map')
  const [selectedCharger, setSelectedCharger] = useState(false)
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  // const [unpaidSessionlist, setUnpaidSession] = useState([])
  const [locationsPayload, setLocationsPayload] = useState({
    onlyAvailableConnectors: false,
  })
  const [tncNotification, setTncNotification] = useState(false)
  const [mLocation, setMLocation] = useState([])
  const dispatch = useDispatch()
  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
  const checkActiveSession = useSelector((state) => state.TempStore.checkActiveSession);
  const userLocation = useSelector((state) => state.commonReducer.userLocations)
  // let unPaidSeesion = useSelector((state) => state.UnPaidReducer?.unPaid);

  const scheme = useColorScheme()

  const mapButtonHandler = () => {
    setSelectedTab('')
  }
  const listButtonHandler = () => {
    setSelectedTab('List')
  }

  const favButtonHandler = async () => {
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

  const filterButtonHandler = () => {
    setOpenFilterModal(true)
  }

  // const backAction = () => {
  //   console.log("Check Filter", openFilterModal)
  //   if (openFilterModal) {
  //     setOpenFilterModal(false)
  //     return true
  //   }
  //   return false
  // }

  // useEffect(() => {
  //   console.log("hardwa")
  //   backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
  //   return () => {
  //     backHandler.remove()
  //   }
  // }, [])

  const handleSelection = async (screen, payload) => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      if (result?.signInUserSession) {
        if (result.attributes.phone_number && result.attributes.phone_number != '') {
          navigation.navigate(screen, payload)
        } else {
          navigation.navigate(routes.MobileInput, { email_id: result.attributes.email })
        }
        return
      }
    } catch (error) {
      console.log("Error in handleSelection", error)
    }
    navigation.navigate(routes.login)
  }

  const scannerButtonHandler = () => {
    if (unpaidSessionlist?.length > 0) {
      setOpenCommonModal({
        isVisible: true, message: "You have an unpaid session",
        onOkPress: () => {
          isVisible = false
        }
      })
      return

    }
    handleSelection(routes.QrScanner)
  }

  const searchedLocation = (payload) => {
    setLocation({
      coords: {
        latitude: payload.lat,
        longitude: payload.lng
      }
    })
    dispatch(AddToRedux(location, Types.USERLOCATIONS))
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

  const chargingBtnHandler = (e, marker_id) => {
    console.log("chargingBtnHandler", marker_id, selectedMarker)
    if (selectedMarker === marker_id) {
      if (selectedCharger) {
        setSelectedCharger(false)
      } else {
        setSelectedCharger(true)
      }
      // setSelectedCharger(false)
    } else {
      setSelectedCharger(true)
    }

    selectedMarker = marker_id

    if (selectedCharger) {
      try {
        flatListBottomList?.current?.scrollToIndex({ index: e })
      } catch (error) {
        console.log("Error in chargingBtnHandler", error)
      }
    } else {

      setTimeout(() => {
        try {
          flatListBottomList?.current?.scrollToIndex({ index: e })
        } catch (error) {
          console.log("Error in chargingBtnHandler setTimeout", error)
        }
      }, 2000);
    }
  }

  const { setOpenCommonModal } = useContext(SnackContext)

  const CallCheckActiveSession = async () => {
    console.log(checkActiveSession)
    const result = await Auth.currentAuthenticatedUser();
    if (result.signInUserSession) {
      if (checkActiveSession) {
        if (mUserDetails?.username) {
          const response = await ApiAction.chargingList(mUserDetails.username)
          console.log(response.data)
          if (response.data && response.data.length > 0) {
            setOpenCommonModal({
              isVisible: true, message: `You have an ongoing charging session at Charger ${response.data[0]?.location?.name} please stop the session if you have done charging!`,
              heading: "Ongoing Session",
              showBtnText: "Stop",
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
        console.log("don't CHECK active session")
      }
    }
  }

  const userDetailsUpdated = async () => {
    const result = await ApiAction.getUserDetails()
    if (result.data) {
      dispatch(AddToRedux(result.data, Types.USERDETAILS))
    }
  }

  useEffect(() => {
    mLocationPayload = locationsPayload
    refetch({ jhsgd: "SLJ" })
    CallCheckActiveSession()
  }, [locationsPayload, userLocation])

  const addInterceptor = async () => {
    const result = await Auth.currentAuthenticatedUser();
    if (result.signInUserSession) {
      axios.interceptors.request.use(async (config) => {
        // console.log("AUTH ",Auth)
        const token = await Auth.currentSession().catch(err => { console.log(err) });
        try {
          if (token)
            config.headers.Authorization = token.getIdToken().getJwtToken();
          config.headers.username = result.attributes.email

        } catch (e) {
          console.log(e)
        }
        config.headers['App_ver'] = appConfig?.APP_VERSION;
        // console.log("interceptror", config)
        return config;
      });

      axiosLib.interceptors.request.use(async (config) => {
        // console.log("AUTH ",Auth)
        const token = await Auth.currentSession().catch(err => { console.log(err) });
        try {
          if (token)
            config.headers.Authorization = token.getIdToken().getJwtToken();
          config.headers.username = result.attributes.email

        } catch (e) {
          console.log(e)
        }
        config.headers['App_ver'] = appConfig?.APP_VERSION;
        // console.log("interceptror", config)
        return config;
      });


    }
  }
  useEffect(() => {
    addInterceptor().then(r => {
      userDetailsUpdated()
    })
    getLocationAndAnimate()
  }, [])

  useEffect(() => {
    setTncNotification(!tncNotification)
  }, [isFocused])


  const { data, status, isLoading, isRefetching, refetch } = useQuery('MapData', async () => {
    {
      try {

        const payload = { ...mLocationPayload, username: mUserDetails?.username || "" }
        if (payload?.filterByConnectorCategories) {
          Object.keys(payload?.filterByConnectorCategories)?.length <= 0 ? delete payload.filterByConnectorCategories : null
        }

        const res = await ApiAction.getLocation(payload)
        var locationsArray = res.data?.locations[0];
        if (!userLocation?.coords) {

        } else {
          if (locationsArray.length > 0) {
            locationsArray.map((data, index) => {
              locationsArray[index].distance = computeDistance([userLocation?.coords?.latitude, userLocation?.coords?.longitude], [
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
        dispatch(AddToRedux(info, Types.USERLOCATIONS))
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

  useEffect(() => {

  }, [unpaidSessionlist])


  return (
    <View style={styles.container}>
      {selectedTab == 'List' ? <MapList data={mLocation} isRefetching={isRefetching} location={location} setOpenFilterModal={setOpenFilterModal} searchBtnHandler={searchBtnHandler} setSelectedTab={setSelectedTab} refetch={refetch}  unpaidSessionlist={unpaidSessionlist} /> : <MapCharger location={location} data={data} isLoading={isLoading} locationLoading={locationLoading} chargingBtnHandler={chargingBtnHandler} />}
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
              <CommonText showText={`List`} fontSize={16} customstyles={{ color: scheme == 'dark' ? selectedTab == 'List' ? colors.green : colors.white : selectedTab == 'List' ? colors.mapTitle : colors.white }} />
            </TouchableOpacity>
          </DenseCard> : <TouchableOpacity onPress={listButtonHandler} style={[styles.tabContainer]}>
            <CommonText showText={`List`} fontSize={16} customstyles={{ color: scheme == 'dark' ? selectedTab == 'List' ? colors.green : colors.white : selectedTab == 'List' ? colors.mapTitle : colors.white }} />
          </TouchableOpacity>
          }
        </View>

        {unpaidSessionlist?.length > 0 && selectedTab != 'List' && <View style={{ position: 'absolute', top: 60, paddingVertical: 8, backgroundColor: colors.redLight, paddingHorizontal: 25, elevation: 5, borderRadius: 10 }}>
          <CommonText showText={'You have an unpaid session'} regular customstyles={{ color: colors.red }} />
        </View>}

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

        {selectedTab != 'List' && !selectedCharger &&

          <CommonCard padding={0} margin={1}>
            <View >
              <CommonText showText={'Showing Chargers nearest to'} fontSize={17} customstyles={{ marginVertical: 8 }} />
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

        {true && selectedTab != 'List' && selectedCharger &&
          <View>
            <FlatList
              ref={flatListBottomList}
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
          </View>

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
