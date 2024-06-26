import {
  StyleSheet,
  Platform
} from "react-native";
import {
  colors,
  row,
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  button: {
    paddingBottom: dimensions.height > 570 ? 24 : 17,
    paddingTop: dimensions.height > 570 ? 28 : 26
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 67,
    justifyContent: "center",
    width: "100%"
  },
  margin: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: dimensions.height > 570 ? 18 : 26
  },
  marginTop: {
    marginTop: dimensions.height > 570 ? 26 : 24
  },
  row
} );

const textStyles = StyleSheet.create( {
  headerText: {
    paddingTop: Platform.OS === "ios" ? 9 : 0,
    textAlign: "center"
  },
  text: {
    maxWidth: 206
  },
  wideText: {
    maxWidth: 270,
    textAlign: "center"
  }
} );

const imageStyles = StyleSheet.create( {
  image: {
    height: 40,
    marginRight: 22,
    resizeMode: "contain",
    width: 40
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
