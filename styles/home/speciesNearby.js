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
    backgroundColor: colors.seekForestGreen,
    height: 362
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
  buttonContainer: {
    marginTop: 22
  },
  buttonRow: {
    marginHorizontal: 17,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  image: {
    marginRight: 13
  },
  editImage: {
    marginLeft: 13
  },
  caretImage: {
    marginTop: 22
  },
  locationPicker: {
    paddingHorizontal: 9,
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
    marginTop: 16
  },
  taxonList: {
    paddingLeft: 20
  },
  gridCell: {
    width: 105,
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
    height: 76,
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
