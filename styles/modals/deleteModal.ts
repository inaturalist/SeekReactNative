import { StyleSheet } from "react-native";
import {
  row,
} from "../global";

const viewStyles = StyleSheet.create( {
  flagBackButton: {
    marginLeft: 33,
    marginRight: 29,
  },
  flagHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 62,
    width: "100%",
  },
  flagTextContainer: {
    justifyContent: "flex-end",
    marginTop: 15,
  },
  margin: {
    marginTop: 27,
  },
  marginLarge: {
    marginTop: 32,
  },
  marginSmall: {
    marginTop: 16,
  },
  row,
} );

const textStyles = StyleSheet.create( {
  buttonText: {
    marginRight: 15,
    paddingTop: 9,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    width: 292,
  },
} );

export {
  textStyles,
  viewStyles,
};
