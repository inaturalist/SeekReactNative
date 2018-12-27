// @flow

import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View
} from "react-native";

import styles from "../styles/splash";

type Props = {
  navigation: any
}

class SplashScreen extends Component<Props> { 
  componentDidMount() {
    this.transitionScreen();
  }

  transitionScreen() {
    const { navigation } = this.props;

    setTimeout( () => navigation.navigate( "Main" ), 2000 );
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require( "../assets/backgrounds/splash.png" )}
        >
          <Text style={styles.text}>Backyard Wilderness presents:</Text>
          <Image source={require( "../assets/logos/logo-seek-splash.png" )} />
        </ImageBackground>
      </View>
    );
  }
}

export default SplashScreen;
