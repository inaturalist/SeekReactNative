import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    marginTop: 21,
    marginLeft: 22
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.teal,
    // fontWeight: "600",
    letterSpacing: 1.12
  },
  buttonRow: {
    marginHorizontal: 22,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  greenButton: {
    backgroundColor: colors.greenButton,
    borderRadius: 7,
    paddingHorizontal: 11,
    height: 34,
    marginBottom: 21,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  smallGreenButton: {
    width: 104
  },
  buttonText: {
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    color: colors.white
  },
  speciesContainer: {
    marginTop: 21,
    height: 236
  },
  taxonContainer: {
    marginLeft: 20,
    height: 175
  },
  gridCell: {
    width: 105,
    height: 175,
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
    marginTop: 10,
    paddingTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.default,
    fontSize: fontSize.smallText,
    paddingTop: padding.extraSmall
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
