// @flow

import * as React from "react";
import { View, Text, Platform, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/settings";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import urls from "../../constants/urls";

const DonateButton = ( ): React.Node => {
  const { navigate } = useNavigation( );

  const donationPage = `${urls.DONORBOX}&utm_source=ios`;

  const openLinkInSafari = async ( ) => {
    try {
      const canOpen = await Linking.canOpenURL( donationPage );
      if ( canOpen ) {
        await Linking.openURL( donationPage );
      }
    } catch ( e ) {
      console.log( e, "can't open donation url in safari" );
    }
  };

  const navToDonation = ( ) => {
    if ( Platform.OS === "ios" ) {
      openLinkInSafari( );
    } else {
      navigate( "Donation" );
    }
  };

  return (
    <View style={styles.margin}>
      <Text style={styles.header}>{i18n.t( "settings.donate_header" ).toLocaleUpperCase( )}</Text>
      <View style={styles.marginSmall} />
      <Text style={styles.text}>{i18n.t( "settings.donate_description" )}</Text>
      <View style={styles.marginMedium} />
      <GreenButton
        text="settings.donate"
        handlePress={navToDonation}
      />
      <View style={styles.marginTop} />
      <View style={styles.marginTop} />
    </View>
  );
};

export default DonateButton;
