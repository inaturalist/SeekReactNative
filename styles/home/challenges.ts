import { StyleSheet } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  challengeContainer: {
    backgroundColor: colors.darkGray
  },
  container: {
    backgroundColor: colors.white
  },
  header: {
    paddingBottom: 21,
    paddingHorizontal: 22,
    paddingTop: 25
  },
  marginMedium: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: 22
  },
  marginTop: {
    marginTop: 31
  }
} );

const textStyles = StyleSheet.create( {
  viewText: {
    alignSelf: "center",
    paddingBottom: 31,
    paddingTop: 15,
    textDecorationLine: "underline"
  }
} );

export {
  viewStyles,
  textStyles
};
