// @flow

import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../global";

const { width, height } = Dimensions.get( "window" );

const viewStyles = StyleSheet.create( {
  footer: {
    marginHorizontal: 23,
    marginTop: 20
  },
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  headerText: {
    alignSelf: "center",
    paddingTop: 18,
    position: "absolute"
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.black,
    justifyContent: "center"
  },
  loadingWheel: {
    position: "absolute",
    top: "50%",
    zIndex: 1
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: ( height / 3 ) * 2,
    resizeMode: "contain",
    width
  }
} );

export {
  viewStyles,
  imageStyles
};
