import { SafeAreaView, StyleSheet, useColorScheme, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import DetailsCard from '../../Component/Card/DetailsCard'
import CommonView from '../../Component/CommonView'
import * as ApiAction from '../../Services/Api'
import { useQuery } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { computeDistance } from '../../Utils/helperFuncations/computeDistance';
import Loader from '../../Component/Loader'
import * as Types from '../../Redux/Types'
import { AddToRedux } from '../../Redux/AddToRedux'
import routes from '../../Utils/routes'

const Favoruite = ({ route }) => {

  const { location } = route.params

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const scheme = useColorScheme()

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
  let favChargers = useSelector((state) => state.commonReducer.favCharger);

  const cardDetailsHandler = async (data) => {
    navigation.navigate(routes.ChargingStation, {
      data: {
        ...data, address: {
          "city": data?.city,
          "street": data?.address,
          "countryIsoCode": "IND",
          "postalCode": data?.postal_code
        }
      },
    })
  }



  const { data, isFetching } = useQuery("FavouriteCharger", async () => {
    const result = await ApiAction.getFavouriteCHarger(mUserDetails.username, dispatch)
    var locationsArray = result.data?.result
    if (location?.coords?.latitude) {
      locationsArray.map((item, index) => {
        locationsArray[index].distance = computeDistance([location.coords.latitude, location.coords.longitude], [
          item.coordinates.latitude,
          item.coordinates.longitude,
        ])
      })
    }
    dispatch(AddToRedux(locationsArray, Types.FAVCHARGER))

    console.log("Check result of fav API", locationsArray)
    return locationsArray
  })



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <CommonView style={styles.innerContainer}>
        <Header showText={'Favourite'} />
        {isFetching && <Loader />}
        <FlatList
          style={{ flex: 1 }}
          data={favChargers}
          renderItem={({ item }) => <DetailsCard location={location} item={item} favourite={true} onPress={() => cardDetailsHandler(item)} />}
        />
      </CommonView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 20
  },
})

export default Favoruite