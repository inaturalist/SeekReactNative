import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "../global";

export default StyleSheet.create( {
  badge: {
    height: dimensions.width < 350 ? 140 : 158,
    marginBottom: 35,
    marginTop: 25,
    width: 140
  },
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
  header: {
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%"
  },
  headerImage: {
    alignItems: "center",
    height: dimensions.width < 350 ? 200 : 232,
    width: "100%"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginHorizontal: 24,
    marginTop: dimensions.width < 350 ? 12 : 24,
    textAlign: "center"
  },
  logo: {
    height: 70,
    resizeMode: "contain",
    width: 209
  },
  marginBottom: {
    marginBottom: dimensions.width < 350 ? 15 : 39
  },
  seekBadge: {
    marginTop: 26,
    resizeMode: "contain",
    width: dimensions.width < 350 ? 140 : 158
  },
  seekBanner: {
    bottom: dimensions.width < 350 ? 12 : 29,
    height: 48,
    position: "absolute",
    width: 300
  },
  seekBannerText: {
    fontSize: 19,
    letterSpacing: 1.12,
    paddingTop: 10
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: dimensions.width < 350 ? 10 : 25,
    marginHorizontal: 24,
    marginTop: dimensions.width < 350 ? 12 : 18,
    textAlign: "center"
  }
} );
