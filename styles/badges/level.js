import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  outerContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    borderRadius: 40,
    backgroundColor: colors.white
  },
  backgroundColor: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    textAlign: "center",
    marginTop: 35,
    marginBottom: 20,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  image: {
    width: 213,
    height: 213
  },
  nameText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  text: {
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 20,
    fontFamily: fonts.book,
    color: colors.black,
    lineHeight: 21,
    fontSize: 16
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
} );
