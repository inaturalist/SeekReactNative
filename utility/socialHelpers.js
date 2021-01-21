import CameraRoll from "@react-native-community/cameraroll";
import Share from "react-native-share";
import { Platform, Alert } from "react-native";
import Marker from "react-native-image-marker";
import RNFS from "react-native-fs";

import i18n from "../i18n";
import backgrounds from "../assets/backgrounds";
import { colors, fonts } from "../styles/global";

const shareToFacebook = async ( url ) => {
  // this shares to newsfeed, story, or profile photo on Android
  const shareOptions = {
    url,
    social: Share.Social.FACEBOOK
  };

  try {
    const share = await Share.shareSingle( shareOptions );
    return share;
  } catch ( e ) {
    if ( e.error.code === "ECOM.RNSHARE1" ) {
      Alert.alert(
        i18n.t( "social.error_title" ),
        i18n.t( "social.error" )
      );
    }
    console.log( "couldn't share to FB because: ", e );
  }
};

const saveToCameraRoll = async ( uri ) => {
  try {
    const savedPhotoUri = CameraRoll.save( uri, { type: "photo", album: "Seek" } );
    return savedPhotoUri;
  } catch ( e ) {
    Alert.alert(
      i18n.t( "social.error_title" ),
      `${i18n.t( "camera.error_save" )} ${e}`
    );
    console.log( "couldn't save photo because", e );
  }
};

const getAndroidCameraRollPath = async ( uri ) => {
  const { originalFilepath } = await RNFS.stat( uri );
  return "file://" + originalFilepath;
};

const getScaleNumber = ( width ) => {
  if ( Platform.OS === "ios" ) {
    // working on iPhone XS
    return ( width / 150 + width / 150 ) / 15;
  }
  // this is working for all crops on Pixel XL after resizing photo to 2048 * 2048
  return 1.85;
};

const placeCommonNameText = ( width ) => width - getScaleNumber( width ) * 145;

const placeScientificNameText = ( width ) => width - getScaleNumber( width ) * 90;

const xPosition = ( width ) => {
  return getScaleNumber( width ) * 190;
  // return getScaleNumber( width ) * 200;
};

const setFontSize = ( width ) => getScaleNumber( width ) * 45;

const alignToBottom = ( width ) => {
  return width - getScaleNumber( width ) * 138;
};

const addTextToWatermark = async( userImage, text, position, type, width ) => {
  const yPosition = ( ) => {
    if ( type === "original" ) {
      return position === 1 ? 1853 : 1933;
    } else {
      return position === 1 ? placeCommonNameText( width ) : placeScientificNameText( width );
    }
  };

  const imageOptions = {
    src: userImage,
    text,
    X: type === "square" ? xPosition( width ) : 290, // left
    Y: yPosition( ), // top
    color: colors.white,
    fontName: position === 1 ? fonts.semibold : fonts.bookItalic,
    fontSize: type === "square" ? setFontSize( width ) : 62,
    scale: 1,
    quality: 100
  };

  try {
    const path = await Marker.markText( imageOptions );
    const uri = Platform.OS === "android" ? "file://" + path : path;
    return uri;
  } catch ( e ) {
    return e;
  }
};

const addWatermark = async( userImage, commonName, name, type, width ) => {
  // resized original photo to 2048 * 2048 to be able to align watermark
  const originalPath = Platform.OS === "android" ? await getAndroidCameraRollPath( userImage ) : userImage;

  const imageOptions = {
    src: originalPath,
    markerSrc: backgrounds.sharing,
    scale: 1, // scale of bg
    markerScale: type === "square" ? getScaleNumber( width ) : 1.39, // scale of icon
    quality: 100, // quality of image
    saveFormat: "jpeg"
  };

  if ( type === "square" ) {
    // this doesn't quite align to bottom but it's close
    imageOptions.position = "bottomCenter";
  } else {
    imageOptions.X = 0;
    imageOptions.Y = 1793;
  }

  try {
    const path = await Marker.markImage( imageOptions );
    const watermarkedImageUri = Platform.OS === "android" ? "file://" + path : path;
    const uriWithCommonName = await addTextToWatermark( watermarkedImageUri, commonName, 1, type, width );
    const uriWithBothNames = await addTextToWatermark( uriWithCommonName, name, 2, type, width );
    return uriWithBothNames;
  } catch ( e ) {
    return e;
  }
};

// adapted from https://stackoverflow.com/questions/50909390/react-native-how-to-get-file-asset-image-absolute-path
const getAssetFileAbsolutePath = async ( assetPath ) => {
  if ( Platform.OS === "android" ) { return assetPath; }
  const dest = `${RNFS.TemporaryDirectoryPath}${Math.random().toString( 36 ).substring( 7 )}.jpg`;

  try {
    let absolutePath = await RNFS.copyAssetsFileIOS( assetPath, dest, 0, 0 );
    return "file://" + absolutePath;
  } catch ( err ) {
    console.log( err );
  }
};

export {
  shareToFacebook,
  saveToCameraRoll,
  addWatermark,
  getAssetFileAbsolutePath
};
