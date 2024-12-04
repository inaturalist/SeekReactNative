// This wraps the react-native-vision-camera component and methods we use,
// so we can mock them for e2e tests in simulators without camera.
/*
  Note that we are not mocking the useFrameProcessor hook. So, in the e2e test
  a real frame processor in the sense of react-native-vision-camera is built.
  As you can see in the next wrapper file our plugin is not used though in this
  frame processor and only a mocked prediction is immediately returned.
*/
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
