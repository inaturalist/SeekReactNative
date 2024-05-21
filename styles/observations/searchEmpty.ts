import { StyleSheet } from "react-native";

const viewStyles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 43 - 24
  },
  margin: {
    marginTop: 42
  }
} );

const textStyles = StyleSheet.create( {
  headerText: {
    textAlign: "center",
    width: 247
  }
} );

export {
  textStyles,
  viewStyles
};
