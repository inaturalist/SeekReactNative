// @flow

import * as React from "react";
import { Platform, Text, View } from "react-native";
import OpenSettings from "react-native-open-settings";
import { useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/camera/error";
import GreenButton from "../UIComponents/Buttons/GreenButton";

type Props = {
  +error: string,
  +errorEvent: ?string
}

const CameraError = ( { error, errorEvent }: Props ): React.Node => {
  const { name } = useRoute();

  const setCameraErrorText = ( err, event ) => {
    let errorText = i18n.t( `camera.error_${err}` );

    if ( event ) {
      errorText += `\n\n${event.toString()}`;
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
