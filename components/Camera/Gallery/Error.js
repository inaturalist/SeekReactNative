// @flow

import * as React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import GreenHeader from "../../UIComponents/GreenHeader";
import { viewStyles, textStyles } from "../../../styles/camera/error";

type Props = {
  +error: string,
  +number?: ?number
}

const ErrorScreen = ( { error, number }: Props ): React.Node => {
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
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <GreenHeader />
      <View style={viewStyles.textContainer}>
        <Text style={textStyles.errorText}>{errorText}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
