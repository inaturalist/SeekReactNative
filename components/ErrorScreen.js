// @flow

import React from "react";
import { Text, View } from "react-native";

import styles from "../styles/error";
import { colors } from "../styles/global";

type Props = {
  error: string,
  collection: boolean
}

const ErrorScreen = ( { error, collection }: Props ) => (
  <View style={styles.container}>
    {!collection ? <Text style={styles.errorTitle}>Bummer</Text> : null}
    <Text style={[styles.error, collection && { color: colors.darkBlue }]}>{error}</Text>
  </View>
);

export default ErrorScreen;
