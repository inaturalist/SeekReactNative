import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../global";

const { width } = Dimensions.get( "screen" );

const viewStyles = StyleSheet.create( {
  ccButton: {
    bottom: 14,
    padding: 6,
    position: "absolute",
    right: 15,
    zIndex: 1,
    backgroundColor: colors.ccGray,
    borderRadius: 50
  },
  photoContainer: {
    backgroundColor: colors.black,
    height: 250,
    width
  },
  errorContainer: {
    justifyContent: "center",
    backgroundColor: colors.black,
    height: 250
  }
} );

const textStyles = StyleSheet.create( {
  errorText: {
    textAlign: "center"
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 250,
    resizeMode: "contain",
    width
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
