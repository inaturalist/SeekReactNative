
import React from "react";
import { Platform } from "react-native";
import Share from "react-native-share";
import Marker from "react-native-image-marker";

import GreenButton from "../UIComponents/Buttons/GreenButton";
import { resizeImage } from "../../utility/photoHelpers";
import logos from "../../assets/logos";

type Props = {
  image: Object,
  gradientLight: string
}

const SocialSharing = ( { image, gradientLight }: Props ) => {

  const share = url => {
    const shareOptions = {
      title: "I found a new species!", // for social, doesn't seem to work on FB
      message: "Check out this species I found on Seek by iNaturalist",
      subject: "Check out this species I found on Seek by iNaturalist", // for email
      type: "image/jpeg",
      // excludedActivityTypes: [
      //   "addToReadingList",
      //   "airDrop",
      //   "assignToContact",
      //   "copyToPasteBoard",
      //   "mail",
      //   "message",
      //   "openInIBooks", // iOS 9 or later,
      //   "postToFacebook",
      //   "postToFlickr",
      //   "postToTencentWeibo",
      //   "postToTwitter",
      //   "postToVimeo",
      //   "postToWeibo",
      //   "print",
      //   "saveToCameraRoll",
      //   "markupAsPDF" // iOS 11 or later
      // ],
      // showAppsToView: false,
      url,
      social: Share.Social.FACEBOOK
    };

    Share.shareSingle( shareOptions )
    .then( ( res ) => { console.log( res ); } )
    .catch( ( err ) => { err && console.log( err ); } );

    // Share.open( shareOptions ).then( ( res ) => {
    //     console.log( res );
    //   } ).catch( ( err ) => {
    //     err && console.log( err );
    //   } );
  };



  const watermarkForSharing = ( userImage ) => {
    const iconUri = logos.seek;

    console.log( iconUri, "icon" );

    Marker.markImage( {
      src: userImage,
      markerSrc: iconUri, // icon uri
      X: 100, // left
      Y: 150, // top
      scale: 1, // scale of bg
      markerScale: 0.5, // scale of icon
      quality: 100, // quality of image
      saveFormat: "jpeg"
    } ).then( ( path ) => {
      console.log( path, "path from watermark" );
      share( Platform.OS === "android" ? "file://" + path : path );
    } ).catch( ( err ) => {
        console.log( err, "err with watermark" );
    } );
  };

    const resizeForSharing = () => {
      resizeImage( image.uri, 1200 ).then( ( userImage ) => {
        watermarkForSharing( userImage );
      } ).catch( () => console.log( "couldn't resize image for uploading" ) );
    };

  return (
    <GreenButton
      color={gradientLight}
      handlePress={resizeForSharing}
      text="results.social"
    />
  );
};

export default SocialSharing;
