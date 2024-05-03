// @flow

import { StyleSheet } from "react-native";
import { colors, padding } from "../global";

const spaceBelowTags = 6;

const viewStyles = StyleSheet.create( {
  tag: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    flexDirection: "row",
    marginBottom: spaceBelowTags,
    marginRight: 10,
    paddingBottom: 4,
    paddingTop: 4
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 28
  },
  tagAndSeenDate: {
    marginBottom: 26 - spaceBelowTags
  },
  noTags: {
    marginTop: 29
  }
} );

const textStyles = StyleSheet.create( {
  tagText: {
    paddingHorizontal: 9,
    paddingTop: padding.iOSButtonPadding
  }
} );

export {
  viewStyles,
  textStyles
};
