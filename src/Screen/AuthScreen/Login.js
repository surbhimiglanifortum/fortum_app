import { View, Text, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../Utils/colors'
import CarLogo from '../../assests/svg/CarLogo';
import SkipButton from '../../Component/Button/SkipButton';
import CommonText from '../../Component/Text/CommonText';
import BlackText from '../../Component/Text/BlackText';
import Textinput from '../../Component/Textinput/Textinput';
import Button from '../../Component/Button/Button';
import SmallButton from '../../Component/Button/SmallButton';
import BackSvg from '../../assests/svg/back';
import GreenText from '../../Component/Text/GreenText';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Utils/routes';
import { Auth } from 'aws-amplify';

const Login = () => {

  useEffect(() => {
    console.log("SDLKJSHNA")
    const signup = async () => {
      console.log("Login")
      const { user } = await Auth.signUp({
        username: "+917532078797",
        password: "@Nujyadav123",
        attributes: {
          email: "anuj.yadav@mfilterit.com",          // optional
          // phone_number: "+918920297922",   // optional - E.164 number convention
          // other custom attributes 
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
        const user = await Auth.signIn("+917532078797");
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
    // signup()
    signin()
    // resendConfirmation()
    return () => {

    }
  }, [])


  const navigation = useNavigation()
  const scheme = useColorScheme();

  const continueButtonHandler = () => {
    navigation.navigate(routes.Verification)
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
            {/* Add google and facebook icon */}
            <SmallButton />
            <SmallButton />
          </View>
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