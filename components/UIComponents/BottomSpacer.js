// @flow

import * as React from "react";
import { View, Platform } from "react-native";

import styles from "../../styles/uiComponents/topSpacer";

const BottomSpacer = () => {
  if ( Platform.OS === "ios" ) {
    return (
      <View style={styles.bottomSpacer} />
    );
  }
  return null;
};

export default BottomSpacer;
