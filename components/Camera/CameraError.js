// @flow

import * as React from "react";
import { Platform, Text, View } from "react-native";
import OpenSettings from "react-native-open-settings";
import { useRoute } from "@react-navigation/native";
import { getSystemVersion } from "react-native-device-info";

import i18n from "../../i18n";
import styles from "../../styles/camera/cameraError";
import GreenButton from "../UIComponents/Buttons/GreenButton";

type Props = {
  +error: string,
  +errorEvent: ?string,
  album?: ?string
}

const CameraError = ( { error, errorEvent, album }: Props ): React.Node => {
  const { name } = useRoute();

  const setCameraErrorText = ( err, event ) => {
    let errorText = i18n.t( `camera.error_${err}` );

    if ( event ) {
      errorText += `\n\n${event.toString()}`;
    } else if ( Platform.OS === "ios" && album === null ) {
      const OS = getSystemVersion( );
      const majorVersionNumber = Number( OS.split( "." )[0] );

      if ( majorVersionNumber >= 14 ) {
        errorText += `\n\n${i18n.t( "camera.error_selected_photos" )}`;
      }
    }
    return errorText;
  };

  const openSettings = () => OpenSettings.openSettings();

  const showPermissionsButton = () => {
    if ( Platform.OS === "android" ) {
      return (
        <>
          <View style={styles.margin} />
          <GreenButton
            handlePress={openSettings}
            text="camera.permissions"
            fontSize={16}
            width={323}
          />
        </>
      );
    }
    return (
      <>
        <View style={styles.margin} />
        <Text style={styles.whiteText}>
          {i18n.t( "camera.please_permissions" ).toLocaleUpperCase()}
        </Text>
      </>
    );
  };

  return (
    <View style={[styles.blackBackground, styles.center, name === "Gallery" && styles.galleryHeight]}>
      <Text allowFontScaling={false} numberOfLines={23} style={styles.errorText}>
        {setCameraErrorText( error, errorEvent )}
      </Text>
      {( error === "permissions" || error === "gallery" ) && showPermissionsButton()}
    </View>
  );
};

export default CameraError;
