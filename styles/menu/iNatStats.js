import { StyleSheet, Platform, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
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
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white
  },
  logo: {
    marginTop: 30,
    marginRight: 10
  },
  backButton: {
    marginLeft: 20,
    marginHorizontal: 10
  },
  iNatLogo: {
    position: "absolute",
    right: 10,
    top: 30,
    height: height > 570 ? 65 : 45,
    width: height > 570 ? 81 : 61
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 30,
    marginBottom: 5
  },
  forestGreenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.default,
    fontSize: 16,
    marginBottom: 20
  },
  missionContainer: {
    alignItems: "flex-start",
    marginTop: 21,
    marginBottom: 40,
    backgroundColor: colors.white,
    marginHorizontal: 36
  },
  missionHeaderText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 19,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 10
  },
  missionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  italicText: {
    marginTop: 20,
    marginBottom: 20,
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21
  },
  greenButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 24,
    width: "95%",
    height: 52
  },
  buttonText: {
    fontFamily: fonts.semibold,
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: 22,
    color: colors.white
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width,
    height: 227
  },
  image: {
    width,
    height: 186,
    resizeMode: "contain"
  },
  caption: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    width: 245
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  photoContainer: {
    height: 251
  }
} );
