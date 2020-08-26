// @flow

import React from "react";
import { Text, View } from "react-native";
import OpenSettings from "react-native-open-settings";
import { useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/camera/error";
import GreenButton from "../UIComponents/Buttons/GreenButton";

type Props = {
  +error: string,
  +errorEvent: ?string
}

const CameraError = ( { error, errorEvent }: Props ) => {
  const { name } = useRoute();

  const setCameraErrorText = ( err, event ) => {
    let errorText = i18n.t( `camera.error_${err}` );

    if ( event ) {
      errorText += `\n\n${event.toString()}`;
    }
    return errorText;
  };

  console.log( error, errorEvent, "error and event" );

  return (
    <View style={[styles.blackBackground, styles.center, name === "Gallery" && styles.galleryHeight]}>
      <Text allowFontScaling={false} numberOfLines={23} style={styles.errorText}>
        {setCameraErrorText( error, errorEvent )}
      </Text>
      {( error === "permissions" || error === "gallery" ) && (
        <>
          <View style={styles.margin} />
          <GreenButton
            handlePress={() => OpenSettings.openSettings()}
            text="camera.permissions"
            fontSize={16}
            width={323}
          />
        </>
      )}
    </View>
  );
};

export default CameraError;
