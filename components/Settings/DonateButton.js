// @flow

import * as React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/settings";
import GreenButton from "../UIComponents/Buttons/GreenButton";

const DonateButton = ( ): React.Node => {
  const { navigate } = useNavigation( );

  const navToDonation = ( ) => navigate( "Donation" );

  return (
    <View style={viewStyles.margin}>
      <Text style={textStyles.header}>{i18n.t( "settings.donate_header" ).toLocaleUpperCase( )}</Text>
      <View style={viewStyles.marginSmall} />
      <Text style={textStyles.text}>{i18n.t( "settings.donate_description" )}</Text>
      <View style={viewStyles.marginMedium} />
      <GreenButton
        text="settings.donate"
        handlePress={navToDonation}
      />
      <View style={viewStyles.marginTop} />
      <View style={viewStyles.marginTop} />
    </View>
  );
};

export default DonateButton;
