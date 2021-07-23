// @flow

import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/home/uploadStatus";
import logos from "../../assets/logos";
import icons from "../../assets/icons";
import { uploadObservation, markCurrentUploadAsSeen, checkForUploads } from "../../utility/uploadHelpers";
import { useInternetStatus } from "../../utility/customHooks";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { colors } from "../../styles/global";
import { resetRouter } from "../../utility/navigationHelpers";

type Props = {
  successfulUploads: number,
  numPendingUploads: number,
  updateSuccessfulUploads: number => void,
  closeCard: ( ) => void
}

const UploadStatus = ( {
  successfulUploads,
  numPendingUploads,
  updateSuccessfulUploads,
  closeCard
}: Props ): Node => {
  // progress bar adapted from: https://blog.logrocket.com/how-to-build-a-progress-bar-with-react-native/
  const navigation = useNavigation();
  let animation = useRef( new Animated.Value( 0 ) );
  const [progress, setProgress] = useState( 0 );
  const [isUploading, setIsUploading] = useState( false );
  const [error, setError] = useState( null );
  const internet = useInternetStatus( );

  useEffect( ( ) => {
    Animated.timing( animation.current, {
      toValue: progress,
      duration: 100,
      // width is not supported by native driver
      useNativeDriver: false
    } ).start( );
  },[progress] );

  const width = animation.current.interpolate( {
    inputRange: [0, 100],
    // $FlowFixMe
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  } );

  const setUploadText = ( ) => {
    if ( successfulUploads > 0 ) {
      return i18n.t( "post_to_inat_card.x_observations_uploaded", { count: successfulUploads } );
    } else if ( internet === true && !error ) {
      return i18n.t( "post_to_inat_card.uploading_x_observations", { count: numPendingUploads } );
    } else {
      return i18n.t( "post_to_inat_card.x_observations_to_upload", { count: numPendingUploads } );
    }
  };

  const setErrorText = ( ) => {
    if ( error !== null ) {
      const { numOfHours, errorText } = error;

      if ( internet === false || error.type === "timeout" ) {
        return i18n.t( "post_to_inat_card.error_internet" );
      } else if ( error.type === "downtime" ) {
        return i18n.t( "post_to_inat_card.error_downtime", { count: numOfHours } );
      } else if ( error.type === "login" ) {
        return i18n.t( "post_to_inat_card.error_login" );
      } else {
        if ( errorText === "Network request failed" ) {
          // this covers the case where a user loses internet after landing on home screen
          // when uploads have already started
          return i18n.t( "post_to_inat_card.error_internet" );
        } else {
          return i18n.t( "post_to_inat_card.error_unknown", { errorText } );
        }
      }
    }
  };

  useEffect( ( ) => {
    let isCurrent = true;
    let completedProgress = 0;
    let currentUploads = 0;
    const tick = 100 / numPendingUploads;

    const beginUpload = async ( observation ) => {
      const upload = await uploadObservation( observation );

      if ( upload === true ) {
        completedProgress += tick;
        currentUploads += 1;

        setProgress( completedProgress );
        markCurrentUploadAsSeen( observation );

        if ( currentUploads === numPendingUploads ) {
          updateSuccessfulUploads( currentUploads );
        }
      } else if ( typeof upload === "object" && upload.error ) {
        // $FlowFixMe
        setError( upload.error );
      }
    };

    const checkUploads = async ( ) => {
      const allUploads = await checkForUploads( );
      const pendingUploads = allUploads.filter( observation => observation.photo.uploadSucceeded === false
        && observation.photo.uploadFailed === false );
      pendingUploads.forEach( observation => beginUpload( observation ) );
    };

    if ( numPendingUploads > 0 && !isUploading ) {
      // only check uploads once
      if ( isCurrent ) {
        setIsUploading( true );
        checkUploads( );
      }
    }

    return ( ) => {
      isCurrent = false;
    };
  }, [numPendingUploads, isUploading, updateSuccessfulUploads] );

  const retryUploads = ( ) => resetRouter( navigation );

  return (
    <View style={viewStyles.container}>
      {successfulUploads > 0 && (
        <Pressable
          onPress={closeCard}
          style={viewStyles.closeButton}
        >
          <Image
            style={imageStyles.closeIcon}
            source={icons.closeWhite}
          />
        </Pressable>
      )}
      <View style={viewStyles.containerPadding}>
        <View style={[viewStyles.row, viewStyles.center]}>
          <Image source={logos.iNatAppIcon} style={viewStyles.iNatIcon} />
          <View>
            <Text style={textStyles.headerText}>{i18n.t( "post_to_inat_card.post_to_inaturalist" )}</Text>
            <View style={viewStyles.row}>
              {internet !== null && <Text style={textStyles.text}>{setUploadText( )}</Text>}
              {successfulUploads > 0 && <Image source={icons.checklist} style={imageStyles.checkmark} />}
            </View>
          </View>
        </View>
        {error && (
          <View style={viewStyles.greenButton}>
            <GreenButton
              color={colors.seekiNatGreen}
              handlePress={retryUploads}
              text="post_to_inat_card.upload_now"
            />
            <Text style={textStyles.errorText}>{setErrorText( )}</Text>
          </View>
        )}
        {( internet === true && !error ) && (
          <View style={viewStyles.progressBar}>
            {successfulUploads > 0
              ? <View style={[viewStyles.absoluteFill, viewStyles.fullWidth]} />
              : <Animated.View style={[viewStyles.absoluteFill, { width }]} />}
          </View>
        )}
      </View>
    </View>
  );
};

export default UploadStatus;
