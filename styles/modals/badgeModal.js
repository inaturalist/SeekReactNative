import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  arrow: {
    position: "absolute",
    right: 27,
    top: 198,
    zIndex: 1
  },
  carousel: {
    alignItems: "center",
    maxWidth: 366,
    width: width < 500 ? ( width - ( width * 0.1 ) ) : 400 - 400 * 0.1
    // 500 because Android Pixel XL has 411.5 width
  },
  image: {
    height: width < 366 ? ( width / 2 ) : ( 366 / 2 ),
    justifyContent: "center",
    marginBottom: 25,
    width: width < 366 ? ( width / 2 ) : ( 366 / 2 )
  },
  imageStyle: {
    resizeMode: "contain"
  },
  margin: {
    marginBottom: 9
  },
  marginLarge: {
    marginTop: 39
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
