import { StyleSheet, Platform } from "react-native";
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
    height: 356
  },
  header: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 21,
    marginLeft: 22,
    justifyContent: "center",
    alignItems: "center",
    height: 39,
    width: 185
  },
  headerText: {
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  buttonContainer: {
    marginTop: 22,
    marginLeft: 22
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  image: {
    marginRight: 13
  },
  editImage: {
    marginLeft: 13
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
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "center"
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
