import { StyleSheet } from "react-native";
import {
  colors,
  center,
} from "../global";

const viewStyles = StyleSheet.create( {
  center,
  speciesNearbyContainer: {
    backgroundColor: colors.seekTeal,
    height: 231,
  },
} );

const textStyles = StyleSheet.create( {
  headerText: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 4,
  },
} );

export {
  textStyles,
  viewStyles,
};
