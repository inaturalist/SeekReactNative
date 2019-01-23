import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    marginTop: 21,
    marginLeft: 35
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  textContainer: {
    width: 191,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  text: {
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  greenText: {
    marginTop: 4,
    fontFamily: fonts.default,
    fontSize: 16,
    lineHeight: 21,
    color: colors.seekForestGreen
  },
  circleStyle: {
    width: 59,
    height: 59,
    position: "absolute",
    top: 40,
    right: 40
  },
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20
  }
} );
