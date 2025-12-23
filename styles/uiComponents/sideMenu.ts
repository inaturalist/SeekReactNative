import { StyleSheet } from "react-native";

import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerWhite,
  },
  menuItem: {
    paddingVertical: 21,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
} );

const imageStyles = StyleSheet.create( {
  icon: {
    height: 25,
    marginHorizontal: 25,
    resizeMode: "contain",
    tintColor: colors.menuItems,
    width: 27,
  },
  seekLogo: {
    alignSelf: "center",
    height: 79,
    marginVertical: 62 - 21,
    resizeMode: "contain",
    width: 223,
  },
} );

const textStyles = StyleSheet.create( {
  text: {
    flex: 1,
    paddingEnd: 4,
  },
} );

export {
  textStyles,
  imageStyles,
  viewStyles,
};
