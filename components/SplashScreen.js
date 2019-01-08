// @flow

import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View
} from "react-native";

import i18n from "../i18n";
import styles from "../styles/splash";
import logoImages from "../assets/logos";

type Props = {
  navigation: any
}

class SplashScreen extends Component<Props> {
  componentDidMount() {
    this.transitionScreen();
  }

  transitionScreen() {
    const { navigation } = this.props;

    setTimeout( () => navigation.navigate( "Onboarding" ), 2000 );
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require( "../assets/backgrounds/splash.png" )}
      >
        <View style={styles.banner}>
          <Image source={logoImages.bird} style={styles.image} />
          <Image source={logoImages.bird} style={styles.image} />
        </View>
        <Text style={styles.headerText}>{i18n.t( "splash.presents" ).toLocaleUpperCase()}</Text>
        <Image source={logoImages.seek} />
        <Text style={styles.text}>{i18n.t( "splash.initiative" )}</Text>
      </ImageBackground>
    );
  }
}

export default SplashScreen;
