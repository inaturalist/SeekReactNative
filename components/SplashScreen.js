// @flow

import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform
} from "react-native";

import styles from "../styles/splash";
import logoImages from "../assets/logos";
import backgrounds from "../assets/backgrounds";
import { checkIfFirstLaunch, setCameraLaunched } from "../utility/helpers";
import { checkIfFirstLogin } from "../utility/loginHelpers";

type Props = {
  +navigation: any
}

class SplashScreen extends Component<Props> {
  async componentDidMount() {
    setCameraLaunched( false );
    const isFirstLaunch = await checkIfFirstLaunch();
    const isFirstLogin = await checkIfFirstLogin();
    this.transitionScreen( isFirstLaunch, isFirstLogin );
  }

  transitionScreen( isFirstLaunch: boolean, isFirstLogin: boolean ) {
    const splashTimer = Platform.OS === "android" ? 2000 : 3000;

    if ( isFirstLaunch ) {
      setTimeout( () => this.resetRouter( "Onboarding" ), splashTimer );
    } else if ( isFirstLogin ) {
      setTimeout( () => this.resetRouter( "Login" ), splashTimer );
    } else {
      setTimeout( () => this.resetRouter( "Onboarding" ), splashTimer );
      // setTimeout( () => this.resetRouter( "Drawer" ), splashTimer );
    }
    return null;
  }

  resetRouter( routeName: string ) {
    const { navigation } = this.props;

    navigation.reset( {
      routes: [{ name: routeName }]
    } );
  }

  render() {
    return (
      <ImageBackground
        source={backgrounds.splash}
        style={styles.backgroundImage}
      >
        <Image
          source={logoImages.seek}
          style={styles.logo}
        />
        <Image
          source={logoImages.joint}
          style={styles.joint}
        />
      </ImageBackground>
    );
  }
}

export default SplashScreen;
