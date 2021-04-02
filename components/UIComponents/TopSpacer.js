// @flow

import * as React from "react";
import { View, Platform } from "react-native";

import styles from "../../styles/uiComponents/topSpacer";

type Props = {
  +backgroundColor?: ?string
};

const TopSpacer = ( { backgroundColor }: Props ): React.Node => {
  if ( Platform.OS === "ios" ) {
    return (
      <View style={[styles.iosSpacer, backgroundColor && { backgroundColor }]} />
    );
  }
  return null;
};

TopSpacer.defaultProps = {
  backgroundColor: null
};

export default TopSpacer;
