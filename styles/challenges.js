import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    width,
    height
  },
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: "#37535e",
    flexDirection: "column",
    justifyContent: "center"
  },
  header: {
    height: 100,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  },
  headerText: {
    marginLeft: 15,
    fontSize: 14,
    lineHeight: 12,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    position: "absolute",
    bottom: 30
  },
  locationChooser: {
    position: "absolute",
    bottom: 5,
    paddingLeft: 15
  },
  locationChooserText: {
    color: "#F5FCFF",
    fontFamily: "FontAwesome",
    fontSize: 18,
    fontWeight: "900"
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
  taxonGrid: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 40
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: 6,
    marginTop: 15
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#0d2d3a"
  },
  cellTitle: {
    height: 40,
    backgroundColor: "#355c6b",
    padding: 5,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  cellTitleText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 13,
    paddingTop: 3
  },
  footer: {
    height: 50,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1f3d48"
  },
  profileButton: {
    position: "absolute",
    left: 0,
    bottom: 5,
    paddingLeft: 15
  },
  addPhotoButton: {
    position: "absolute",
    right: 0,
    bottom: 5,
    paddingRight: 15
  },
  profileText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 13,
    bottom: 5,
    paddingLeft: "30%"
  }
} );
