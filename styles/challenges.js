import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  loadingWheel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#37535e"
  },
  header: {
    height: 80
  },
  headerText: {
    marginTop: 40,
    marginLeft: 15,
    fontSize: 14,
    lineHeight: 12,
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium"
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
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  gridCell: {
    width: width / 3,
    height: width / 3,
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
  footer: {
    height: 50,
    bottom: -10,
    backgroundColor: "#1f3d48",
    flexDirection: "row",
    alignItems: "center"
  },
  profileButton: {
    position: "absolute",
    bottom: 5,
    left: 0,
    paddingLeft: 15
  },
  addPhotoButton: {
    position: "absolute",
    bottom: 5,
    right: 0,
    paddingRight: 15
  },
  profileText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 13,
    paddingTop: 3,
    lineHeight: 12,
    paddingLeft: 90
  }
} );
