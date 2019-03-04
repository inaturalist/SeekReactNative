import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1
  },
  map: {
    width,
    height: height - 75
  }
  // userLocation: {
  //   zIndex: 1,
  //   alignItems: "flex-end",
  //   justifyContent: "flex-end"
  // },
  // locationIcon: {
  //   marginRight: 19,
  //   marginBottom: 19,
  //   backgroundColor: colors.white,
  //   width: 50,
  //   height: 50,
  //   borderRadius: 50 / 2,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderColor: colors.white
  // }
} );
