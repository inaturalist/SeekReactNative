import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height, width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  buttonIcon: {
    position: "absolute",
    right: 27
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: height / 6,
    marginLeft: height < 570 ? 14 : 27
  },
  commonNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: height < 570 ? 19 : 21
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
  },
  image: {
    borderRadius: 82 / 2,
    height: 82,
    marginRight: height < 570 ? 19 : 22,
    width: 82
  },
  inputField: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    marginHorizontal: height < 570 ? 14 : 27,
    paddingBottom: 21,
    paddingTop: 21,
    textAlignVertical: "top",
    width: width - 54
  },
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 21,
    width: 211
  },
  speciesNameContainer: {
    maxWidth: 199
  },
  text: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: height < 570 ? 15 : 16,
    lineHeight: height < 570 ? 18 : 21,
    marginTop: height < 570 ? 2 : 7
  },
  textContainer: {
    marginHorizontal: height < 570 ? 14 : 27,
    marginTop: height < 570 ? 13 : 25
  },
  thinCard: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: height / 9,
    marginLeft: 27
  }
} );
