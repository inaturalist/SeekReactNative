import { StyleSheet, Platform } from "react-native";
import {
  colors,
  dimensions,
} from "../global";

const viewStyles = StyleSheet.create( {
  landscapeBackground: {
    backgroundColor: colors.black,
  },
  emptyBackground: {
    backgroundColor: colors.black,
    height: dimensions.height,
  },
  footer: {
    padding: 100,
    backgroundColor: colors.black,
  },
  imagePadding: {
    paddingBottom: 20,
  },
} );

const textStyles = StyleSheet.create( {
  ccButtonText: {
    backgroundColor: colors.black,
    borderRadius: 40,
    paddingBottom: Platform.OS === "ios" ? 3 : 5,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? 8 : 5,
  },
} );

const imageStyles = StyleSheet.create( {
  image: {
    resizeMode: "cover",
  },
} );

export {
  textStyles,
  viewStyles,
  imageStyles,
};
