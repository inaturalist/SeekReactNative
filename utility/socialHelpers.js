import CameraRoll from "@react-native-community/cameraroll";
import Share from "react-native-share";
import { Platform, Alert } from "react-native";
import Marker from "react-native-image-marker";
import RNFS from "react-native-fs";
import ImageEditor from "@react-native-community/image-editor";

import i18n from "../i18n";
import backgrounds from "../assets/backgrounds";
import { colors, dimensions, fonts } from "../styles/global";

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

const addTextToWatermark = async( userImage, text, position, type ) => {
  const yPosition = ( ) => {
    if ( type === "original" ) {
      return position === 1 ? 1853 : 1933;
    } else {
      return position === 1 ? ( 959 + 60 ) : ( 959 + 140 );
    }
  };

  const imageOptions = {
    src: userImage,
    text,
    X: 290, // left
    Y: yPosition( ), // top
    color: colors.white,
    fontName: position === 1 ? fonts.semibold : fonts.bookItalic,
    fontSize: 62,
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

const addWatermark = async( userImage, commonName, name, type ) => {
  // resized photo to 2048 * 2048 to be able to align watermark
  const originalPath = Platform.OS === "android" ? await getAndroidCameraRollPath( userImage ) : userImage;

  const imageOptions = {
    src: originalPath,
    markerSrc: backgrounds.sharing,
    X: 0, // left
    Y: type === "square" ? 959 : 1793, // 255 from bottom on original
    scale: 1, // scale of bg
    markerScale: 1.39, // scale of icon
    quality: 100, // quality of image
    saveFormat: "jpeg"
  };

  try {
    const path = await Marker.markImage( imageOptions );
    const watermarkedImageUri = Platform.OS === "android" ? "file://" + path : path;
    const uriWithCommonName = await addTextToWatermark( watermarkedImageUri, commonName, 1, type );
    const uriWithBothNames = await addTextToWatermark( uriWithCommonName, name, 2, type );
    return uriWithBothNames;
  } catch ( e ) {
    return e;
  }
};

export {
  shareToFacebook,
  saveToCameraRoll,
  addWatermark
};
