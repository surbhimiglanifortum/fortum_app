import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";
import LottieView from 'lottie-react-native';
import { scale } from "react-native-size-matters";

const Loader = ({ modalOpen }) => {
  return (
    modalOpen &&
    <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

export default Loader