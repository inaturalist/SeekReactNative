// @flow

import React from "react";
import { Text, View, SafeAreaView } from "react-native";

import i18n from "../../i18n";
import GreenHeader from "../GreenHeader";
import styles from "../../styles/results/error";

type Props = {
  +error: string,
  +navigation: any,
  +number: Number
}

const ErrorScreen = ( { error, navigation, number }: Props ) => {
  let errorText;

  if ( error === "onlineVision" ) {
    errorText = i18n.t( "results.error_server" );
  } else if ( error === "image" ) {
    errorText = i18n.t( "results.error_image" );
  } else if ( error === "taxaInfo" ) {
    errorText = i18n.t( "results.error_species" );
  } else if ( error === "downtime" ) {
    errorText = i18n.t( "results.error_downtime", {
      number: number || i18n.t( "results.error_few" )
    } );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeViewTop} />
      <GreenHeader navigation={navigation} />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
};

export default ErrorScreen;
