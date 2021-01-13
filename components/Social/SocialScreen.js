// @flow

import React, { useState, useEffect, useCallback } from "react";
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
  // const commonName = useCommonName( taxon.taxaId || null );
  const { scientificName } = taxon;

  const [tab, setTab] = useState( "original" );
  // const [tab, setTab] = useState( "square" );
  const [imageForSocial, setImageForSocial] = useState( null );
  // const [squareImageForSocial, setSquareImageForSocial] = useState( null );
  const [showWatermark, setShowWatermark] = useState( true );
  const [height, setHeight] = useState( 0 );
  // const [croppedImageURI, setCroppedImageURI] = useState( null );

  Image.getSize( uri, ( w, h ) => {
    // this is the new height to display for original ratio photos
    // taking into account the aspect ratio and the screen width
    // it prevents react native from showing top and bottom padding when resizeMode = contain
    setHeight( h / w * dimensions.width );
  } );

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

  const toggleWatermark = ( ) => setShowWatermark( !showWatermark );

  const createWatermark = useCallback( async ( uriToWatermark ) => {
    const preferredCommonName = commonName ? commonName.toLocaleUpperCase( ) : scientificName.toLocaleUpperCase( );
    const watermarkedImage = await addWatermark( uriToWatermark, preferredCommonName, scientificName );
    // if ( tab === "original" ) {
      setImageForSocial( watermarkedImage );
    // } else {
    //   setSquareImageForSocial( watermarkedImage );
    // }
  }, [scientificName, commonName] );

  // const createSquareImage = croppedUri => setCroppedImageURI( croppedUri );

  useEffect( ( ) => {
    // create a resized original image when user first lands on screen
    const resize = async ( ) => {
      const resizedUri = await resizeImage( uri, 2048 );
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
    if ( showWatermark ) {
      return <Image source={{ uri: imageForSocial }} style={[styles.image, { height }]} />;
    } else {
      return <Image source={{ uri }} style={[styles.image, { height }]} />;
    }
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

  const showSocialButtons = ( ) => {
    let image;

    if ( tab === "original" && showWatermark ) {
      image = imageForSocial;
    } else {
      image = uri;
    }

    // if ( tab === "square" && squareImageForSocial ) {
    //   image = squareImageForSocial;
    // }
    return <SocialButtons image={image} />;
  };

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
      <View style={styles.textContainer}>
        <Text style={styles.optionsText}>{i18n.t( "social.options" ).toLocaleUpperCase( )}</Text>
        <View style={styles.row}>
          <Checkbox
            checkBoxColor={colors.checkboxColor}
            isChecked={showWatermark}
            onClick={toggleWatermark}
          />
          <Text style={styles.speciesIdText}>{i18n.t( "social.show_species_id" )}</Text>
        </View>
      </View>
      {showSocialButtons( )}
    </ScrollNoHeader>
  );
};

export default SocialScreen;
