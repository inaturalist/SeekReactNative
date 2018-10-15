import { Dimensions, StyleSheet } from "react-native";

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
    fontSize: 18,
    flexWrap: "wrap",
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  locationText: {
    color: "#F5FCFF",
    fontFamily: "FontAwesome",
    fontSize: 24,
    marginLeft: 15,
    marginTop: 15,
    fontWeight: "600"
  },
  container: {
    flex: 1,
    backgroundColor: "#37535e"
  },
  mapContainer: {
    flexGrow: 1
  },
  button: {
    backgroundColor: "green",
    justifyContent: "flex-end",
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: "Whitney-Semibold",
    fontSize: 18,
    color: "white",
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
    height: 40,
    width: 40
  },
  markerFixed: {
    justifyContent: "center",
    alignItems: "center"
  }
} );
