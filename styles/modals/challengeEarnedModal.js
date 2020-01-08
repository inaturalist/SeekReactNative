import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  banner: {
    bottom: 20,
    height: 48,
    paddingTop: 10,
    position: "absolute",
    width: 284,
    zIndex: 1
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 15,
    letterSpacing: 0.42,
    lineHeight: 34,
    textAlign: "center"
  },
  center: {
    alignItems: "center",
    marginTop: 10
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.seekTeal,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    width: "100%"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginHorizontal: 24,
    marginTop: 24,
    textAlign: "center"
  },
  image: {
    height: 158,
    marginBottom: 35,
    marginTop: 25,
    width: 140
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: colors.white
  },
  logo: {
    height: 70,
    resizeMode: "contain",
    width: 209
  },
  marginBottom: {
    marginBottom: 30
  },
  modalBottom: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  modalTop: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 24,
    marginTop: 18,
    textAlign: "center"
  }
} );
