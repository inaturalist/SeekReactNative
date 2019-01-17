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
    height: 96
  },
  titleText: {
    maxWidth: 150,
    fontFamily: fonts.default,
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 21,
    color: colors.seekTeal
  },
  messageText: {
    textAlign: "left",
    maxWidth: 150,
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
  }
} );
