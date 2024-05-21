import { StyleSheet } from "react-native";

const viewStyles = StyleSheet.create( {
  marginMedium: {
    marginTop: 26
  },
  marginSmall: {
    marginTop: 16
  }
} );

const textStyles = StyleSheet.create( {
  speciesText: {
    marginBottom: 8,
    textAlign: "center"
  },
  text: {
    lineHeight: 23,
    maxWidth: 244,
    textAlign: "center"
  }
} );


export {
  textStyles,
  viewStyles
};
