// @flow

import { StyleSheet } from "react-native";
import {
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  bulletContainer: {
    flexDirection: "row"
  },
  valuePropBullets: {
    marginLeft: 3
  },
  iconContainer: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginRight: 17
  }
} );

const textStyles = StyleSheet.create( {
  text: {
    marginTop: 12,
    maxWidth: dimensions.width - ( 32 * 3 + 14 * 2 + 23 )
  },
  bulletText: {
    marginTop: 12,
    maxWidth: dimensions.width - ( 32 * 2 + 14 * 2 + 23 )
  },
  bulletPoints: {
    fontSize: 27,
    marginHorizontal: 14,
    marginTop: 4
  }
} );

export {
  viewStyles,
  textStyles
};
