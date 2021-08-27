// @flow

import * as React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/cards/donateCard";
import GreenButton from "../Buttons/GreenButton";
import { AppOrientationContext } from "../../UserContext";

const DonateButton = ( ): React.Node => {
  const { navigate } = useNavigation( );
  const { name } = useRoute( );
  const { isLandscape } = React.useContext( AppOrientationContext );

  const isHomeScreen = name === "HomeFooter";

  const navToDonation = ( ) => navigate( "Donation" );

  return (
    <View style={viewStyles.whiteContainer}>
      <Text style={[
        textStyles.header,
        name === "SettingsFooter" && viewStyles.noHeaderPadding
      ]}>
        {i18n.t( "settings.donate_header" ).toLocaleUpperCase( )}
      </Text>
      <View style={[
        viewStyles.paddingAboveText,
        isHomeScreen && viewStyles.textContainer
      ]}>
        <Text style={[
          textStyles.text,
          isLandscape && viewStyles.landscapeContainerRestrictedWidth
        ]}>
          {i18n.t( "settings.donate_description" )}
        </Text>
      </View>
      <View style={[
        viewStyles.marginGreenButton,
        isHomeScreen && viewStyles.marginGreenButtonLarge
      ]} />
      <GreenButton
        text="settings.donate"
        handlePress={navToDonation}
      />
      <View style={viewStyles.marginBottom} />
    </View>
  );
};

export default DonateButton;
