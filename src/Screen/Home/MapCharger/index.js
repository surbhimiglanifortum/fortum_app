import { View, Text, StyleSheet,useColorScheme } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import MapView from "react-native-map-clustering";
import { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import AvailMarker from '../../../assests/svg/AvailMarker'
import DarkMap from '../../../Utils/DarkMapView.json'
import LighMapView from '../../../Utils/LighMapView.json'

export default function index({ data, locationLoading, isLoading, chargingBtnHandler, location }) {
    const [visibleRegion, setVisibleRegion] = useState([0, 0, 0, 0])


    const mapRef = useRef();

    const scheme = useColorScheme()

    useEffect(() => {
        if (location?.coords) {
            mapRef.current.animateToRegion({
                latitude: location?.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025
            }, 2000);
        }

    }, [location])
    

    return (
        <>
            
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                toolbarEnabled={false}
                customMapStyle={scheme=='dark'?DarkMap:LighMapView}
                onRegionChangeComplete={(r) => {
                    const getBoundingBox = (region) => ([
                        region.longitude - region.longitudeDelta / 2, // westLng - min lng
                        region.latitude - region.latitudeDelta / 2, // southLat - min lat
                        region.longitude + region.longitudeDelta / 2, // eastLng - max lng
                        region.latitude + region.latitudeDelta / 2 // northLat - max lat
                    ])
                    setVisibleRegion(getBoundingBox(r))
                }}
                showsMyLocationButton={false}
                onMarkerPress={(e) => {
                                       
                    if (locationLoading) {
                        return false;
                    }
                    let marker = data;
                    marker = marker.find((item) => {
                        // marker
                        if (parseFloat(item.latitude) === e.nativeEvent.coordinate.latitude &&
                            parseFloat(item.longitude) === e.nativeEvent.coordinate.longitude) {

                            return true
                        }
                    })
                    if (marker) {
                       
                        selectedMarker = marker
                        chargingBtnHandler()
                       
                    }
                }}
                showsCompass={false}
                showsUserLocation
                style={styles.map}
                initialRegion={{
                    latitude: 23.313561,
                    longitude: 78.2863013,
                    latitudeDelta: 50.4922,
                    longitudeDelta: 0.0521,
                }}
            >
                { 
                    data?.map((item, index) => {
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
            </MapView>
        </>
    )
}


const styles = StyleSheet.create({
    map: {
        flex: 1
    },
})