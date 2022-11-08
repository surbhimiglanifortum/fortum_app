import React from "react";
import { Modal, View, Text } from "react-native";
import LottieView from 'lottie-react-native';
import { scale } from "react-native-size-matters";

const Loader = ({ modalOpen }) => {
  return (
    // <Modal transparent visible={modalOpen} statusBarTranslucent>
    //   <View style={{justifyContent: "center",alignItems: "center",flex: 1,}}>
    //     <View >
          <LottieView source={require('../../assests/loader.json')} style={{ height: scale(100) }} autoPlay />
    //     </View>
    //   </View>
    // </Modal>
  );
};

export default Loader