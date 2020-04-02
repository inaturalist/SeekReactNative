import React from "react";
import { View, Platform } from "react-native";

import styles from "../../styles/uiComponents/TopSpacer";

const BottomSpacer = () => {
  if ( Platform.OS === "ios" ) {
    return (
      <View style={styles.bottomSpacer} />
    );
  }
  return null;
};

export default BottomSpacer;
