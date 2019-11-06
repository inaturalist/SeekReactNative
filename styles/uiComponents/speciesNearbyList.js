import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  cellImage: {
    borderRadius: 108 / 2,
    height: 108,
    width: 108
  },
  cellTitle: {
    flexDirection: "row",
    height: 92,
    justifyContent: "center",
    paddingTop: 13,
    width: 108
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  errorText: {
    lineHeight: 24
  },
  gridCell: {
    marginHorizontal: 14
  },
  noTaxon: {
    alignItems: Platform.OS === "ios" ? "center" : null,
    justifyContent: Platform.OS === "ios" ? "center" : null,
    marginHorizontal: Platform.OS === "android" ? 27 : 0,
    marginTop: 50,
    width: 322
  },
  taxonList: {
    marginTop: 29,
    paddingHorizontal: 20
  }
} );
