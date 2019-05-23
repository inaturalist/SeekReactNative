import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, padding } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  textContainer: {
    marginHorizontal: height < 570 ? 14 : 27,
    marginTop: height < 570 ? 13 : 25,
    marginBottom: height < 570 ? 13 : 26
  },
  card: {
    height: height / 6,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 82 / 2,
    marginRight: height < 570 ? 19 : 22
  },
  speciesNameContainer: {
    maxWidth: 199
  },
  commonNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: height < 570 ? 19 : 21,
    color: colors.black,
    fontFamily: fonts.book
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: height < 570 ? 2 : 7,
    fontFamily: fonts.book,
    color: colors.black,
    fontSize: height < 570 ? 15 : 16,
    lineHeight: height < 570 ? 18 : 21
  },
  thinCard: {
    height: height / 9,
    marginLeft: 27,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  row: {
    marginLeft: 21,
    width: 211,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  greenText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.seekForestGreen
  },
  buttonIcon: {
    position: "absolute",
    right: 27
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    width: height < 570 ? 292 : 317,
    height: 52,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.white
  }
} );
