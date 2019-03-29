// @flow

import React from "react";
import { Text, View, SafeAreaView } from "react-native";

import GreenHeader from "../GreenHeader";
import styles from "../../styles/results/error";

type Props = {
  error: string,
  navigation: any
}

const ErrorScreen = ( { error, navigation }: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <SafeAreaView style={styles.safeView}>
      <GreenHeader navigation={navigation} />
      <View style={styles.textContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </SafeAreaView>
  </View>
);

export default ErrorScreen;
