import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fonts } from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  header: {
    backgroundColor: colors.white,
    height: 60,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  headerText: {
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  },
  image: {
    width,
    height: width
  },
  footer: {
    alignItems: "center",
    marginBottom: 50
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 24,
    width: "80%",
    height: 46
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: 18,
    color: colors.white
  },
  backButton: {
    padding: 10
  }
} );
