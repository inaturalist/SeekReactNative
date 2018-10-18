import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    width,
    height,
    flexDirection: "column"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  buttons: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: colors.white,
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.buttonText,
    fontFamily: fonts.default
  },
  main: {
    flexGrow: 1
  },
  footer: {
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  capture: {
    flex: 0,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderRadius: 100,
    alignItems: "flex-end",
    justifyContent: "center",
    borderColor: colors.lightGray,
    alignSelf: "center",
    width: 50,
    height: 50
  }
} );
