import { StyleSheet } from "react-native";

export default StyleSheet.create( {
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#000"
  },
  navigation: {
    flex: 1
  },
  gallery: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  buttons: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 15
  },
  item: {
    margin: 4,
    backgroundColor: "indianred",
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  picButton: {
    backgroundColor: "darkseagreen"
  },
  galleryButton: {
    backgroundColor: "indianred"
  },
  row: {
    flexDirection: "row"
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
