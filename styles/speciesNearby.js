import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1
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
  }
} );
