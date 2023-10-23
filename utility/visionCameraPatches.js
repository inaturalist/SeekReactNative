/*
    This file contains various patches for handling the react-native-vision-camera library.
*/
import ImageResizer from "@bam.tech/react-native-image-resizer";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
import { PORTRAIT, PORTRAIT_UPSIDE_DOWN, LANDSCAPE_LEFT, LANDSCAPE_RIGHT } from "./customHooks";

// Needed for react-native-vision-camera v3.4.0
// This patch is used to set the pixelFormat prop which should not be needed because the default
// value would be fine for both platforms.
// However, on Android for the "native" pixelFormat I could not find any method or properties to
// transform the frame into a Bitmap which we need for the classifier currently.
// So we use the "yuv" pixelFormat which is the only one that works for now but less performant.
export const pixelFormatPatch = () => ( Platform.OS === "ios"
  ? "native"
  : "yuv" );

// Needed for react-native-vision-camera v3.4.0
// This patch is used to determine the orientation prop for the Camera component.
// On Android, the orientation prop is not used, so we return null.
// On iOS, the orientation prop is undocumented, but it does get used in a sense that the
// photo metadata shows the correct Orientation only if this prop is set.
export const orientationPatch = deviceOrientation => ( Platform.OS === "android"
  ? null
  : deviceOrientation );

// Needed for react-native-vision-camera v3.4.0 in combination with our vision-camera-plugin-inatvision
// This patch is used to determine the orientation prop for the FrameProcessor.
// This is only needed for Android, so on iOS we return null.
export const orientationPatchFrameProcessor = deviceOrientation => ( Platform.OS === "android"
  ? deviceOrientation
  : null );

// Needed for react-native-vision-camera v3.4.0
// As of this version the photo from takePhoto is not oriented coming from the native side.
// E.g. if you take a photo in landscape-right and save it to camera roll directly from the
// vision camera, it will be tilted in the native photo app. So, on iOS, depending on the
// metadata of the photo the rotation needs to be set to 0 or 180.
// On Android, the rotation is derived from the device orientation at the time of taking the
// photo, because orientation is not yet supported in the library.
export const rotationTempPhotoPatch = ( photo, deviceOrientation ) => {
  let photoRotation = 0;
  if ( Platform.OS === "ios" ) {
    switch ( photo.metadata.Orientation ) {
      case 1:
      case 3:
        photoRotation = 180;
        break;
      case 6:
      case 8:
        photoRotation = 0;
        break;
      default:
        photoRotation = 0;
    }
  } else {
    switch ( deviceOrientation ) {
      case PORTRAIT:
        photoRotation = 90;
        break;
      case LANDSCAPE_RIGHT:
        photoRotation = 180;
        break;
      case LANDSCAPE_LEFT:
        photoRotation = 0;
        break;
      case PORTRAIT_UPSIDE_DOWN:
        photoRotation = 270;
        break;
      default:
        photoRotation = 90;
    }
  }
  return photoRotation;
};

// Needed for react-native-vision-camera v3.4.0
// This patch is used to rotate the photo taken with the vision camera.
// Because the photos coming from the vision camera are not oriented correctly, we
// rotate them with image-resizer as a first step, replacing the original photo.
export const rotatePhotoPatch = async ( photo, rotation ) => {
  const tempPath = `${RNFS.DocumentDirectoryPath}/rotatedTemporaryPhotos`;
  await RNFS.mkdir( tempPath );
  // Rotate the image with ImageResizer
  const { uri: tempUri } = await ImageResizer.createResizedImage(
    photo.path,
    photo.width,
    photo.height, // height
    "JPEG", // compressFormat
    100, // quality
    rotation, // rotation
    tempPath,
    true // keep metadata
  );

  // Remove original photo
  await RNFS.unlink( photo.path );
  // Replace original photo with rotated photo
  await RNFS.moveFile( tempUri, photo.path );
};
