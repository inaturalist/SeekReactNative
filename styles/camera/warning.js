import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  innerContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: colors.white,
    width: 337
  },
  header: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: colors.seekForestGreen,
    height: 62,
    justifyContent: "center"
  },
  headerText: {
    paddingTop: Platform.OS === "ios" ? 5 : 0,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.white,
    letterSpacing: 1.0
  },
  contentContainer: {
    marginTop: 25,
    alignItems: "center"
  },
  row: {
    height: 86,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    marginRight: 24
  },
  textContainer: {
    width: height > 570 ? 198 : 150
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: height > 570 ? 16 : 14,
    lineHeight: 21
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    width: height > 570 ? 285 : 230,
    height: 46,
    marginTop: 14,
    marginBottom: 24,
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
