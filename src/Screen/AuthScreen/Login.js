import { View, Text, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import SkipButton from '../../Component/Button/SkipButton';
import CommonText from '../../Component/Text/CommonText';
import Textinput from '../../Component/Textinput/Textinput';
import SmallButton from '../../Component/Button/SmallButton';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import { Auth } from 'aws-amplify';
import FaceBookSvg from '../../assests/svg/FaceBookSvg';
import GoogleSvg from '../../assests/svg/GoogleSvg';
import { validatePhone, validateEmail } from '../../Utils/HelperCommonFunctions'

const Login = () => {

  const [userInput, setuserInput] = useState('nyfovygu@mailo.icu')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()
  const scheme = useColorScheme();

  const continueButtonHandler = async () => {
    setLoading(true)
    try {
      const user = await Auth.signIn(userInput);
      console.log("ajsbjds", user)
      if (user) {
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
      console.log("error---------------", error.message)
      switch (error.code) {
        case 'UserNotFoundException':
          HandleUserNotFound();
          break;

        case 'UserNotConfirmedException':
          handleUserComfirmation()
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
    navigation.navigate(routes.Signup, { ...payload })
  }

  const handleUserComfirmation = async () => {
    const payload = {}
    if (validatePhone(userInput)) {
      payload.phone_number = userInput
    
    } else if (validateEmail) {
      payload.email = userInput
      await Auth.resendSignUp(userInput);
    navigation.navigate(routes.Verification, { ...payload })
    }
  }



  const signupHandler = () => {
    const payload = {}
    if (validatePhone(userInput)) {
      payload.phone_number = userInput
    } else if (validateEmail) {
      payload.email = userInput
    }

    navigation.navigate(routes.Signup, {
      ...payload
    })
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
            <CommonText showText={'WelCome !'} fontSize={20} />
          </View>
          <View style={styles.textinputConatiner}>
            <CommonText showText={'Please enter your mobile number or email id'} fontSize={12} />
            <Textinput on value={userInput} onChange={(e)=>setuserInputsetuserInput(e.toLowerCase())} placeholder={'Mobile Number / email id'} />
          </View>
          <TouchableOpacity style={[styles.button, { backgroundColor: userInput == '' ? colors.grey : colors.green }]} onPress={continueButtonHandler} onLoading={loading} setOnLoading={setLoading} disabled={userInput === '' ? true : false} >
            {/* <Button /> */}
            <CommonText showText={'Continue'} fontSize={17} customstyles={{ color: colors.white }} />
          </TouchableOpacity>
          <View style={styles.centerText}>
            <CommonText showText={'Or Sign in with'} fontSize={12} />
          </View>

          {/* show google and facebook icon */}
          <View style={styles.bottomButton}>
            <SmallButton Svg={GoogleSvg} />
            <SmallButton Svg={FaceBookSvg} />
          </View>
        </View>
        <View style={styles.bottomText}>
          <CommonText showText={'Don’t have account? '} fontSize={12} />
          <TouchableOpacity onPress={signupHandler}>
            <CommonText showText={'Signup'} customstyles={{ color: colors.green }} fontSize={14} />
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
    marginVertical: 15,
    backgroundColor: colors.green,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8
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