// @flow

import React from "react";
import { ImageBackground, Text, View } from "react-native";

import styles from "../styles/error";

type Props = {
  error: string
}

const ErrorScreen = ( { error }: Props ) => (
  <View>
    <ImageBackground
      style={styles.backgroundImage}
      source={require( "../assets/backgrounds/background.png" )}
    >
      <Text style={styles.error}>{error}</Text>
    </ImageBackground>
  </View>
);

export default ErrorScreen;
