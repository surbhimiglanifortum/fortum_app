import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
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
import CommonCard from '../../../Component/Card/CommonCard'
import DensCard from '../../../Component/Card/DenseCard'
import { Auth } from 'aws-amplify'


const MapList = ({ data, setOpenFilterModal, isRefetching, location, searchBtnHandler }) => {

  const navigation = useNavigation()
  const [listData, setListData] = useState([])



  const { currentLocation, setCurrentLocation, } = useContext(SnackContext)

  const filterButtonHandler = () => {
    setOpenFilterModal(true)
  }
  const searchButtonHandler = () => {
    searchBtnHandler()
  }
  const favoruiteButtonHandler = () => {
    navigation.navigate(routes.Favoruite, { location: location })
  }
  const cardDetailsHandler = async (data) => {

    try {
      
      const result = await Auth.currentAuthenticatedUser();

        if (result.attributes.phone_number && result.attributes.phone_number != '') {
          navigation.navigate(routes.ChargingStation, {
            data: data
          })
        } else {
          navigation.navigate(routes.MobileInput)
        }
    } catch (error) {
      
      navigation.navigate(routes.login)
    }
   
  }
    return (
      <View style={[styles.container]}>


        <View style={styles.innerContainer}>

          <View style={styles.searchContainer}>
            <CommonCard padding={1} style={{ flex: 1 }}>
              <TouchableOpacity onPress={searchButtonHandler} style={styles.searchInner}>
                <DensCard padding={10} margin={1} marginVertical={1}>
                  <AntDesign name='search1' size={16} />
                </DensCard>
                <CommonText regular showText={'    Random Location'} />
              </TouchableOpacity>
            </CommonCard>


            <CommonCard padding={16}>
              <TouchableOpacity onPress={favoruiteButtonHandler} style={styles.favContainer}>
                <AntDesign name='hearto' color={colors.red} size={20} />
              </TouchableOpacity>
            </CommonCard>
          </View>



          {isRefetching && <Loader />}

          <FlatList
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

      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 80
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
      paddingVertical: 10,
      paddingHorizontal: 6,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center'
    },
    favContainer: {
    }
  })

  export default MapList