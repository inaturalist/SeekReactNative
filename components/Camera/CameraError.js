// @flow

import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import OpenSettings from "react-native-open-settings";

import styles from "../../styles/camera/error";
import i18n from "../../i18n";

type Props = {
  +error: string,
  +errorEvent: ?string
}

const CameraError = ( { error, errorEvent }: Props ) => {
  let errorText;

  if ( error === "permissions" ) {
    errorText = i18n.t( "camera.error_camera" );
  } else if ( error === "classifier" ) {
    errorText = i18n.t( "camera.error_classifier" );
  } else if ( error === "device" ) {
    errorText = i18n.t( "camera.error_device_support" );
  } else if ( error === "save" ) {
    errorText = i18n.t( "camera.error_save" );
  } else if ( error === "camera" ) {
    errorText = `${i18n.t( "camera.error_old_camera" )}: ${String( errorEvent )}`;
  } else if ( error === "gallery" ) {
    errorText = i18n.t( "camera.error_gallery" );
  } else if ( error === "noPhotos" ) {
    errorText = i18n.t( "camera.error_no_photos" );
  }

  return (
    <View style={styles.blackBackground}>
      <Text style={styles.errorText}>{errorText}</Text>
      {error === "permissions" ? (
        <TouchableOpacity
          onPress={() => OpenSettings.openSettings()}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "camera.permissions" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CameraError;
