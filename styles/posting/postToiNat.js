import { StyleSheet } from "react-native";
import { colors, fonts, padding } from "../global";

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
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    width: 317,
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
  },
  textContainer: {
    marginHorizontal: 27,
    marginTop: 25,
    marginBottom: 26
  },
  card: {
    height: 124,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 82 / 2,
    marginRight: 22
  },
  speciesNameContainer: {
    maxWidth: 199
  },
  commonNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 21,
    color: colors.black,
    fontFamily: fonts.book
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 7,
    fontFamily: fonts.book,
    color: colors.black,
    fontSize: 16,
    lineHeight: 21
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1
  },
  buttonIcon: {
    position: "absolute",
    right: 27
  },
  thinCard: {
    marginLeft: 27,
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  greenText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.seekForestGreen
  },
  row: {
    marginLeft: 21,
    width: 211,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  }
} );
