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
    flexWrap: "wrap",
    height: 92,
    justifyContent: "center",
    paddingTop: 15,
    width: 108
  },
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  gridCell: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: 108
  },
  loading: {
    alignItems: "center",
    justifyContent: "center"
  },
  noTaxon: {
    alignItems: Platform.OS === "ios" ? "center" : null,
    justifyContent: Platform.OS === "ios" ? "center" : null,
    marginHorizontal: Platform.OS === "android" ? 27 : 0,
    marginTop: 54,
    width: 322
  },
  similarSpeciesContainer: {
    backgroundColor: colors.seekForestGreen,
    height: 223
  },
  similarSpeciesList: {
    marginTop: 20,
    paddingLeft: 20
  }
} );
