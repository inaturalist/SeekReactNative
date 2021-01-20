// @flow

import React, { useReducer, useEffect, useCallback, useRef } from "react";
import { View, Image, Text, ImageBackground, Modal, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Checkbox from "react-native-check-box";

import { colors, dimensions } from "../../styles/global";
import styles from "../../styles/social/social";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import i18n from "../../i18n";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import { addWatermark, getAssetFileAbsolutePath } from "../../utility/socialHelpers";
import { resizeImage } from "../../utility/photoHelpers";
import SocialButtons from "./SocialButtons";
import SocialTabs from "./SocialTabs";
import CropScreen from "./CropScreen";

const SocialScreen = ( ) => {
  const cropViewRef = useRef( );
  // const { navigate } = useNavigation( );
  const { params } = useRoute( );
  const { uri, taxon, commonName } = params;
  const { scientificName } = taxon;

  console.log( uri, "uri in params" );

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
      case "SET_ABSOLUTE_FILEPATH":
        return { ...state, absoluteFilePath: action.absoluteFilePath };
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
    showModal: false,
    absoluteFilePath: null
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
    showModal,
    absoluteFilePath
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

  const saveCrop = ( ) => {
    if ( cropViewRef.current ) {
      cropViewRef.current.saveImage( true, 90 );
    }
  };

  const handleImageCrop = async ( res ) => {
    console.log( res, "res in ios" );
    const correctAndroidFilePath = "file:///" + res.uri.split( "file:/" )[1];

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

  // useEffect( ( ) => {
  //   const cropData = {
  //     offset: {x: height / 2, y: 1000 },
  //     size: {width: 10000, height: 10000 }
  //   };

  //   ImageEditor.cropImage( uri, cropData ).then( url => {
  //     dispatch( { type: "SET_SQUARE_IMAGE", squareImage: url } ); // height and width also available
  //     Image.getSize( url, ( w, h ) => {
  //       createWatermark( url, "square", w );
  //     } );
  //   } );
  // }, [height, uri, createWatermark] );

  useEffect( ( ) => {
    const fetchIOSFilePath = async ( ) => {
      const path = await getAssetFileAbsolutePath( uri );
      dispatch( { type: "SET_ABSOLUTE_FILEPATH", absoluteFilePath: path } );
    };

    fetchIOSFilePath( );
  }, [uri] );

  return (
    <ScrollNoHeader>
      <Modal
        onRequestClose={closeModal}
        visible={showModal}
      >
        <CropScreen
          saveCrop={saveCrop}
          uri={absoluteFilePath}
          cropViewRef={cropViewRef}
          handleImageCrop={handleImageCrop}
          closeModal={closeModal}
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
    </ScrollNoHeader>
  );
};

export default SocialScreen;
