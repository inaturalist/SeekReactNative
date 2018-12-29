import { StyleSheet } from "react-native";

import { fonts, colors } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: "#44ab55"
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 0.5,
    color: colors.white,
    marginLeft: 22,
    marginRight: 22
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  inputField: {
    width: 200,
    backgroundColor: colors.white
  }
} );
