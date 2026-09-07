// This wraps the react-native-vision-camera component and methods we use,
// so we can mock them for e2e tests in simulators without camera.
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameOutput,
  usePhotoOutput,
} from "react-native-vision-camera";
import { useLocation } from "react-native-vision-camera-location";

export {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameOutput,
  useLocation,
  usePhotoOutput,
};
