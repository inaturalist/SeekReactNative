// @flow

import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get( "window" );

const viewStyles = StyleSheet.create( {
  backgroundColor: {
    alignItems: "center",
    width: "100%"
  },
  headerMargins: {
    marginBottom: Platform.OS === "android" ? 19 : 15,
    marginTop: 25
  }
} );

const textStyles = StyleSheet.create( {
  nameText: {
    marginBottom: height > 570 ? 43 : 30,
    marginTop: 32
  },
  text: {
    marginBottom: 24,
    marginHorizontal: 40,
    marginTop: 16,
    textAlign: "center"
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: height > 640 ? 258 : 215,
    marginTop: height > 570 ? 50 : 30,
    resizeMode: "contain",
    width: height > 640 ? 258 : 215
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
