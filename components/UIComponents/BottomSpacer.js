// @flow

import * as React from "react";
import { View, Platform } from "react-native";
import type { Node } from "react";

import styles from "../../styles/uiComponents/topSpacer";

const BottomSpacer = ( ): Node => {
  if ( Platform.OS === "ios" ) {
    return (
      <View style={styles.bottomSpacer} />
    );
  }
  return null;
};

export default BottomSpacer;
