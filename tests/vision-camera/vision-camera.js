import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import React from "react";
import { View } from "react-native";
import RNFS from "react-native-fs";

const mockFrame = {
  isValid: true,
  width: 1920,
  height: 1080,
  bytesPerRow: 1920,
  planesCount: 1,
  isMirrored: false,
  timestamp: 0,
  orientation: "portrait",
  pixelFormat: "yuv",
  // Returns a fake ArrayBuffer
  toArrayBuffer: () => new ArrayBuffer( 1920 * 1080 ),
  toString: () => "Frame",
  getNativeBuffer: () => ( {
    // Returns a fake pointer
    pointer: 0,
    delete: () => null
  } ),
  incrementRefCount: () => null,
  decrementRefCount: () => null
};

const style = { flex: 1, backgroundColor: "red" };
export class mockCamera extends React.PureComponent {
  static async getAvailableCameraDevices() {
    return [
      {
        position: "back"
      }
    ];
  }

  static getCameraPermissionStatus() {
    return "granted";
  }

  /*
    Every time the component updates we are running the frame processor that is a prop
    to the camera component. We are running the frame processor with a mocked frame that
    does not include any kind of image data at all.
    Running it only on component update means it only is called a few times and not
    every second (or so - depending on fps). This is enough to satisfy the e2e test
    though because the mocked prediction needs to appear only once to be found by the
    test matcher. I tried running it with a timer every second but since it never idles
    the test never finishes.
  */
  componentDidUpdate() {
    const { frameProcessor } = this.props;
    frameProcessor?.frameProcessor( mockFrame );
  }


  async takePhoto( ) {
    // TODO: this only works on iOS
    return CameraRoll.getPhotos( {
      first: 20,
      assetType: "Photos"
    } )
      .then( async ( r ) => {
        /*
          Basically, here, we are reading the newest twenty photos from the simulators gallery
          and return the oldest one of those. Copy it to a new path and treat it as a new photo.
        */
        const testPhoto = r.edges[r.edges.length - 1].node.image;
        let oldUri = testPhoto.uri;
        if ( testPhoto.uri.includes( "ph://" ) ) {
          let id = testPhoto.uri.replace( "ph://", "" );
          id = id.substring( 0, id.indexOf( "/" ) );
          oldUri = `assets-library://asset/asset.jpg?id=${id}&ext=jpg`;
          console.log( `Converted file uri to ${oldUri}` );
        }
        const encodedUri = encodeURI( oldUri );
        const destPath = `${RNFS.TemporaryDirectoryPath}temp.jpg`;
        const newPath = await RNFS.copyAssetsFileIOS(
          encodedUri,
          destPath,
          0,
          0
        );
        const photo = { uri: newPath, predictions: [] };
        if ( typeof photo !== "object" ) {
          console.log( "photo is not an object", typeof photo );
          return null;
        }
        return {
          ...testPhoto,
          path: newPath,
          metadata: {
            Orientation: testPhoto.orientation
          }
        };
      } )
      .catch( ( err ) => {
        console.log( "Error getting photos", err );
        return null;
      } );
  }

  render() {
    return <View testID="mock-camera" style={style} />;
  }
}

export const mockSortDevices = ( _left, _right ) => 1;

export const mockUseCameraDevice = ( _deviceType ) => {
  const device = {
    devices: ["wide-angle-camera"],
    hasFlash: true,
    hasTorch: true,
    id: "1",
    isMultiCam: true,
    maxZoom: 12.931958198547363,
    minZoom: 1,
    name: "front (1)",
    neutralZoom: 1,
    position: "front",
    supportsDepthCapture: false,
    supportsFocus: true,
    supportsLowLightBoost: false,
    supportsParallelVideoProcessing: true,
    supportsRawCapture: true
  };
  return device;
};

export const mockUseCameraFormat = ( _device ) => {
  const format = {
    autoFocusSystem: "contrast-detection",
    fieldOfView: 83.97117848314457,
    maxFps: 60,
    maxISO: 11377,
    minFps: 15,
    minISO: 44,
    photoHeight: 3024,
    photoWidth: 4032,
    pixelFormats: ["yuv", "native"],
    supportsDepthCapture: false,
    supportsPhotoHdr: false,
    supportsVideoHdr: false,
    videoHeight: 2160,
    videoStabilizationModes: ["off", "cinematic", "cinematic-extended"],
    videoWidth: 3840
  };
  return format;
};
