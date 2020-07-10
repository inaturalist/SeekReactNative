// @flow

import React from "react";
import { Text, View } from "react-native";

import i18n from "../../i18n";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import styles from "../../styles/results/error";

type Props = {
  +error: string,
  +number: ?string
}

const ErrorScreen = ( { error, number }: Props ) => {
  let errorText;

  if ( error === "onlineVision" ) {
    errorText = i18n.t( "results.error_server" );
  } else if ( error === "image" ) {
    errorText = i18n.t( "results.error_image" );
  } else if ( error === "taxaInfo" ) {
    errorText = i18n.t( "results.error_species" );
  } else if ( error === "downtime" ) {
    errorText = i18n.t( "results.error_downtime_plural", {
      count: number || i18n.t( "results.error_few" )
    } );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <GreenHeader />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
};

export default ErrorScreen;
