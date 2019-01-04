import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "../global";

const { width } = Dimensions.get( "screen" );

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
  textContainer: {
    marginLeft: 22,
    marginRight: 22,
    marginTop: 21,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  text: {
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  greenButton: {
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: colors.greenButton,
    borderRadius: 24,
    width: width - 44,
    height: 48,
    marginTop: 21,
    marginBottom: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 1,
    textAlign: "center",
    fontWeight: "500",
    color: colors.white
  }
} );
