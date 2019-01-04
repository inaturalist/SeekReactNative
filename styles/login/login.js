import { StyleSheet, Platform } from "react-native";

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
  darkText: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center"
  },
  datePickerContainer: {
    justifyContent: "center"
  },
  inputField: {
    width: 200,
    backgroundColor: colors.white,
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  }
} );
