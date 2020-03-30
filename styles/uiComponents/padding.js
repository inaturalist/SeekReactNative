import { StyleSheet, Platform } from "react-native";

import { colors } from "../global";

export default StyleSheet.create( {
  padding: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "android" ? 17 : 60
  }
} );
