// @flow

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import OpenSettings from "react-native-open-settings";

import styles from "../../styles/camera/error";
import i18n from "../../i18n";

type Props = {
  +error: string
}

const PermissionError = ( { error }: Props ) => (
  <View style={styles.blackBackground}>
    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity
      onPress={() => OpenSettings.openSettings()}
      style={styles.greenButton}
    >
      <Text style={styles.buttonText}>
        {i18n.t( "camera.permissions" ).toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  </View>
);

export default PermissionError;
