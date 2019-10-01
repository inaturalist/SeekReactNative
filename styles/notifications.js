import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  card: {
    height: 112,
    marginHorizontal: 22,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    marginRight: 24,
    height: 72,
    width: 72,
    resizeMode: "contain"
  },
  textContainer: {
    width: 214
  },
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 21
  },
  messageText: {
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  greenDot: {
    height: 11,
    width: 11,
    borderRadius: 11 / 2,
    backgroundColor: colors.seekiNatGreen
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1,
    marginHorizontal: 23
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.transparent
  },
  noNotifications: {
    marginHorizontal: 28,
    marginTop: height / 3 - 50,
    alignItems: "center"
  },
  noNotificationsHeader: {
    textAlign: "center",
    maxWidth: 279,
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.0,
    color: colors.seekForestGreen
  },
  noNotificationsText: {
    marginTop: 24,
    maxWidth: 319,
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );
