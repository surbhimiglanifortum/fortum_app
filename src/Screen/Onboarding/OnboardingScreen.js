import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, FlatList, View, Text, StatusBar, TouchableOpacity, Dimensions, useColorScheme, } from 'react-native';
import routes from '../../Utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from '../AuthScreen/Login';
import colors from '../../Utils/colors';
import SkipButton from '../../Component/Button/SkipButton';
const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff' };

const slides = [
  {
    id: '1',
    image: require('../../assests/onboarding1.png'),
    title: 'Discover',
    subtitle: 'Select the nearest charging station on the map or the one you prefer according to your needs, you can easily create a route for it.',
  },
  {
    id: '2',
    image: require('../../assests/onboarding2.png'),
    title: 'Charge',
    subtitle: 'Reach the charger and start charging your Ev Real time monitoring of your charging seddion ',
  },
  {
    id: '3',
    image: require('../../assests/onboarding3.png'),
    title: 'PAY',
    subtitle: 'Add money to your Fortnum wallet and charge your vechicle hassle free.',
  },
];


const OnboardingScreen = ({ navigation }) => {

  const ref = React.useRef();
  const scheme = useColorScheme();
  
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [viewedOnboarding, setViewedOnboarding] = useState(false)

  //Checking onBoarding function done or not 
  const checkingOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding')
      if (value !== null) {
        setViewedOnboarding(true)
      }
    } catch (error) {
      console.log('Error viewedOnboarding', first)
    }
  }


  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = async () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true');
        navigation.replace(routes.login)
      } catch (error) {

      }
    }
  };

  const skipBtn = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  useEffect(() => {
    checkingOnboarding()
  }, [])


  const Footer = () => {
    return (
      <View style={styles.footerCon}>
            {/* Indicator container */}
            <View style={styles.footerInner}>
              {/* Render indicator */}
              {slides.map((_, index) => (
                <View key={index} style={[styles.indicator, currentSlideIndex == index && { backgroundColor: colors.green, width: 30, height:8,borderRadius:8},]} />))}
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide} style={styles.btn}>
              <Image source={require('../../assests/nextBtn.png')} resizeMode='contain' style={styles.img} /> 
            </TouchableOpacity>      
      </View>
    );
  };

 

  const Slide = ({ item, skipBtn }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <SkipButton onPress={skipBtn} />
        <Image source={require('../../assests/fortumLogo.png')}  />
        <View style={{ width: 350, height: 250 }}>
          <Image
            source={item?.image} resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View>
          <Text style={[styles.title,{color:scheme=='dark'?colors.white:colors.black}]}>{item?.title}</Text>
          <Text style={{ width: 300, marginTop: 10 }}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {
        viewedOnboarding ? <Login /> :
          <SafeAreaView style={[styles.container, { backgroundColor: scheme == 'dark' ? colors.backgroundDark : colors.backgroundLight }]}>
            <StatusBar backgroundColor={COLORS.primary} />
            <FlatList
              ref={ref}
              onMomentumScrollEnd={updateCurrentSlideIndex}
              contentContainerStyle={{ height: height * 0.75 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={slides}
              pagingEnabled
              renderItem={({ item }) => <Slide item={item} skipBtn={skipBtn} />}
            />
            <Footer />
          </SafeAreaView>
      }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '60%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: 'grey',
    marginHorizontal: 5,
    borderRadius: 100,
  },
  btn: {
   
  },
  footerCon:{ height: height * 0.10, justifyContent: 'space-between', paddingHorizontal: 20, flexDirection:'row',alignItems:'center',marginBottom:20},
  footerInner:{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, width:'50%'},

});
export default OnboardingScreen;