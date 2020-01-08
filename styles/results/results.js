import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center
} from "../global";

export default StyleSheet.create( {
  backButton: {
    paddingBottom: 18,
    paddingLeft: 23,
    paddingTop: 18,
    position: "absolute"
  },
  buttonBlue: {
    backgroundColor: colors.seekTeal
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 58
  },
  center,
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  flex: {
    flex: 0
  },
  header: {
    height: 186,
    overflow: "visible"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "center"
  },
  imageCell: {
    borderRadius: 150 / 2,
    height: 150,
    width: 150
  },
  imageContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden"
  },
  linkText: {
    alignSelf: "center",
    color: colors.linkText,
    fontFamily: fonts.book,
    fontSize: 18,
    textDecorationLine: "underline"
  },
  marginLarge: {
    marginTop: 50
  },
  marginMedium: {
    marginBottom: 28
  },
  speciesText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 22,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  textContainer: {
    marginHorizontal: 41
  }
} );
