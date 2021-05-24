// @flow

import { StyleSheet } from "react-native";

import { colors } from "../../styles/global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";


const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  challengeList: {
    backgroundColor: colors.white,
    flexGrow: 1
  },
  header: {
    marginBottom: 10,
    marginLeft: 22,
    marginTop: 26
  },
  separator: {
    marginTop: 23
  },
  noChallenges: {
    marginBottom: 23,
    marginTop: 39
  }
} );

export default viewStyles;
