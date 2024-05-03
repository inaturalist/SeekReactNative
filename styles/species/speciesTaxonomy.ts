import { StyleSheet } from "react-native";
import {
  fonts,
  row
} from "../global";

const viewStyles = StyleSheet.create( {
  bullet: {
    marginRight: 18
  },
  marginTop: {
    marginTop: 7
  },
  row
} );

const textStyles = StyleSheet.create( {
  speciesTaxonomyHeader: {
    fontFamily: fonts.semiboldItalic
  },
  taxonomyText: {
    maxWidth: 200
  }
} );

export {
  textStyles,
  viewStyles
};
