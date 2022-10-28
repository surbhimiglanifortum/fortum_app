import { View, Text, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FaceBookSvg from '../../assests/svg/FaceBookSvg';
import GoogleSvg from '../../assests/svg/GoogleSvg';
import { validatePhone, validateEmail } from '../../Utils/HelperCommonFunctions'


const Login = () => {



  const [userInput, setuserInput] = useState('y.anuj98@gmail.com')
  const [loading, setLoading] = useState(false)
  useEffect(() => {


    const signup = async () => {
      console.log("Login")
      const { user } = await Auth.signUp({
        username: "anuj.yadav@mfilterit.com",
        password: "@Nujyadav123",
        attributes: {
          "custom:phoneUser": "false",
          email: "anuj.yadav@mfilterit.com",          // optional
          phone_number: "+917532078797",   // optional - E.164 number convention
          // other custom attributes c
        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      }).catch(e => {
        console.log("error", e)
      })

      console.log("response", user ? user : "no found")
    }

    const signin = async () => {
      try {
        const user = await Auth.signIn("anuj.yadav@mfilterit.com", "@Nujyadav123");
        console.log("Lofoin0,", user)
      } catch (error) {
        console.log('error signing in', error);
      }
    }

    const resendConfirmation = async () => {
      try {
        await Auth.resendSignUp("anuj.yadav@mfilterit.com");
        console.log('code resent successfully');
      } catch (err) {
        console.log('error resending code: ', err);
      }

    }

    async function confirmSignUp() {
      try {
        await Auth.confirmSignUp('anuj.yadav@mfilterit.com', '742173');
      } catch (error) {
        console.log('error confirming sign up', error);
      }
    }

    // signup()
    // confirmSignUp()
    // signin()
    // resendConfirmation()
    return () => {

    }
  }, [])


  const navigation = useNavigation()
  const scheme = useColorScheme();

  try {
    // await AsyncStorage.removeItem('@viewedOnboarding',);
  } catch (error) {

  }


  const continueButtonHandler = async () => {
    setLoading(true)
    try {
      const user = await Auth.signIn(userInput);
      console.log("ajsbjds", user)

      if (user) {
        // user found navigate to otp
        console.log("SKJHDGSHGS", validatePhone(userInput), validateEmail(userInput))
        if (validatePhone(userInput)) {
          // navigate to mobile input

          navigation.navigate(routes.MobileVerification, {
            signin: true,
            user: user,
            mobile_number: userInput
          })
        } else if (validateEmail(userInput)) {
          // navigate to email input
          navigation.navigate(routes.Verification, {
            signin: true,
            user: user,
            email_id: userInput
          })
        }
      }
    } catch (error) {
      console.log("error",error)
      switch (error.code) {
        case 'UserNotFoundException':
          HandleUserNotFound();
          break;
        default:
          break;
      }
    }
    setLoading(false)
  }

  const HandleUserNotFound = async () => {
    const payload = {}
    if (validatePhone(userInput)) {
      payload.phone_number = userInput
    } else if (validateEmail) {
      payload.email = userInput
    }

    navigation.navigate(routes.Signup, {
      phone_number: userInput
    })
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
            <Textinput value={userInput} onChange={setuserInput} placeholder={'Mobile Number / email id'} />
          </View>
          <TouchableOpacity style={styles.button} >
            <Button onPress={continueButtonHandler} onLoading={loading} setOnLoading={setLoading} showText={'Continue'} />
          </TouchableOpacity>
          <View style={styles.centerText}>
            {scheme == 'dark' ? <CommonText showText={'Or Sign in with'} fontSize={12} /> : <BlackText showText={'Or Sign in with'} fontSize={12} />}
          </View>
          <View style={styles.bottomButton}>
            {/* Add google and facebook icon */}
            {/* <SmallButton /> */}
          </View>
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

export default Login;