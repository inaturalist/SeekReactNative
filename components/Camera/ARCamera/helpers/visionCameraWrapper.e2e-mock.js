// This wraps the react-native-vision-camera component and methods we use,
// so we can mock them for e2e tests in simulators without camera.
import { useFrameProcessor } from "react-native-vision-camera";
import {
  mockCamera,
  mockUseCameraDevice,
  mockUseCameraFormat
} from "tests/vision-camera/vision-camera";

const Camera = mockCamera;
const useCameraDevice = mockUseCameraDevice;
const useCameraFormat = mockUseCameraFormat;

export { Camera, useCameraDevice, useCameraFormat, useFrameProcessor };
