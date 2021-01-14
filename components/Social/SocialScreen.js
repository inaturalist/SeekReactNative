// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import { View, Image, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Checkbox from "react-native-check-box";

import { colors, dimensions } from "../../styles/global";
import styles from "../../styles/social/social";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import i18n from "../../i18n";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import { addWatermark } from "../../utility/socialHelpers";
import { resizeImage } from "../../utility/photoHelpers";
// import SquareImageCropper from "./SquareImageCropper";
// import SquareImageCropper from "./ExampleCropper";
import SocialButtons from "./SocialButtons";
// import SocialTabs from "./SocialTabs";

const SocialScreen = ( ) => {
  const { params } = useRoute( );
  const { uri, taxon, commonName } = params;
  const { scientificName } = taxon;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SET_HEIGHT":
        return { ...state, height: action.height };
      case "TOGGLE_WATERMARK":
        return { ...state, showWatermark: action.showWatermark };
      case "SET_RESIZED_IMAGE":
        return { ...state, resizedOriginalImage: action.resizedOriginalImage };
      case "SET_WATERMARKED_ORIGINAL_IMAGE":
        return { ...state, watermarkedOriginalImage: action.watermarkedOriginalImage };
      case "SET_IMAGE_FOR_SHARING":
        return { ...state, imageForSharing: action.imageForSharing };
      default:
        throw new Error();
    }
  }, {
    imageForSharing: uri,
    tab: "original", // vs square
    resizedOriginalImage: null,
    watermarkedOriginalImage: null,
    showWatermark: true,
    height: 0
  } );

  const {
    imageForSharing,
    tab,
    resizedOriginalImage,
    watermarkedOriginalImage,
    showWatermark,
    height
  } = state;

  // const [squareImageForSocial, setSquareImageForSocial] = useState( null );
  // const [croppedImageURI, setCroppedImageURI] = useState( null );

  useEffect( ( ) => {
    Image.getSize( uri, ( w, h ) => {
      // this is the new height to display for original ratio photos
      // taking into account the aspect ratio and the screen width
      // it prevents react native from showing top and bottom padding when resizeMode = contain
      dispatch( { type: "SET_HEIGHT", height: h / w * dimensions.width } );
    } );
  } , [uri] );

  // Image.getSize( uri, ( w, h ) => {
  //   console.log( w, h, "square image for social" );
  // } );

  // const toggleTab = ( ) => {
  //   if ( tab === "square" ) {
  //     setTab( "original" );
  //   } else {
  //     setTab( "square" );
  //   }
  // };

  const toggleWatermark = ( ) => dispatch( { type: "TOGGLE_WATERMARK", showWatermark: !showWatermark } );

  const createWatermark = useCallback( async ( uriToWatermark ) => {
    const preferredCommonName = commonName ? commonName.toLocaleUpperCase( ) : scientificName.toLocaleUpperCase( );
    const watermarkedImage = await addWatermark( uriToWatermark, preferredCommonName, scientificName );
    // if ( tab === "original" ) {
      dispatch( { type: "SET_WATERMARKED_ORIGINAL_IMAGE", watermarkedOriginalImage: watermarkedImage } );
    // } else {
    //   setSquareImageForSocial( watermarkedImage );
    // }
  }, [scientificName, commonName] );

  // const createSquareImage = croppedUri => setCroppedImageURI( croppedUri );

  useEffect( ( ) => {
    // create a resized original image when user first lands on screen
    const resize = async ( ) => {
      const resizedUri = await resizeImage( uri, 2048 );
      dispatch( { type: "SET_RESIZED_IMAGE", resizedOriginalImage: resizedUri } );
      createWatermark( resizedUri );
    };

    resize( );
  }, [createWatermark, uri] );

  // useEffect( ( ) => {
  //   if ( showWatermark && croppedImageURI ) {
  //     createWatermark( croppedImageURI );
  //   }
  // }, [croppedImageURI, showWatermark, createWatermark] );

  const showOriginalRatioImage = ( ) => {
    let photo = { uri: resizedOriginalImage };

    if ( showWatermark ) {
      photo = { uri: watermarkedOriginalImage };
    }
    return <Image source={photo} style={[styles.image, { height }]} />;
  };

  // const showSquareImage = ( ) => {
  //   if ( squareImageForSocial && showWatermark ) {
  //     return (
  //       <Image
  //         source={{ uri: squareImageForSocial }}
  //         style={[styles.image, { height: dimensions.width }]}
  //       />
  //     );
  //   }

  //   return (
  //     <SquareImageCropper
  //       uri={uri}
  //       showWatermark={showWatermark}
  //       createSquareImage={createSquareImage}
  //     />
  //   );
  // };

  useEffect( ( ) => {
    if ( tab === "original" && showWatermark ) {
      dispatch( { type: "SET_IMAGE_FOR_SHARING", imageForSharing: watermarkedOriginalImage } );
    } else {
      dispatch( { type: "SET_IMAGE_FOR_SHARING", imageForSharing: resizedOriginalImage } );
    }
  }, [tab, showWatermark, resizedOriginalImage, watermarkedOriginalImage] );

  return (
    <ScrollNoHeader>
      <View style={styles.header}>
        <BackArrow green />
        <View style={styles.headerText}>
          <GreenText allowFontScaling={false} smaller text="social.share_observation" />
        </View>
        <View />
      </View>
      {/* <SocialTabs tab={tab} toggleTab={toggleTab} /> */}
      {showOriginalRatioImage( )}
      {/* {tab === "square" ? showSquareImage( ) : showOriginalRatioImage( )} */}
      <Text style={styles.optionsText}>{i18n.t( "social.options" ).toLocaleUpperCase( )}</Text>
      <View style={[styles.row, styles.checkboxRow]}>
        <Checkbox
          checkBoxColor={colors.checkboxColor}
          isChecked={showWatermark}
          onClick={toggleWatermark}
          style={styles.checkbox}
        />
        <Text style={styles.speciesIdText}>{i18n.t( "social.show_species_id" )}</Text>
      </View>
      <SocialButtons image={imageForSharing} />
    </ScrollNoHeader>
  );
};

export default SocialScreen;
