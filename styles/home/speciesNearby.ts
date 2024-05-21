import { StyleSheet } from "react-native";
import {
  colors,
  row
} from "../global";

const viewStyles = StyleSheet.create( {
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.seekForestGreen
  },
  header: {
    marginBottom: 22,
    marginLeft: 23,
    marginTop: 23
  },
  marginBottom: {
    marginBottom: 23
  },
  marginLeft: {
    marginLeft: 22
  },
  paddingBottom: {
    paddingBottom: 15
  },
  paddingTop: {
    paddingTop: 15
  },
  row,
  speciesNearbyContainer: {
    backgroundColor: colors.speciesNearbyGreen,
    height: 223
  },
  speciesNearbyPadding: {
    backgroundColor: colors.seekForestGreen,
    paddingBottom: 20
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingBottom: 4,
    paddingHorizontal: 9,
    paddingTop: 4
  },
  locationPickerButton: {
    paddingBottom: 15,
    marginLeft: 22
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 21,
    marginLeft: 10,
    marginRight: 13,
    resizeMode: "contain",
    tintColor: colors.white,
    width: 16
  }
} );

export {
  viewStyles,
  imageStyles
};
