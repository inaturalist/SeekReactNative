import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 203,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  textContainer: {
    width: 167,
    marginLeft: 24
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  text: {
    marginTop: 10,
    fontFamily: fonts.book,
    color: colors.white,
    lineHeight: 21,
    fontSize: 16
  },
  secondTextContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  badgesContainer: {
    marginTop: 5,
    // marginBottom: 25,
    marginHorizontal: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeIcon: {
    width: width / 4,
    height: width / 4,
    resizeMode: "contain"
  },
  gridCell: {
    width: width / 4,
    height: width / 4,
    marginHorizontal: 3,
    marginBottom: 12
  },
  stats: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  secondHeaderText: {
    maxWidth: 96,
    textAlign: "center",
    marginHorizontal: 23,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    lineHeight: 24,
    letterSpacing: 1.0
  },
  number: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 22,
    fontFamily: fonts.light,
    color: colors.black
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: "#22784d"
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  }
} );
