import { StyleSheet } from "react-native";

const viewStyles = StyleSheet.create( {
  banner: {
    height: 48,
    marginBottom: 32,
    marginTop: 40,
    paddingTop: 5,
    width: 284,
    alignSelf: "center"
  },
  modal: {
    marginBottom: 26,
    marginTop: 32
  }
} );

const textStyles = StyleSheet.create( {
  bannerText: {
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
