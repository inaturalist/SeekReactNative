import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  backButton: {
    top: 38,
    left: 23
  },
  image: {
    padding: 5
  },
  header: {
    backgroundColor: colors.seekForestGreen
  },
  textContainer: {
    top: 16,
    alignSelf: "center"
  },
  headerText: {
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0,
    fontFamily: fonts.semibold,
    marginBottom: 16
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 23,
    marginTop: 15,
    marginBottom: 15
  },
  locationText: {
    color: colors.white,
    fontFamily: fonts.playful,
    fontSize: fontSize.mediumHeader,
    marginLeft: margins.medium,
    marginTop: margins.medium
  },
  mapContainer: {
    flexGrow: 1
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  markerFixed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  markerPin: {
    width: 23,
    height: 33,
    position: "absolute"
  },
  greenCircle: {
    width: 281,
    height: 281,
    backgroundColor: colors.seekGreen,
    opacity: 0.33,
    borderRadius: 281 / 2
  },
  userLocation: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  locationIcon: {
    marginRight: 19,
    marginBottom: 19,
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.white
  },
  footer: {
    backgroundColor: colors.white,
    height: 86
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 22,
    marginBottom: margins.medium,
    marginTop: margins.medium,
    height: 46,
    borderRadius: 40
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: fontSize.buttonText,
    color: colors.white,
    letterSpacing: 0.7
  },
  locationRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  inputField: {
    width: "91%",
    backgroundColor: colors.white,
    height: 37,
    borderRadius: 40,
    paddingLeft: padding.extraLarge
  }
} );
