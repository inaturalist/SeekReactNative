/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  Dimensions, Image, ImageBackground, StyleSheet, Text, View
} from "react-native";

const { width, height } = Dimensions.get( "screen" );

const styles = StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
    resizeMode: "cover"
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#F5FCFF",
    fontFamily: "Arial",
    marginBottom: 25
  }
} );

const Splash = () => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/splash.png" )}
    >
      <Text style={styles.text}>Backyard Wilderness Presents</Text>
      <Image source={require( "../assets/logos/logo-seek-splash.png" )} />
    </ImageBackground>
  </View>
);

export default Splash;
