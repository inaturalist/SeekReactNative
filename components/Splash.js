import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  Text,
  View
} from "react-native";

import styles from "../styles/splash";

const Splash = ( { navigation } ) => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <Text style={styles.text}>Backyard Wilderness Presents</Text>
      <Image source={require( "../assets/logos/logo-seek-splash.png" )} />
      <Button title="Continue" onPress={() => navigation.navigate( "Loading" )} />
    </ImageBackground>
  </View>
);

export default Splash;
