// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  center
} from "../../global";

const viewStyles = StyleSheet.create( {
  center,
  speciesNearbyContainer: {
    backgroundColor: colors.seekTeal,
    paddingVertical: 15
  },
  challengeContainer: {
    backgroundColor: colors.white
  }
} );


const textStyles = StyleSheet.create( {
  text: {
    maxWidth: 245,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
