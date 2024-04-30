import { StyleSheet } from "react-native";
import {
  row,
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  image: {
    borderRadius: 80 / 2,
    height: 80,
    marginRight: 24,
    width: 80
  },
  notTouchable: {
    width: 276
  },
  row,
  speciesNameContainer: {
    maxWidth: 220
  },
  touchableArea: {
    width: dimensions.width
  }
} );

const textStyles = StyleSheet.create( {
  commonNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 20
  },
  scientificNameHeaderText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 20
  },
  scientificNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 15,
    marginTop: 12
  }
} );

export {
  viewStyles,
  textStyles
};
