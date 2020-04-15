import {
  StyleSheet,
  Platform
} from "react-native";
import {
  colors,
  fonts,
  row,
  dimensions
} from "../global";

export default StyleSheet.create( {
  button: {
    marginBottom: 24,
    marginTop: 14
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    width: "100%"
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginBottom: 20,
    marginTop: 18,
    paddingTop: Platform.OS === "ios" ? 8 : 0,
    textAlign: "center"
  },
  image: {
    height: 40,
    marginRight: 22,
    resizeMode: "contain",
    width: 40
  },
  margin: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: 14
  },
  marginTop: {
    marginTop: 31
  },
  row,
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 18,
    maxWidth: dimensions.height > 570 ? 198 : 214
  },
  wideText: {
    maxWidth: 278,
    textAlign: "center"
  }
} );
