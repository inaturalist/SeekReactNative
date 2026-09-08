// This wraps the react-native-vision-camera component and methods we use,
// so we can mock them for e2e tests in simulators without camera.
/*
  Note that we are not mocking the frame output worklet runtime. In the e2e test
  the mock camera invokes onFrame with a fake frame on component update.
  As you can see in the next wrapper file our plugin is not used though in this
  frame output path and only a mocked prediction is immediately returned.
*/
import {
  mockCamera,
  mockUseAsyncRunner,
  mockUseCameraDevice,
  mockUseCameraPermission,
  mockUseFrameOutput,
  mockUseLocation,
  mockUsePhotoOutput,
} from "tests/vision-camera/vision-camera";

const Camera = mockCamera;
const useAsyncRunner = mockUseAsyncRunner;
const useCameraDevice = mockUseCameraDevice;
const useCameraPermission = mockUseCameraPermission;
const useFrameOutput = mockUseFrameOutput;
const useLocation = mockUseLocation;
const usePhotoOutput = mockUsePhotoOutput;

export {
  Camera,
  useAsyncRunner,
  useCameraDevice,
  useCameraPermission,
  useFrameOutput,
  useLocation,
  usePhotoOutput,
};
