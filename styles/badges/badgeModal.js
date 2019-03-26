import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    height: height > 570 ? 525 : 475,
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: colors.white
  },
  carousel: {
    alignItems: "center",
    width: width - ( width * 0.1 )
  },
  image: {
    marginBottom: 25,
    height: width / 2,
    justifyContent: "center",
    width: width / 2
  },
  imageStyle: {
    resizeMode: "contain"
  },
  row: {
    marginTop: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 47
  },
  smallImage: {
    height: 57,
    width: 57,
    resizeMode: "contain",
    marginHorizontal: 20
  },
  headerText: {
    marginHorizontal: 27,
    marginBottom: 9,
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12,
    lineHeight: 24
  },
  backButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  nameText: {
    marginHorizontal: 27,
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    color: colors.black
  },
  arrow: {
    zIndex: 1,
    position: "absolute",
    top: 198,
    right: 27
  }
} );
