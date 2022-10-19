import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import Card from '../../Component/Card/Card'
import { useNavigation } from '@react-navigation/native'
import routes from '../../Utils/routes'
import BackSvg from '../../assests/svg/back'
import Textinput from '../../Component/Textinput/Textinput'
import LocationCard from '../../Component/Card/LocationCard'
import PersonalCodeCard from '../../Component/Card/PersonalCodeCard'
import DeleteCard from '../../Component/Card/DeleteCard'
import ToggleCard from '../../Component/Card/ToggleCard'
import DetailsCard from '../../Component/Card/DetailsCard'
import AddRemoveCard from '../../Component/Card/AddRemoveCard'

const Charging = () => {
const navigation=useNavigation()
    const [selectedTab,setSelectedTab]=useState('ongoing')

const ongoingBtnHandler=()=>{
    setSelectedTab('ongoing')
}
const completedBtnHandler=()=>{
    setSelectedTab('completed')
}

const navigationHandler=()=>{
    if(selectedTab=='ongoing'){
        navigation.navigate('OngoingDeatils')
    }   
    else if(selectedTab=='completed'){
        navigation.navigate(routes.taxInvoice) 
    }
}
    return (
        <View style={styles.conatiner}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                  
                    <Text style={styles.headerText}>Charging</Text>
                
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={ongoingBtnHandler} style={[styles.tabButton,{backgroundColor:selectedTab=='ongoing'?'#FFF':'#5AC37D'}]}>
                        <Text style={[{color:selectedTab=='ongoing'?'#000':'#FFF'}]}>Ongoing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={completedBtnHandler} style={[styles.tabButton,{backgroundColor:selectedTab=='completed'?'#FFF':'#5AC37D'}]}>
                        <Text style={[{color:selectedTab=='completed'?'#000':'#FFF'}]}>Completed</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    { selectedTab=='ongoing' && <Card tabName={"ongoing"} navigationHandler={navigationHandler} />}
                    
                    { selectedTab=='completed' && <Card tabName={'completed'} navigationHandler={navigationHandler}/>}
                </View>
                {<Textinput />}
                {<LocationCard />}
                {<PersonalCodeCard />}
                {<DeleteCard />}
                {<ToggleCard />}
                {<DetailsCard />}
                {<AddRemoveCard  />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        // backgroundColor:'#fff'
    },
    innerContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: scale(10)
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'  ,
        marginVertical:10
    },
    headerText:{
fontSize:scale(17),
    },
    iconContainer:{
        borderWidth:1,
        paddingVertical:scale(3),
        paddingHorizontal:scale(15),
        borderRadius:2,
        overflow:'hidden',
        borderColor:'#EFEFEF',
        elevation:2
    },
    tabContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:scale(15),
        backgroundColor:'#5AC37D',
        // width:'60%',
        // alignSelf:'center',
        paddingVertical:8,
        borderRadius:5,
        paddingHorizontal:10,
        justifyContent:'space-between'
    },
    tabButton:{
        // borderWidth:1,
        backgroundColor:'#FFF',
        paddingVertical:5,
        paddingHorizontal:15,
        borderRadius:3,
        width:'50%',
        alignItems:'center'
    }
})

export default Charging