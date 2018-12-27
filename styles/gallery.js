import { Dimensions, StyleSheet, Platform } from "react-native";
import { colors, padding } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  background: {
    flex: 1
  },
  navbar: {
    height: ( Platform.OS === "android" || height < 700 ) ? 60 : 85
  },
  galleryContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.lightGray
  },
  container: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  button: {
    paddingHorizontal: padding.extraSmall,
    paddingTop: padding.small
  },
  image: {
    width: width / 4 - 2,
    height: width / 4 - 2
  }
} );
