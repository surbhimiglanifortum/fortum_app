import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";

const Loader = ({ modalOpen }) => {
  return (
    modalOpen && <ActivityIndicator />
  );
};

export default Loader