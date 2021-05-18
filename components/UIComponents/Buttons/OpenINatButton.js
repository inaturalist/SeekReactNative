// @flow

import * as React from "react";
import { Platform, Linking } from "react-native";
import { AppInstalledChecker } from "react-native-check-app-install";
import SendIntentAndroid from "react-native-send-intent";

import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";

const OpenINatButton = ( ): React.Node => {
  const openAppOrDownloadPage = async ( ) => {
    if ( Platform.OS === "android" ) {
      const packageId = "org.inaturalist.android";
      const iNatAppDownloaded = await AppInstalledChecker.isAppInstalledAndroid( packageId );
      if ( iNatAppDownloaded ) {
        await SendIntentAndroid.openApp( packageId );
      } else {
        await Linking.openURL( `https:/://play.google.com/store/apps/details?id=${packageId}` );
      }
    } else {
      try {
        const urlScheme = "org.inaturalist.inaturalist";
        const canOpen = await Linking.canOpenURL( urlScheme + "://" );
        console.log( canOpen, "can open" );

        // const iNatAppDownloaded = await AppInstalledChecker.checkURLScheme( urlScheme );
        // console.log( iNatAppDownloaded, "is inat app downloaded" );
      } catch ( e ) {
        console.log( e );
      }
    }
  };

  return (
    <GreenButton
      color={colors.seekiNatGreen}
      text="about_inat.open_inaturalist"
      handlePress={openAppOrDownloadPage}
    />
  );
};

export default OpenINatButton;
