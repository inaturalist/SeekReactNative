// @flow

import React from "react";
import { Text, View } from "react-native";

import styles from "../styles/error";

type Props = {
  error: string
}

const ErrorScreen = ( { error }: Props ) => (
  <View style={styles.container}>
    <Text style={styles.errorTitle}>Bummer</Text>
    <Text style={styles.error}>{error}</Text>
  </View>
);

export default ErrorScreen;
