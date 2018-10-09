import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: "black",
    width,
    height
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  pending: {
    flex: 1,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center"
  },
  top: {
    marginTop: "30%",
    flexDirection: "row"
  },
  buttons: {
    color: "white",
    marginRight: "15%",
    flexDirection: "row"
  },
  bottom: {
    marginBottom: 20
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d3d3d3",
    alignSelf: "center",
    width: 50,
    height: 50
  }
} );
