import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import GreenHeader from "../../UIComponents/GreenHeader";
import { viewStyles, textStyles } from "../../../styles/camera/error";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

enum Error {
  onlineVision = "onlineVision",
  image = "image",
  taxaInfo = "taxaInfo",
  downtime = "downtime"
}
interface Props {
  readonly error: Error;
  readonly number?: number | null;
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
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
      <GreenHeader />
      <View style={viewStyles.textContainer}>
        <StyledText style={[baseTextStyles.emptyStateWhite, textStyles.errorText]}>{errorText}</StyledText>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
