// @flow

import * as React from "react";
import { Platform, Linking } from "react-native";
import { AppInstalledChecker } from "react-native-check-app-install";
import SendIntentAndroid from "react-native-send-intent";

import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";

const OpenINatButton = ( ): React.Node => {
  const openUrl = async ( url ) => {
    await Linking.openURL( url );
  };

  const openiOS = async ( ) => {
    const iOSUrlScheme = "org.inaturalist.inaturalist" + "://";
    const appStore = "https://apps.apple.com/app/inaturalist/id421397028";

    try {
      const canOpen = await Linking.canOpenURL( iOSUrlScheme );
      openUrl( canOpen ? iOSUrlScheme : appStore );
    } catch ( e ) {
      openUrl( appStore );
    }
  };

  const openAndroid = async ( ) => {
    const androidPackageId = "org.inaturalist.android";
    const playStore = `https:/://play.google.com/store/apps/details?id=${androidPackageId}`;

    try {
      const canOpen = await AppInstalledChecker.isAppInstalledAndroid( androidPackageId );
      if ( canOpen ) {
        await SendIntentAndroid.openApp( androidPackageId );
      } else {
        openUrl( playStore );
      }
    } catch ( e ) {
      openUrl( playStore );
    }
  };

  const openAppOrDownloadPage = async ( ) => {
    if ( Platform.OS === "android" ) {
      openAndroid( );
    } else {
      openiOS( );
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
