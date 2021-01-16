// @flow

import React, { useReducer, useEffect, useCallback, useRef } from "react";
import { View, Image, Text, ImageBackground, Modal, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { CropView } from "react-native-image-crop-tools";
import Checkbox from "react-native-check-box";

import { colors, dimensions } from "../../styles/global";
import styles from "../../styles/social/social";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import i18n from "../../i18n";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import { addWatermark } from "../../utility/socialHelpers";
import { resizeImage } from "../../utility/photoHelpers";
import SocialButtons from "./SocialButtons";
import SocialTabs from "./SocialTabs";
import CropScreen from "./CropScreen";

const SocialScreen = ( ) => {
  const cropViewRef = useRef( );

  // this one is needed to show the initial square image before a user taps the crop screen
  const hiddenCropViewRef = useRef( );
  // const { navigate } = useNavigation( );
  const { params } = useRoute( );
  const { uri, taxon, commonName } = params;
  const { scientificName } = taxon;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    console.log( action.type, "action" );
    switch ( action.type ) {
      case "SET_HEIGHT":
        return { ...state, height: action.height };
      case "SET_TAB":
        return { ...state, tab: action.tab };
      case "TOGGLE_WATERMARK":
        return { ...state, showWatermark: action.showWatermark };
      case "SET_RESIZED_IMAGE":
        return { ...state, resizedOriginalImage: action.resizedOriginalImage };
      case "SET_WATERMARKED_ORIGINAL_IMAGE":
        return { ...state, watermarkedOriginalImage: action.watermarkedOriginalImage };
      case "SET_WATERMARKED_SQUARE_IMAGE":
        return { ...state, watermarkedSquareImage: action.watermarkedSquareImage };
      case "SET_IMAGE_FOR_SHARING":
        return { ...state, imageForSharing: action.imageForSharing };
      case "SET_SQUARE_IMAGE":
        return { ...state, squareImage: action.squareImage };
      case "SHOW_MODAL":
        return { ...state, showModal: action.showModal };
      default:
        throw new Error();
    }
  }, {
    imageForSharing: uri,
    tab: "square",
    resizedOriginalImage: null,
    watermarkedOriginalImage: null,
    watermarkedSquareImage: null,
    squareImage: null,
    showWatermark: true,
    height: 0,
    showModal: false
  } );

  const {
    imageForSharing,
    tab,
    resizedOriginalImage,
    watermarkedOriginalImage,
    watermarkedSquareImage,
    squareImage,
    showWatermark,
    height,
    showModal
  } = state;

  const openModal = ( ) => dispatch( { type: "SHOW_MODAL", showModal: true } );
  const closeModal = ( ) => dispatch( { type: "SHOW_MODAL", showModal: false } );

  useEffect( ( ) => {
    Image.getSize( uri, ( w, h ) => {
      // this is the new height to display for original ratio photos
      // taking into account the aspect ratio and the screen width
      // it prevents react native from showing top and bottom padding when resizeMode = contain
      dispatch( { type: "SET_HEIGHT", height: h / w * dimensions.width } );
    } );
  } , [uri] );

  const toggleTab = ( ) => {
    if ( tab === "square" ) {
      dispatch( { type: "SET_TAB", tab: "original" } );
    } else {
      dispatch( { type: "SET_TAB", tab: "square" } );
    }
  };

  const toggleWatermark = ( ) => dispatch( { type: "TOGGLE_WATERMARK", showWatermark: !showWatermark } );

  const createWatermark = useCallback( async ( uriToWatermark, type, width ) => {
    const preferredCommonName = commonName ? commonName.toLocaleUpperCase( ) : scientificName.toLocaleUpperCase( );
    const watermarkedImage = await addWatermark( uriToWatermark, preferredCommonName, scientificName, type, width );

    if ( type !== "square" ) {
      dispatch( { type: "SET_WATERMARKED_ORIGINAL_IMAGE", watermarkedOriginalImage: watermarkedImage } );
    } else {
      dispatch( { type: "SET_WATERMARKED_SQUARE_IMAGE", watermarkedSquareImage: watermarkedImage } );
    }
  }, [scientificName, commonName] );

  useEffect( ( ) => {
    // create a resized original image when user first lands on screen
    const resize = async ( ) => {
      const resizedUri = await resizeImage( uri, 2048 );
      dispatch( { type: "SET_RESIZED_IMAGE", resizedOriginalImage: resizedUri } );
      createWatermark( resizedUri, "original" );
    };

    resize( );
  }, [createWatermark, uri] );

  const showOriginalRatioImage = ( ) => {
    let photo = { uri: resizedOriginalImage };

    if ( showWatermark ) {
      photo = { uri: watermarkedOriginalImage };
    }
    return <Image source={photo} style={[styles.image, { height }]} />;
  };

  const saveCrop = async ( ) => {
    if ( cropViewRef.current ) {
      cropViewRef.current.saveImage( true, 90 );
    }
  };

  // const saveInitialCrop = async ( ) => {
  //   if ( hiddenCropViewRef.current ) {
  //     console.log( "creating initial crop" );
  //     hiddenCropViewRef.current.saveImage( true, 90 );
  //   }
  // };

  // useEffect( ( ) => {
  //   saveInitialCrop( );
  // }, [] );

  const handleImageCrop = async ( res ) => {
    console.log( res, "handling crop" );
    const correctAndroidFilePath = "file:///" + res.uri.split( "file:/" )[1];

    // const resize = async ( ) => {
    //   const resizedUri = await resizeImage( correctAndroidFilePath, 2048 );

    //   console.log( resizedUri, "resized" );
    //   dispatch( { type: "SET_SQUARE_IMAGE", squareImage: resizedUri } );
    //   createWatermark( resizedUri, "square" );
    // };

    // resize( );
    dispatch( { type: "SET_SQUARE_IMAGE", squareImage: correctAndroidFilePath } ); // height and width also available
    createWatermark( correctAndroidFilePath, "square", res.width );
    closeModal( );
  };

  const showSquareImage = ( ) => {
    let photo = { uri: squareImage };

    if ( showWatermark ) {
      photo = { uri: watermarkedSquareImage };
    }

    return (
      <View style={styles.imageCropContainer}>
        <ImageBackground source={photo} style={styles.squareImage}>
          <TouchableOpacity onPress={openModal} style={styles.cropButton}>
            <Image source={icons.cropIcon} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };

  // console.log( imageForSharing, squareImage, watermarkedSquareImage, "state: social screen" );

  const selectSquareImage = ( showWatermark && watermarkedSquareImage ) ? watermarkedSquareImage : squareImage;
  const selectOriginalImage = showWatermark ? watermarkedOriginalImage : resizedOriginalImage;

  useEffect( ( ) => {
    let sharing;

    if ( tab === "square" ) {
      sharing = selectSquareImage;
    } else {
      sharing = selectOriginalImage;
    }

    if ( imageForSharing === sharing ) {
      return;
    }

    dispatch( { type: "SET_IMAGE_FOR_SHARING", imageForSharing: sharing } );
  }, [tab, selectOriginalImage, selectSquareImage, imageForSharing] );

  const aspectRatio = { width: 16, height: 16 };

  return (
    <ScrollNoHeader>
      <Modal
        onRequestClose={closeModal}
        visible={showModal}
      >
        <CropScreen
          saveCrop={saveCrop}
          uri={uri}
          cropViewRef={cropViewRef}
          handleImageCrop={handleImageCrop}
        />
      </Modal>
      <View style={styles.header}>
        <BackArrow green />
        <View style={styles.headerText}>
          <GreenText allowFontScaling={false} smaller text="social.share_observation" />
        </View>
        <View />
      </View>
      <SocialTabs tab={tab} toggleTab={toggleTab} />
      {tab === "square" ? showSquareImage( ) : showOriginalRatioImage( )}
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
      {/* <View style={styles.hidden}>
        <CropView
          sourceUrl={uri}
          style={styles.hiddenCropView}
          ref={hiddenCropViewRef}
          onImageCrop={handleImageCrop}
          keepAspectRatio
          aspectRatio={aspectRatio}
        />
      </View> */}
    </ScrollNoHeader>
  );
};

export default SocialScreen;
