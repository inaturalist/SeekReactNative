// @flow

import React, { useReducer, useEffect, useCallback, useRef, useContext } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Platform
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Checkbox from "react-native-check-box";
import type { Node } from "react";

import { colors, dimensions } from "../../styles/global";
import { viewStyles, textStyles, imageStyles } from "../../styles/social/social";
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
import { ObservationContext } from "../UserContext";

const SocialScreen = ( ): Node => {
  const { observation } = useContext( ObservationContext );
  const { image } = observation;
  const { uri } = image;
  const cropViewRef = useRef( );
  // const { navigate } = useNavigation( );
  const { params } = useRoute( );
  const { taxon, commonName } = params;
  const { scientificName } = taxon;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
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
      case "DISABLE_BUTTONS":
        return { ...state, disabled: action.disabled };
      default:
        throw new Error();
    }
  }, {
    imageForSharing: uri,
    tab: "square",
    resizedOriginalImage: null,
    // watermarkedOriginalImage: null,
    watermarkedSquareImage: null,
    squareImage: null,
    showWatermark: true,
    height: 0,
    showModal: false,
    absoluteFilePath: null,
    disabled: true
  } );

  const {
    imageForSharing,
    tab,
    resizedOriginalImage,
    // watermarkedOriginalImage,
    watermarkedSquareImage,
    squareImage,
    showWatermark,
    height,
    showModal,
    absoluteFilePath,
    disabled
  } = state;

  const noWatermark = tab === "original";

  const openModal = ( ) => dispatch( { type: "SHOW_MODAL", showModal: true } );
  const closeModal = ( ) => dispatch( { type: "SHOW_MODAL", showModal: false } );

  useEffect( ( ) => {
    Image.getSize( uri, ( w, h ) => {
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

  const createWatermark = useCallback( async ( uriToWatermark: string, type: string ) => {
    if ( noWatermark ) {
      return;
    }
    const preferredCommonName = commonName ? commonName.toLocaleUpperCase( ) : scientificName.toLocaleUpperCase( );
    const watermarkedImage = await addWatermark( uriToWatermark, preferredCommonName, scientificName );

    // if ( type !== "square" ) {
    //   dispatch( { type: "SET_WATERMARKED_ORIGINAL_IMAGE", watermarkedOriginalImage: watermarkedImage } );
    // } else {
      dispatch( { type: "SET_WATERMARKED_SQUARE_IMAGE", watermarkedSquareImage: watermarkedImage } );
    // }
  }, [scientificName, commonName, noWatermark] );

  useEffect( ( ) => {
    // create a resized original image when user first lands on screen
    const resize = async ( ) => {
      const resizedUri = await resizeImage( uri, 2048 );
      dispatch( { type: "SET_RESIZED_IMAGE", resizedOriginalImage: resizedUri } );
      // createWatermark( resizedUri, "original" );
    };

    resize( );
  }, [uri] );

  const showOriginalRatioImage = ( ) => {
    const photo = { uri: resizedOriginalImage };

    return <Image source={photo} style={[imageStyles.image, { height }]} />;
  };

  const saveCrop = ( ) => {
    if ( cropViewRef.current ) {
      cropViewRef.current.saveImage( true, 90 );
    }
  };

  const handleImageCrop = async ( res ) => {
    const filePath = Platform.OS === "android" ? "file:///" + res.uri.split( "file:/" )[1] : res.uri;

    const resize = async ( ) => {
      const resizedUri = await resizeImage( filePath, 2048 );
      dispatch( { type: "SET_SQUARE_IMAGE", squareImage: resizedUri } ); // height and width also available
      createWatermark( resizedUri, "square" );
    };

    resize( );
    closeModal( );
  };

  const setSquarePhoto = ( ) => {
    let photo;

    if ( !watermarkedSquareImage ) {
      photo = { uri };
    } else if ( showWatermark ) {
      photo = { uri: watermarkedSquareImage };
    } else {
      photo = { uri: squareImage };
    }
    return photo;
  };

  const showCropButton = ( ) => {
    if ( watermarkedSquareImage ) {
      return (
        <TouchableOpacity onPress={openModal} style={viewStyles.cropButton}>
          <Image source={icons.cropIcon} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={openModal}
          style={viewStyles.greenButton}
        >
          <Image source={icons.cropIconWhite} />
          <Text style={textStyles.buttonText}>
            {i18n.t( "social.crop_image" ).toLocaleUpperCase( )}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const showSquareImage = ( ) => {
    const photo = setSquarePhoto( );

    return (
      <View style={viewStyles.imageCropContainer}>
        <ImageBackground
          source={photo}
          style={[imageStyles.squareImage, !watermarkedSquareImage && viewStyles.centerCropButton]}
          imageStyle={!watermarkedSquareImage && viewStyles.overlay}
        >
          {showCropButton( )}
        </ImageBackground>
      </View>
    );
  };

  const selectSquareImage = ( showWatermark && watermarkedSquareImage ) ? watermarkedSquareImage : squareImage;
  const selectOriginalImage = resizedOriginalImage;

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

  useEffect( ( ) => {
    const fetchIOSFilePath = async ( ) => {
      const path = await getAssetFileAbsolutePath( uri );
      dispatch( { type: "SET_ABSOLUTE_FILEPATH", absoluteFilePath: path } );
    };

    fetchIOSFilePath( );
  }, [uri] );

  useEffect( ( ) => {
    if ( tab === "square" && ( !watermarkedSquareImage || !squareImage ) ) {
      dispatch( { type: "DISABLE_BUTTONS", disabled: true } );
    } else {
      dispatch( { type: "DISABLE_BUTTONS", disabled: false } );
    }
  }, [watermarkedSquareImage, squareImage, tab] );

  return (
    <ScrollNoHeader footer={false}>
      <View style={viewStyles.whiteContainer}>
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
        <View style={viewStyles.header}>
          <BackArrow green />
          <View style={viewStyles.headerText}>
            <GreenText allowFontScaling={false} smaller text="social.share_observation" />
          </View>
          <View />
        </View>
        <SocialTabs tab={tab} toggleTab={toggleTab} />
        {tab === "square" ? showSquareImage( ) : showOriginalRatioImage( )}
        {!noWatermark && (
          <>
            <Text style={textStyles.optionsText}>{i18n.t( "social.options" ).toLocaleUpperCase( )}</Text>
            <View style={[viewStyles.row, viewStyles.checkboxRow]}>
              <Checkbox
                checkBoxColor={colors.checkboxColor}
                isChecked={showWatermark}
                onClick={toggleWatermark}
                style={viewStyles.checkbox}
              />
              <Text style={textStyles.speciesIdText}>{i18n.t( "social.show_species_id" )}</Text>
            </View>
          </>
        )}
        <SocialButtons image={imageForSharing} tab={tab} disabled={disabled} />
      </View>
    </ScrollNoHeader>
  );
};

export default SocialScreen;
