import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../../i18n";
import GreenHeader from "../../UIComponents/GreenHeader";
import { viewStyles, textStyles } from "../../../styles/camera/error";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

enum Error {
  image = "image",
  taxaInfo = "taxaInfo",
  downtime = "downtime",
  login = "login"
}
interface Props {
  readonly error: Error;
  readonly number?: number | null;
}

const ErrorScreen = ( { error, number }: Props ) => {
  let errorText;

  // TODO: Audit which ones are actually still used, since error has been deleted from ObsProvider
  if ( error === "image" ) {
    errorText = i18n.t( "results.error_image" );
  } else if ( error === "taxaInfo" ) {
    errorText = i18n.t( "results.error_species" );
  } else if ( error === "downtime" ) {
    errorText = i18n.t( "results.error_downtime_plural", {
      count: number || i18n.t( "results.error_few" ),
    } );
  } else if ( error === "login" ) {
    errorText = i18n.t( "post_to_inat_card.error_login" );
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
