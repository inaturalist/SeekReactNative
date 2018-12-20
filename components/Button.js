// @flow

import React, { Component } from "react";
import {
  TouchableOpacity,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import styles from "../styles/button";
import { colors } from "../styles/global";

type Props = {
  buttonText: string,
  navigation: any,
  green: boolean,
  navParams: Object
}

const plusIcon = ( <Icon name="pluscircle" size={15} color={colors.darkBlue} /> );

class Button extends Component<Props> {
  setNavigation() {
    const { buttonText, navigation, navParams } = this.props;

    if ( buttonText === "OK. Got it!" ) {
      navigation.push( "Main", {
        taxaName: null,
        id: null,
        taxaType: "all",
        latitude: null,
        longitude: null
      } );
    } else if ( buttonText === "Found it!" ) {
      navigation.push( "Camera", navParams );
    }
  }

  render() {
    const { buttonText, green } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, green && styles.greenButton]}
        onPress={() => this.setNavigation()}
      >
        {buttonText === "Found it!" ? (
          <Text style={styles.plus}>{plusIcon}</Text>
        ) : null}
        <Text style={[styles.buttonText, green && styles.greenButtonText]}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
