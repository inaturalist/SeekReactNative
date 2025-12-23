import { StyleSheet } from "react-native";

import { row } from "../global";

const viewStyles = StyleSheet.create( {
  bullet: {
    marginRight: 18,
  },
  marginTop: {
    marginTop: 7,
  },
  row,
} );

const textStyles = StyleSheet.create( {
  taxonomyText: {
    maxWidth: 200,
  },
} );

export {
  textStyles,
  viewStyles,
};
