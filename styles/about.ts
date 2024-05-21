import { StyleSheet } from "react-native";
import { row } from "./global";

const viewStyles = StyleSheet.create( {
  block: {
    marginBottom: 34
  },
  debug: {
    paddingBottom: 17,
    paddingHorizontal: 20,
    paddingTop: 27
  },
  margin: {
    marginBottom: 27
  },
  marginLarge: {
    marginTop: 38
  },
  marginLeft: {
    marginLeft: 20
  },
  marginSmall: {
    marginTop: 22
  },
  marginSmallest: {
    marginTop: 17
  },
  row,
  textContainer: {
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 31
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  },
  copiedAnimation: {
    zIndex: 1,
    position: "absolute",
    top: -35
  }
} );

const textStyles = StyleSheet.create( {
  boldText: {
    marginBottom: 5,
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 54,
    resizeMode: "contain",
    width: 307
  },
  wwfop: {
    height: 80,
    resizeMode: "contain",
    width: 240
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
