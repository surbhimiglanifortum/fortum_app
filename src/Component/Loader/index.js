import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";

const Loader = ({ modalOpen }) => {
  return (
    modalOpen &&
    <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};

export default Loader