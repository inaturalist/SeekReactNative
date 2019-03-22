import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    marginTop: 26,
    marginLeft: 22,
    marginBottom: 10
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  cardContainer: {
    height: 95,
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
  image: {
    marginRight: 20,
    width: 68,
    height: 68,
    resizeMode: "contain"
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 96,
    width: 150
  },
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginBottom: 1,
    lineHeight: 21,
    color: colors.seekTeal
  },
  messageText: {
    textAlign: "left",
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  startButton: {
    alignItems: "center",
    width: 59,
    marginLeft: 20
  },
  greenText: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    fontSize: 16,
    lineHeight: 17
  },
  noChallengeContainer: {
    height: 121,
    alignItems: "center",
    justifyContent: "center"
  },
  noChallengeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap"
  },
  noChallengeTextContainer: {
    marginLeft: 30,
    justifyContent: "center"
  },
  noChallengeText: {
    width: 229,
    textAlign: "center",
    fontFamily: fonts.medium,
    color: colors.black,
    fontSize: 19,
    lineHeight: 24
  },
  lightText: {
    marginTop: 10,
    width: 204,
    textAlign: "center",
    fontFamily: fonts.light,
    color: colors.errorGray,
    fontSize: 16,
    lineHeight: 18
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  }
} );
