import * as React from "react";
import { Platform, View } from "react-native";

import styles from "../../styles/uiComponents/topSpacer";

const BottomSpacer = ( ) => {
  if ( Platform.OS === "ios" ) {
    return (
      <View style={styles.bottomSpacer} />
    );
  }
  return null;
};

export default BottomSpacer;
