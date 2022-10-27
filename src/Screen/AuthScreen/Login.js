import { View, Text, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import SkipButton from '../../Component/Button/SkipButton';
import CommonText from '../../Component/Text/CommonText';
import BlackText from '../../Component/Text/BlackText';
import Textinput from '../../Component/Textinput/Textinput';
import Button from '../../Component/Button/Button';
import SmallButton from '../../Component/Button/SmallButton';
import GreenText from '../../Component/Text/GreenText';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FaceBookSvg from '../../assests/svg/FaceBookSvg';
import GoogleSvg from '../../assests/svg/GoogleSvg';

const Login = () => {

  const navigation = useNavigation()
  const scheme = useColorScheme();

  const continueButtonHandler = async () => {
    try {
      // await AsyncStorage.removeItem('@viewedOnboarding',);
      navigation.navigate(routes.Verification)
    } catch (error) {

    }
  }

  const signupHandler = () => {
    navigation.navigate(routes.Signup)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <SkipButton />
          <View style={styles.imageContainer}>
            <CarLogo />
          </View>
          <View>
            {scheme == 'dark' ? <CommonText showText={'WelCome !'} fontSize={20} /> : <BlackText showText={'WelCome !'} fontSize={20} />}
          </View>
          <View style={styles.textinputConatiner}>
            {scheme == 'dark' ? <CommonText showText={'Please enter your mobile number or email id'} fontSize={12} /> : <BlackText showText={'Please enter your mobile number or email id'} fontSize={12} />}
            <Textinput placeholder={'Mobile Number / email id'} />
          </View>
          <TouchableOpacity style={styles.button} >
            <Button onPress={continueButtonHandler} showText={'Continue'} />
          </TouchableOpacity>
          <View style={styles.centerText}>
            {scheme == 'dark' ? <CommonText showText={'Or Sign in with'} fontSize={12} /> : <BlackText showText={'Or Sign in with'} fontSize={12} />}
          </View>
          <View style={styles.bottomButton}>
            {/* show google and facebook icon */}
            <SmallButton Svg={GoogleSvg} />
            <SmallButton Svg={FaceBookSvg} />
          </View>
          {/* to be removed later */}
          
          {/* <View style={{borderWidth:1,backgroundColor:colors.black,
          overflow:'hidden',
          elevation:10,borderRadius:5}}>
            <View style={{borderWidth:1,backgroundColor:colors.backgroundDark,paddingVertical:10,paddingHorizontal:10,overflow:'hidden',elevation:10,shadowOffset:{
              width: -5,
              height: -5
            }}}>
              <Text>hh</Text>
            </View>
          </View> */}
          <View style={styles.bottomText}>
            {scheme == 'dark' ? <CommonText showText={'Don’t have account? '} fontSize={12} /> : <BlackText showText={'Don’t have account? '} fontSize={12} />}
            <TouchableOpacity onPress={signupHandler}>
              <GreenText showText={'Signup'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center'
  },
  textinputConatiner: {
    marginVertical: 15
  },
  button: {
    marginVertical: 15
  },
  centerText: {
    marginTop: 20,
    alignItems: 'center'
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  bottomText: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50
  },
  imageContainer: {
    marginVertical: 25
  }
})

export default Login