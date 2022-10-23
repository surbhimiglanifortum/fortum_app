import React, { useEffect, useContext, useState, useRef } from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Marker } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import BlackText from '../../Component/Text/BlackText';
import colors from '../../Utils/colors';
import MapList from './MapList/MapList';

export default Home = () => {

  const mapRef = useRef();

  const [selectedTab, setSelectedTab] = useState('Map')
  const mapButtonHandler = () => {
    setSelectedTab('')
  }
  const listButtonHandler = () => {
    setSelectedTab('List')
  }
  return (
    <View style={styles.container}>

      {selectedTab != 'List' && <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>}

      <View style={styles.topTab}>
       <View style={styles.topTabInner}>
       <TouchableOpacity onPress={mapButtonHandler}
          style={[styles.tabContainer]}>
          <BlackText showText={'Map'} fontSize={16} />
        </TouchableOpacity >
        <TouchableOpacity onPress={listButtonHandler} style={[styles.tabContainer]}>
          <BlackText showText={'List'} fontSize={16} />
        </TouchableOpacity>
       </View>
      
      </View>

      <View >
      {/* Render List Component */}
      { selectedTab=='List' && <MapList />}
      </View>

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
    alignSelf:'center',
  },
  topTabInner: {
    backgroundColor: colors.greenBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabContainer: {
    width: 70,
    alignItems: 'center'
  }

});
