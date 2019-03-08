import React from "react";
import { View, Platform } from "react-native";

const Padding = () => (
  <View style={{
    marginBottom: Platform.OS === "android" ? 17 : 60
  }}
  />
);

export default Padding;
