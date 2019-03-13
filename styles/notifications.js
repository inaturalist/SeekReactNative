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
  greenContainer: {
    backgroundColor: "#CDE5DA"
  },
  cardContainer: {
    height: 118,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  card: {
    marginHorizontal: 23,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageContainer: {
    marginRight: 20
  },
  image: {
    marginRight: 5
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleText: {
    maxWidth: 232,
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 21
  },
  messageText: {
    textAlign: "left",
    maxWidth: 232,
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1,
    marginTop: 10,
    marginHorizontal: 27,
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
