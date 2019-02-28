import { StyleSheet, Platform } from "react-native";
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
  header: {
    backgroundColor: colors.seekTeal,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  image: {
    marginTop: 25,
    marginBottom: 35,
    height: 183,
    width: 183
  },
  headerText: {
    marginHorizontal: 27,
    marginTop: 16,
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: "#4a4a4a",
    lineHeight: 24
  },
  text: {
    textAlign: "center",
    marginHorizontal: 27,
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  center: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    height: 70,
    width: 209
  },
  backButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  banner: {
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    paddingTop: 10,
    width: 284,
    height: 48
  },
  bannerText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.white,
    letterSpacing: 0.42,
    lineHeight: 34
  }
} );
