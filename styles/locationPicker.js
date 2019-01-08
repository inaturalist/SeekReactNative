import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  header: {
    backgroundColor: colors.teal,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 40,
    fontSize: fontSize.buttonText,
    color: colors.white,
    fontFamily: fonts.semibold
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
  markerCircle: {
    backgroundColor: colors.blue,
    borderWidth: 3,
    borderRadius: 100,
    borderColor: colors.white,
    width: 20,
    height: 20
  },
  userLocation: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  locationIcon: {
    marginRight: margins.medium,
    marginBottom: margins.large,
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.white
  },
  footer: {
    backgroundColor: colors.white
  },
  button: {
    backgroundColor: colors.teal,
    justifyContent: "flex-end",
    marginHorizontal: 22,
    marginBottom: margins.medium,
    marginTop: margins.medium,
    paddingTop: padding.large,
    paddingBottom: padding.large,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.buttonText,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center",
    letterSpacing: 0.7
  }
} );
