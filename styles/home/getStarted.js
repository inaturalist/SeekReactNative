import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.white,
    borderRadius: 40,
    height: height > 570 ? 453 : 490
  },
  headerText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  contentContainer: {
    marginTop: height > 570 ? 10 : 0,
    marginHorizontal: 29
  },
  row: {
    height: height > 570 ? 100 : 120,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 68,
    height: 68,
    resizeMode: "contain",
    marginRight: 24
  },
  textContainer: {
    width: 194
  },
  text: {
    maxWidth: height > 570 ? 194 : 150,
    fontFamily: fonts.book,
    fontSize: height > 570 ? 16 : 14,
    lineHeight: 21
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    width: height > 570 ? 292 : 230,
    height: 46,
    marginTop: height > 570 ? 21 : 10,
    marginBottom: 21,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: fonts.semibold,
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0
  }
} );
