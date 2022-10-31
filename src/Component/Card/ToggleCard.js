import { View,  StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import colors from '../../Utils/colors'
import { Switch } from 'react-native-paper';
import IconCard from './IconCard'
import CommonText from '../Text/CommonText'

const ToggleCard = ({Svg,showText,fontSize}) => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
        <View style={styles.card} >
            <View style={styles.leftContainer}>
                <IconCard Svg={Svg} />
                <View style={styles.middleContainer}>
                    <CommonText showText={showText} fontSize={fontSize}/>
                </View>
            </View>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.green} />
        </View>
  )
}

const styles =StyleSheet.create({
   
    card:{
        paddingVertical:scale(14),
        paddingHorizontal:scale(10),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:5,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.1,
        shadowRadius: 3.05,
        elevation: 4,
        marginVertical:9,
        backgroundColor:'#FFF'
        // marginHorizontal:5
    },
    leftContainer:{flexDirection:'row',alignItems:'center'},
icon:{paddingVertical:scale(15),paddingHorizontal:scale(18),backgroundColor:colors.greenBackground,borderRadius:5},
middleContainer:{marginLeft:scale(15)},
deleteIcon:{
    elevation:10,
    // borderWidth:1,
    backgroundColor:'#FFF',paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:10
}

})

export default ToggleCard