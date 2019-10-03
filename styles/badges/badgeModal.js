import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  arrow: {
    position: "absolute",
    right: 27,
    top: 198,
    zIndex: 1
  },
  carousel: {
    alignItems: "center",
    width: width - ( width * 0.1 )
  },
  image: {
    height: width / 2,
    justifyContent: "center",
    marginBottom: 25,
    width: width / 2
  },
  imageStyle: {
    resizeMode: "contain"
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 40,
    height: height > 570 ? 525 : 475
  },
  margin: {
    marginBottom: 9
  },
  nameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    marginHorizontal: 27,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 47
  },
  smallImage: {
    height: 57,
    marginHorizontal: 20,
    resizeMode: "contain",
    width: 57
  }
} );
