import { StyleSheet } from "react-native";

import {
  center,
  dimensions,
} from "../global";

const viewStyles = StyleSheet.create( {
  center,
  container: {
    flex: 1,
  },
  margin: {
    marginTop: dimensions.height > 570 ? 64 : 34,
  },
  marginSmall: {
    marginTop: 25,
  },
  scrollContainer: {
    flexGrow: 1,
  },
} );

const textStyles = StyleSheet.create( {
  text: {
    marginHorizontal: 30,
    maxWidth: 317,
    textAlign: "center",
  },
} );

const imageStyles = StyleSheet.create( {
  logo: {
    height: 107,
    resizeMode: "contain",
    width: dimensions.width - 70,
  },
} );

export {
  textStyles,
  viewStyles,
  imageStyles,
};
