import React from "react";
import {
  Button, Dimensions, Image, ImageBackground, StyleSheet, Text, View
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
