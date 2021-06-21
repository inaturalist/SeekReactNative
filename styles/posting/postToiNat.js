// @flow

import { StyleSheet, Dimensions, I18nManager } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height, width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  buttonIcon: {
    position: "absolute",
    right: 27,
    zIndex: 1
  },
  editIcon: {
    position: "absolute",
    right: 23,
    zIndex: 1
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: height / 6,
    marginLeft: height < 570 ? 14 : 27
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1
  },
  extraMargin: {
    marginHorizontal: 5
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
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
  rotate: {
    tintColor: colors.seekForestGreen,
    transform: [{ rotate: I18nManager.isRTL ? "0deg" : "180deg" }]
  },
  row: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 21,
    width: 211
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
  },
  coordsText: {
    color: colors.placeholderGray,
    fontFamily: fonts.book,
    fontSize: 12
  }
} );
