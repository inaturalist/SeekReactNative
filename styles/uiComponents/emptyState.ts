import { StyleSheet } from "react-native";

const viewStyles = StyleSheet.create( {
  container: {
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 28,
    marginVertical: 32
  },
  greenButtonMargin: {
    marginTop: 32
  }
} );

const textStyles = StyleSheet.create( {
  headerText: {
    alignSelf: "center",
    maxWidth: 279,
    textAlign: "center"
  },
  text: {
    alignSelf: "center",
    marginTop: 24,
    maxWidth: 455,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
