import { StyleSheet } from "react-native";
import {
  colors,
  center,
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  blackBackground: {
    backgroundColor: colors.black,
    height: dimensions.height
  },
  center,
  galleryHeight: {
    height: dimensions.height - 100
  },
  margin: {
    marginTop: 38
  }
} );

const textStyles = StyleSheet.create( {
  errorText: {
    marginHorizontal: 41,
    textAlign: "center"
  },
  whiteText: {
    fontSize: 15,
    textAlign: "center",
    maxWidth: 323
  }
} );

export {
  textStyles,
  viewStyles
};
