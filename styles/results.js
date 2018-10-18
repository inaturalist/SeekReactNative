import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1
  },
  header: {
    width: 100
  },
  headerText: {
    fontSize: 20,
    lineHeight: 18,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
  },
  text: {
    fontSize: 16,
    lineHeight: 14,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    flexWrap: "wrap"
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
  }
} );
