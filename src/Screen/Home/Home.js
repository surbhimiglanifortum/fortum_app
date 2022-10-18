import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const Map = () => {
  return (
      <View style={{flex:1,backgroundColor:'#FAFAFA'}}>
        {/* <ScrollView nestedScrollEnabled={true}>       */}
            {[1,1,11,1,1,1,,1,1,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,,1,1,1,1,,1,1,1,1,1,,1,1,1,1,,1,1,1,1,,1,1,1,1,1,1,1,,1,1,].map((item,ind)=>{
        return(
            <View key={ind} style={{borderWidth:1}}>
                <Text style={{paddingVertical:40}}>Map</Text>
            </View>
        )
      })}

      {/* </ScrollView> */}
    </View>
  )
}

export default Map