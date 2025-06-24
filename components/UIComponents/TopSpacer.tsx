import * as React from "react";
import { View, Platform } from "react-native";

import styles from "../../styles/uiComponents/topSpacer";

interface Props {
  readonly backgroundColor?: string | null;
}

const TopSpacer = ( { backgroundColor = null }: Props ) => {
  if ( Platform.OS === "ios" ) {
    return (
      <View style={[styles.iosSpacer, backgroundColor && { backgroundColor }]} />
    );
  }
  return null;
};

export default TopSpacer;
