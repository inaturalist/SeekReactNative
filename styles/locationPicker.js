import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  headerText: {
    marginTop: margins.large,
    marginLeft: margins.medium,
    marginRight: margins.medium,
    justifyContent: "space-around",
    fontSize: fontSize.header,
    flexWrap: "wrap",
    color: colors.white,
    fontFamily: fonts.default
  },
  locationText: {
    color: colors.white,
    fontFamily: fonts.playful,
    fontSize: fontSize.mediumHeader,
    marginLeft: margins.medium,
    marginTop: margins.medium,
    fontWeight: "600"
  },
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  mapContainer: {
    flexGrow: 1
  },
  button: {
    backgroundColor: colors.darkGreen,
    justifyContent: "flex-end",
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.small,
    paddingTop: padding.medium,
    paddingBottom: padding.medium,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.default,
    fontSize: fontSize.buttonText,
    color: colors.white,
    textAlign: "center",
    justifyContent: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  marker: {
    width: "15%",
    height: "20%"
  },
  markerFixed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
} );
