import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

const { height, width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  header: {
    height: 55,
    backgroundColor: colors.seekForestGreen
  },
  backButton: {
    top: 18,
    left: 23
  },
  text: {
    top: Platform.OS === "android" ? -4 : null,
    alignSelf: "center",
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0,
    fontFamily: fonts.semibold
  },
  touchable,
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    height: 63,
    backgroundColor: colors.seekForestGreen
  },
  inputField: {
    marginLeft: 11,
    width: "81%",
    backgroundColor: colors.white,
    height: 37,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 40,
    paddingLeft: 16,
    fontFamily: fonts.book,
    fontSize: 15
  },
  photoContainer: {
    backgroundColor: colors.black,
    height: 155
  }
} );
