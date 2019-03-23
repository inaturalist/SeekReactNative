// @flow

import React from "react";
import { Text, View } from "react-native";

import styles from "../../styles/camera/error";

type Props = {
  error: string
}

const ErrorScreen = ( { error }: Props ) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);

export default ErrorScreen;
