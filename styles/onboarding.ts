import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  center
} from "./global";

const { width, height } = Dimensions.get( "window" );

const viewStyles = StyleSheet.create( {
  activeDot: {
    backgroundColor: colors.white,
    borderRadius: 10 / 2,
    height: 10,
    width: 10
  },
  button: {
    backgroundColor: colors.seekTeal,
    borderRadius: 34,
    height: 50,
    justifyContent: "center",
    width: 293
  },
  buttonUncolored: {
    height: 50,
    justifyContent: "center"
  },
  buttonContainer: {
    marginBottom: 51
  },
  buttonHeight: {
    padding: 15
  },
  center,
  container: {
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width
  },
  dot: {
    backgroundColor: colors.darkGray,
    borderRadius: 6 / 2,
    height: 6,
    marginBottom: 3,
    marginHorizontal: 16,
    marginTop: 3,
    width: 6
  },
  image: {
    alignItems: "center"
  },
  margin: {
    marginTop: 29
  },
  pagination: {
    flexDirection: "row",
    marginBottom: height > 570 ? 37 : 27,
    marginTop: height > 570 ? 57 : 27
  }
} );

const textStyles = StyleSheet.create( {
  skipText: {
    textAlign: "center",
    textDecorationLine: "underline"
  },
  text: {
    maxWidth: 292,
    textAlign: "center"
  },
  continue: {
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
