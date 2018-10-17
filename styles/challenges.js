import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    width,
    height
  },
  loadingWheel: {
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#37535e",
    flexDirection: "column"
  },
  header: {
    flex: 1,
    paddingTop: "5%",
    flexDirection: "row",
    justifyContent: "flex-start"
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
    flexGrow: 1
  },
  gridCell: {
    width: width / 3 - 3,
    height: width / 3 - 3,
    paddingHorizontal: 6,
    paddingTop: 10,
    marginTop: 15
  },
  gridCellContents: {
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#0d2d3a"
  },
  cellTitle: {
    height: "30%",
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
    paddingTop: 3,
    lineHeight: 12
  },
  footer: {
    flex: 0.2,
    height: 40,
    justifyContent: "flex-end",
    backgroundColor: "#1f3d48",
    flexDirection: "column"
  },
  bottomNavigation: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  profileButton: {
    position: "absolute",
    left: 0,
    paddingLeft: 15,
    paddingBottom: "10%"
  },
  addPhotoButton: {
    position: "absolute",
    right: 0,
    paddingRight: 15,
    paddingBottom: "10%"
  },
  profileText: {
    color: "#F5FCFF",
    fontFamily: "Whitney-Medium",
    fontSize: 13,
    paddingLeft: "30%",
    paddingBottom: "10%"
  }
} );
