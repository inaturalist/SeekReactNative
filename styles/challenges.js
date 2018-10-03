import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
    resizeMode: "cover"
  },
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#37535e",
    alignItems: "center"
  },
  taxonGrid: {
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  gridCell: {
    width: "33%",
    paddingHorizontal: 6,
    marginTop: 15
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#0d2d3a"
  },
  cellTitle: {
    height: 38,
    backgroundColor: "#355c6b",
    padding: 5,
    justifyContent: "center"
  },
  cellTitleText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 13,
    paddingTop: 3,
    lineHeight: 12
  },
  header: {
    height: 80
  },
  locationChooser: {
    position: "absolute",
    bottom: 5,
    paddingLeft: 15
  },
  locationChooserText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 16
  },
  taxonChooser: {
    position: "absolute",
    bottom: 5,
    right: 0,
    paddingRight: 15
  },
  taxonChooserText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 16
  },
  footer: {
    height: 80,
    backgroundColor: "#1f3d48"
  }
} );
