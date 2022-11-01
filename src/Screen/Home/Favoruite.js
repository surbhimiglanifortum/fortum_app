import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../../Utils/colors'
import Header from '../../Component/Header/Header'
import DetailsCard from '../../Component/Card/DetailsCard'
import CommonView from '../../Component/CommonView'
import * as ApiAction from '../../Services/Api'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { computeDistance } from '../../Utils/helperFuncations/computeDistance';

const Favoruite = ({ location }) => {

  const navigation = useNavigation()
  const scheme = useColorScheme()
  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);

  const { data, isFetching } = useQuery("FavouriteData", async () => {
    const result = await ApiAction.getFavouriteCHarger(mUserDetails.username)
    var locationsArray = result.data?.result

    locationsArray.map((item, index) => {
      locationsArray[index].distance = computeDistance([location.coords.latitude, location.coords.longitude], [
        item.coordinates.latitude,
        item.coordinates.longitude,
      ])
    })
    return locationsArray
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <CommonView style={styles.innerContainer}>
        <Header showText={'Favourite'} />
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => <DetailsCard item={item} />}
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