import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  notificationsContainer: {
    flexGrow: 1
  },
  cardContainer: {
    height: 123,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  card: {
    marginHorizontal: 24,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  image: {
    marginRight: 5,
    height: 63,
    width: 63,
    resizeMode: "contain"
  },
  textContainer: {
    marginLeft: 22,
    width: 214,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 21
  },
  messageText: {
    textAlign: "left",
    maxWidth: 232,
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
    marginTop: 26,
    marginHorizontal: 23,
    width: "85%"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  noNotifications: {
    marginHorizontal: 28,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  noNotificationsHeader: {
    marginHorizontal: 48,
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.0,
    color: colors.seekForestGreen
  },
  noNotificationsText: {
    marginTop: 24,
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );
