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
    marginTop: 21,
    marginLeft: 22
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  challengesContainer: {
    flex: 1
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
    height: 96,
    width: 150
  },
  titleText: {
    fontFamily: fonts.default,
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 21,
    color: colors.seekTeal
  },
  messageText: {
    textAlign: "left",
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  circleStyle: {
    width: 59,
    height: 59,
    marginLeft: 20
  },
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20
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
    fontSize: 14,
    lineHeight: 17
  },
  noChallengeContainer: {
    marginTop: 40,
    marginBottom: 30,
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
    fontFamily: fonts.default,
    color: colors.errorGray,
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
  }
} );
