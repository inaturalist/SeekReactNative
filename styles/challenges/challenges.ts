import { StyleSheet } from "react-native";

import { colors } from "../../styles/global";

const viewStyles = StyleSheet.create( {
  challengeList: {
    backgroundColor: colors.white,
    paddingBottom: 23,
  },
  header: {
    marginBottom: 10,
    marginLeft: 22,
    marginTop: 26,
  },
  separator: {
    marginTop: 23,
  },
  noChallenges: {
    marginBottom: 23,
    marginTop: 39,
  },
} );

export default viewStyles;
