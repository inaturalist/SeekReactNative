import { StyleSheet, Platform } from "react-native";

import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  padding: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "android" ? 17 : 60,
  },
} );

export default viewStyles;
