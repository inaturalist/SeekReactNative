// @flow

import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  View
} from "react-native";

import NavBar from "./NavBar";

type Props = {
  navigation: any
}

const AboutScreen = ( { navigation }: Props ) => (
  <View>
    <NavBar />
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    />
  </View>
);

export default AboutScreen;
