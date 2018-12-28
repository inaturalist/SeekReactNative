import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    flexGrow: 1
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  header: {
    marginTop: 43,
    marginLeft: 22
  },
  headerText: {
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.teal,
    fontWeight: "600",
    letterSpacing: 1.12
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  greenButton: {
    backgroundColor: colors.greenButton,
    borderRadius: 7,
    width: 203,
    height: 34,
    marginTop: 32,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  smallGreenButton: {
    width: 104
  },
  buttonText: {
    fontSize: fontSize.smallText,
    color: colors.white
  },
  speciesContainer: {
    height: 263
  },
  gridCell: {
    width: 105,
    height: 138,
    paddingHorizontal: padding.medium
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden"
  },
  cellImage: {
    width: 90,
    height: 90,
    borderRadius: 50
  },
  cellTitle: {
    height: 34,
    padding: padding.medium,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: colors.black,
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText,
    paddingTop: padding.extraSmall
  },
  textContainer: {
    marginLeft: 22,
    marginRight: 22,
    marginTop: 43,
    marginBottom: 43,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  text: {
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText
  }
} );
