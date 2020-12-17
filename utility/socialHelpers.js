import CameraRoll from "@react-native-community/cameraroll";
import Share from "react-native-share";
import { Platform, Image } from "react-native";
import Marker from "react-native-image-marker";

import logos from "../assets/logos";

const shareToFacebook = async ( backgroundImage ) => {
  const shareOptions = {
    backgroundImage,
    social: Share.Social.FACEBOOK
  };

  try {
    const share = await Share.shareSingle( shareOptions );
    return share;
  } catch ( e ) {
    console.log( "couldn't share to FB: ", e );
  }
};

const saveToCameraRoll = async ( uri ) => {
  try {
    const savedPhotoUri = CameraRoll.save( uri, { type: "photo", album: "Seek" } );
    return savedPhotoUri;
  } catch ( e ) {
    return e;
  }
};

const addWatermark = async( userImage ) => {
  const imageOptions = {
    src: userImage,
    markerSrc: logos.seek, // icon uri
    X: 100, // left
    Y: 150, // top
    scale: 1, // scale of bg
    markerScale: 0.5, // scale of icon
    quality: 100, // quality of image
    saveFormat: "jpeg"
  };

  try {
    const path = Marker.markImage( imageOptions );
    const watermarkedImageUri = Platform.OS === "android" ? "file://" + path : path;
    return watermarkedImageUri;
  } catch ( e ) {
    return e;
  }
};

const getOriginalHeight = ( uri ) => {
  let originalHeight = 0;
  Image.getSize( uri, ( width, height ) => {
    originalHeight = height;
  } );

  return originalHeight;
};

export {
  shareToFacebook,
  saveToCameraRoll,
  addWatermark,
  getOriginalHeight
};
