import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DetailsCard from '../../../Component/Card/DetailsCard'

const MapList = () => {

  const [listData,setListData]=useState([])

  return (
    <View style={[styles.container]}>
      <ScrollView>
      <View style={styles.innerContainer}>

        {/* Render Details Card */}
        {
          [1,1,1].map((item,ind)=>{
            return(
             <View key={ind}>
               <DetailsCard chargerType={1} item={item} />
              </View>
            )
          })
        }
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 60
  }
})

export default MapList