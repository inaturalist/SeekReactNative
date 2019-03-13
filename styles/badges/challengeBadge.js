import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
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
    height: 158,
    width: 140
  },
  headerText: {
    marginHorizontal: 24,
    marginTop: 24,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0,
    lineHeight: 24
  },
  text: {
    textAlign: "center",
    marginHorizontal: 24,
    marginTop: 18,
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
    width: 209,
    resizeMode: "contain"
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
