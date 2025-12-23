// This wraps the react-native-vision-camera component and methods we use,
// so we can mock them for e2e tests in simulators without camera.
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
  useLocationPermission,
} from "react-native-vision-camera";

export {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
  useLocationPermission,
};
