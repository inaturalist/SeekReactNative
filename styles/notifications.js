import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  headerText: {
    marginTop: 40,
    marginBottom: 13,
    fontSize: fontSize.buttonText,
    color: colors.white,
    fontFamily: fonts.semibold
  },
  notificationsContainer: {
    flexGrow: 1
  },
  cardContainer: {
    height: 118,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    marginHorizontal: 20,
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
    justifyContent: "center",
    height: 96
  },
  titleText: {
    maxWidth: 232,
    fontFamily: fonts.default,
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
  }
} );
