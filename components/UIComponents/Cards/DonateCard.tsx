import * as React from "react";
import { Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/cards/donateCard";
import GreenButton from "../Buttons/GreenButton";
import StyledText from "../StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";

const DonateCard = ( ) => {
  const { navigate } = useNavigation( );
  const { name } = useRoute( );
  const { isLandscape } = useAppOrientation( );

  const isHomeScreen = name === "Home";

  const navToDonation = ( ) => navigate( "Donation" );

  return (
    <View style={viewStyles.whiteContainer}>
      <StyledText style={[
        baseTextStyles.header,
        name !== "Settings" && textStyles.header,
      ]}>
        {i18n.t( "settings.donate_header" ).toLocaleUpperCase( )}
      </StyledText>
      <View style={[
        viewStyles.paddingAboveText,
        isHomeScreen && viewStyles.textContainer,
      ]}>
        <StyledText style={[
          baseTextStyles.body,
          isLandscape && viewStyles.landscapeContainerRestrictedWidth,
        ]}>
          {i18n.t( "settings.donate_description" )}
        </StyledText>
      </View>
      <View style={[
        viewStyles.marginGreenButton,
        isHomeScreen && viewStyles.marginGreenButtonLarge,
      ]} />
      { Platform.OS !== "ios" && <>
        <GreenButton
          text="settings.donate"
          handlePress={navToDonation}
          />
        <View style={viewStyles.marginBottom} />
      </> }
    </View>
  );
};

export default DonateCard;
