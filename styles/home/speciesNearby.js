import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  androidSecondButtonText: {
    backgroundColor: colors.white,
    borderRadius: 6,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    height: 29,
    letterSpacing: 1.12,
    paddingBottom: 2,
    paddingHorizontal: 9,
    paddingTop: 6,
    textAlign: "left",
    width: 140
  },
  buttonContainer: {
    marginBottom: 15,
    marginLeft: 22,
    marginTop: 30
  },
  buttonRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 15
  },
  buttonText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
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
  container: {
    backgroundColor: colors.seekForestGreen,
    height: 422
  },
  gridCell: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: 108
  },
  header: {
    marginLeft: 22,
    marginTop: 21
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  image: {
    height: 21,
    marginRight: 13,
    resizeMode: "contain",
    width: 16
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
  secondButtonText: {
    backgroundColor: colors.white,
    borderRadius: 6,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    height: 29,
    letterSpacing: 1.12,
    paddingHorizontal: 9,
    paddingTop: 3
  },
  similarSpeciesContainer: {
    backgroundColor: colors.seekForestGreen,
    height: 223
  },
  similarSpeciesList: {
    marginTop: 20,
    paddingLeft: 20
  },
  speciesNearbyContainer: {
    backgroundColor: "#2a7353",
    height: 231
  },
  taxonList: {
    marginTop: 29,
    paddingLeft: 20
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 18
  },
  textContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 22,
    marginRight: 22
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderRadius: 6,
    height: 29,
    justifyContent: "center",
    paddingHorizontal: 9
  }
} );
