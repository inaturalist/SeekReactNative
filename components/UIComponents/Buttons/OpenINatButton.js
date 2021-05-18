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
      await Linking.openURL( "https://apps.apple.com/app/inaturalist/id421397028" );
      // const urlScheme = "org.inaturalist.inaturalist";
      // const canOpen = await Linking.canOpenURL( urlScheme + "://" );
      // console.log( canOpen, "can open" );
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
