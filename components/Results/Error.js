// @flow

import React from "react";
import { Text, View, SafeAreaView } from "react-native";

import i18n from "../../i18n";
import GreenHeader from "../GreenHeader";
import styles from "../../styles/results/error";

type Props = {
  error: string,
  navigation: any
}

const ErrorScreen = ( { error, navigation }: Props ) => {
  let errorText;

  if ( error === "onlineVision" ) {
    errorText = i18n.t( "results.error_server" );
  } else if ( error === "image" ) {
    errorText = i18n.t( "results.error_image" );
  } else if ( error === "taxaInfo" ) {
    errorText = i18n.t( "results.error_species" );
  } else if ( error === "downtime" ) {
    errorText = i18n.t( "results.error_downtime" );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeViewTop} />
      <SafeAreaView style={styles.safeView}>
        <GreenHeader navigation={navigation} />
        <View style={styles.textContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ErrorScreen;
