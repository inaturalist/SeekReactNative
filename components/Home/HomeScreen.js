import React from "react";
import { View } from "react-native";

import styles from "../../styles/home";
import SpeciesNearby from "./SpeciesNearby";

const HomeScreen = () => (
  <View style={styles.container}>
    <SpeciesNearby />
    {/* <GetStarted />
    <Footer /> */}
  </View>
);

export default HomeScreen;
