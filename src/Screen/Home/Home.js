import React, { useEffect, useContext, useState, useRef } from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, Text, View } from 'react-native'
import { Marker } from 'react-native-maps';
import MapView from "react-native-map-clustering";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
});

export default () => {


  const mapRef = useRef();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
    </View>
  )

};