// @flow

import React from "react";
import {
  Text,
  View
} from "react-native";
import OpenSettings from "react-native-open-settings";

import styles from "../../styles/camera/error";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { setCameraErrorText } from "../../utility/textHelpers";

type Props = {
  +error: string,
  +errorEvent: ?string
}

const CameraError = ( { error, errorEvent }: Props ) => {
  const errorText = setCameraErrorText( error, errorEvent );

  return (
    <View style={[styles.blackBackground, styles.center]}>
      <Text numberOfLines={23} style={styles.errorText}>{errorText}</Text>
      {error === "permissions" || error === "gallery" ? (
        <>
          <View style={styles.margin} />
          <GreenButton
            handlePress={() => OpenSettings.openSettings()}
            text="camera.permissions"
            fontSize={16}
            width={323}
          />
        </>
      ) : null}
    </View>
  );
};

export default CameraError;
