// @flow

import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  Text,
  View
} from "react-native";

import styles from "../styles/splash";

type Props = {
  navigation: any
}

const SplashScreen = ( { navigation }: Props ) => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <Text style={styles.text}>Backyard Wilderness Presents</Text>
      <Image source={require( "../assets/logos/logo-seek-splash.png" )} />
      <Button title="Continue" onPress={() => navigation.navigate( "Warnings" )} />
    </ImageBackground>
  </View>
);

export default SplashScreen;
