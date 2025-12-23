import { StyleSheet, Platform } from "react-native";

import {
  colors,
  row,
  center,
  dimensions,
} from "../global";

export default StyleSheet.create( {
  center,
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  email: {
    marginHorizontal: 57,
    marginTop: 21,
    textAlign: "center",
  },
  flexCenter: {
    flexGrow: 1,
    justifyContent: "center",
  },
  greenButtonMargin: {
    marginTop: dimensions.height < 570 ? 0 : 40,
  },
  greenHeader: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    height: 55,
    justifyContent: "center",
  },
  greenHeaderText: {
    marginTop: 22,
    textAlign: "center",
  },
  header: {
    textAlign: "center",
  },
  image: {
    height: dimensions.height < 570 ? 150 : 264,
    marginBottom: 44,
    marginTop: 36,
    resizeMode: "contain",
    width: dimensions.height < 570 ? 150 : 264,
  },
  leftTextMargins: {
    marginBottom: 8,
    marginLeft: dimensions.height > 570 ? 39 : 25,
    marginTop: 16,
  },
  linkedAccountHeader: {
    marginBottom: 29,
    marginTop: 26,
    maxWidth: 313,
    textAlign: "center",
  },
  margin: {
    marginTop: ( Platform.OS === "android" || dimensions.height < 570 ) ? 10 : 22,
  },
  marginExtraLarge: {
    marginTop: 31,
  },
  marginHorizontal: {
    marginHorizontal: 23,
  },
  marginLarge: {
    marginTop: 29,
  },
  marginMedium: {
    marginTop: 25,
  },
  marginSmall: {
    marginTop: 5,
  },
  rightTextContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginRight: 41,
    paddingBottom: 11,
    paddingTop: 11,
  },
  row,
  secondHeaderTextContainer: {
    marginHorizontal: 25,
    marginTop: 11,
  },
  textContainer: {
    alignSelf: "center",
    marginHorizontal: 31,
    maxWidth: 455,
  },
  underline: {
    textDecorationLine: "underline",
  },
} );
