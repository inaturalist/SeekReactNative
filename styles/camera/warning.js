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
    width: height > 570 ? 337 : 280
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
    marginTop: 31,
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    marginBottom: 28
  },
  image: {
    width: 39,
    height: 39,
    resizeMode: "contain",
    marginRight: 22
  },
  textContainer: {
    width: height > 570 ? 198 : 150
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    width: height > 570 ? 285 : 230,
    height: 46,
    marginTop: 24,
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
