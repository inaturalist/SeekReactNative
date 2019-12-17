import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create( {
  padding: {
    marginBottom: Platform.OS === "android" ? 17 : 60
  }
} );
