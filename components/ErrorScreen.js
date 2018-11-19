// @flow

import React from "react";
import { Text, View } from "react-native";

import styles from "../styles/error";

type Props = {
  errorTitle: string,
  error: string
}

const ErrorScreen = ( { error, errorTitle }: Props ) => (
  <View>
    <Text style={styles.errorTitle}>{errorTitle}</Text>
    <Text style={styles.error}>{error}</Text>
  </View>
);

export default ErrorScreen;
