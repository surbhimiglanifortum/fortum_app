import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";
import LottieView from 'lottie-react-native';
import { scale } from "react-native-size-matters";

const Loader = ({ modalOpen }) => {
  return (

    modalOpen && <ActivityIndicator />

  );
};

export default Loader