import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, FlatList } from 'react-native'
import React, { useMemo } from 'react'
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
import CommonText from '../../Component/Text/CommonText'
import * as Types from '../../Redux/Types'
import { AddToRedux } from '../../Redux/AddToRedux'

const Favoruite = ({ route }) => {

  const { location } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const scheme = useColorScheme()
  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
  let favChargers = useSelector((state) => state.commonReducer.favCharger);

  // console.log(dispatch)
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
          renderItem={({ item }) => <DetailsCard location={location} item={item} favourite={true} />}
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