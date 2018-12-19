// @flow

import React, { Component } from "react";
import {
  TouchableOpacity,
  Text
} from "react-native";

import styles from "../styles/button";

type Props = {
  buttonText: string,
  navigation: any
}

class Button extends Component<Props> {
  setNavigation() {
    const { buttonText, navigation } = this.props;

    if ( buttonText === "OK. Got it!" ) {
      navigation.push( "Main", { taxaName: null, id: null } );
    }
  }

  render() {
    const { buttonText } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.setNavigation()}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
