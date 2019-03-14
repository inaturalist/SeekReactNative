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
import backgrounds from "../assets/backgrounds";
import { checkIfFirstLaunch } from "../utility/helpers";

type Props = {
  navigation: any
}

class SplashScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false
    };
  }

  async componentWillMount() {
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState( {
      isFirstLaunch,
      hasCheckedAsyncStorage: true
    }, () => this.transitionScreen() );
  }

  transitionScreen() {
    const { navigation } = this.props;
    const { isFirstLaunch, hasCheckedAsyncStorage } = this.state;

    if ( !hasCheckedAsyncStorage ) {
      return null;
    }
    // fade this screen out if possible
    if ( isFirstLaunch ) {
      setTimeout( () => navigation.navigate( "Onboarding" ), 2000 );
    } else {
      setTimeout( () => navigation.navigate( "Main" ), 2000 );
    }
    return null;
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={backgrounds.splash}
      >
        <View style={styles.header}>
          <View style={styles.banner}>
            <Image source={logoImages.wwfop} style={styles.image} />
          </View>
          <Text style={styles.headerText}>{i18n.t( "splash.presents" ).toLocaleUpperCase()}</Text>
        </View>
        <Image
          source={logoImages.seek}
          style={styles.logo}
        />
        <Text style={styles.text}>{i18n.t( "splash.initiative" )}</Text>
      </ImageBackground>
    );
  }
}

export default SplashScreen;
