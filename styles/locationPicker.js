import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  headerText: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
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
    marginLeft: 15,
    marginTop: 15,
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
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
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
