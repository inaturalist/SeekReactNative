import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.seekForestGreen
  },
  header: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 21,
    marginLeft: 22,
    width: 185
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    paddingTop: 11,
    paddingBottom: 9,
    paddingRight: 13,
    paddingLeft: 13,
    letterSpacing: 1.12
  },
  buttons: {
    marginTop: 22
  },
  buttonRow: {
    marginHorizontal: 22,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  locationPicker: {
    borderRadius: 7,
    paddingHorizontal: 11,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  locationText: {
    fontFamily: fonts.book,
    fontSize: 26,
    color: colors.white
  },
  speciesNearbyContainer: {
    marginTop: 21
    // height: 283
  },
  taxonList: {
    paddingLeft: 20
  },
  gridCell: {
    width: 105,
    height: 230,
    paddingHorizontal: padding.medium,
    alignItems: "center",
    justifyContent: "center"
  },
  cellImage: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2
  },
  cellTitle: {
    height: 54,
    width: 90,
    paddingTop: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.default,
    lineHeight: 17,
    fontSize: fontSize.smallText
  },
  textContainer: {
    marginLeft: 22,
    marginRight: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText
  }
} );
