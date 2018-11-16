// @flow

import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  View
} from "react-native";

import styles from "../styles/about";

type Props = {
  navigation: any
}

const AboutScreen = ( { navigation }: Props ) => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    />
  </View>
);

export default AboutScreen;
