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
    marginBottom: 21,
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
    marginTop: 21,
    marginBottom: 21,
    height: 236
  },
  taxonContainer: {
    marginLeft: 22,
    height: 159
  },
  gridCell: {
    width: 105,
    height: 159,
    paddingHorizontal: padding.medium,
    alignItems: "center",
    justifyContent: "center"
  },
  cellImage: {
    width: 90,
    height: 90,
    borderRadius: 50
  },
  cellTitle: {
    height: 34,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
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
