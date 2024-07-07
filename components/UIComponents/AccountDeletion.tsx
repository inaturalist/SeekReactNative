import * as React from "react";
import { Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles } from "../../styles/uiComponents/cards/donateCard";
import Button from "./Buttons/Button";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";
import { useAppOrientation } from "../Providers/AppOrientationProvider";

const AccountDeletion = ( ) => {
  if ( Platform.OS === "android" ) {
    return null;
  }

  return (
    <View style={viewStyles.whiteContainer}>
      <StyledText style={baseTextStyles.header}>
        {i18n.t( "settings.danger_zone" ).toLocaleUpperCase( )}
      </StyledText>
      <View style={viewStyles.paddingAboveText}>
        <StyledText style={[
          baseTextStyles.body,
          isLandscape && viewStyles.landscapeContainerRestrictedWidth
        ]}>
          {i18n.t( "settings.delete_account" )}
        </StyledText>
      </View>
      <View style={viewStyles.marginGreenButton} />
      <View style={viewStyles.marginBottom} />
    </View>
  );
};

export default AccountDeletion;
