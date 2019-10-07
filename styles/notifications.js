import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "./global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  card: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 112,
    justifyContent: "flex-start",
    marginHorizontal: 22
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1,
    marginHorizontal: 23
  },
  greenDot: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 11 / 2,
    height: 11,
    width: 11
  },
  image: {
    height: 72,
    marginRight: 24,
    resizeMode: "contain",
    width: 72
  },
  messageText: {
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  noNotifications: {
    alignItems: "center",
    marginHorizontal: 28,
    marginTop: height / 3 - 50
  },
  noNotificationsHeader: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    maxWidth: 279,
    textAlign: "center"
  },
  noNotificationsText: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 24,
    maxWidth: 319,
    textAlign: "center"
  },
  textContainer: {
    width: 214
  },
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 6
  }
} );
