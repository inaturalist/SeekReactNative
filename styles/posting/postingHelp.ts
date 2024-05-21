import { StyleSheet, Platform } from "react-native";
import { colors, row } from "../global";

const viewStyles = StyleSheet.create( {
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  margin: {
    marginTop: 19
  },
  marginRight: {
    marginRight: 10
  },
  paragraph: {
    marginBottom: 16
  },
  row,
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 27,
    marginTop: 30
  }
} );

const textStyles = StyleSheet.create( {
  headerText: {
    justifyContent: "center",
    marginLeft: 21,
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
  italicText: {
    marginHorizontal: 20,
    textAlign: "center"
  },
  text: {
    marginBottom: 35,
    marginTop: 16
  }
} );

const imageStyles = StyleSheet.create( {
  icon: {
    height: 32,
    resizeMode: "contain",
    width: 32
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
