import { requireNativeComponent, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const INatCamera = requireNativeComponent( "RCTINatCameraView", {
  name: "INatCamera",
  propTypes: {
    taxaDetectionInterval: PropTypes.string,
    modelPath: PropTypes.string,
    taxonomyPath: PropTypes.string,
    modelSize: PropTypes.string,
    ...ViewPropTypes
  }
} );

export default INatCamera;
