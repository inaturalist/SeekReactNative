// @flow

import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, Image, Animated } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/uploadStatus";
import logos from "../../assets/logos";
import icons from "../../assets/icons";
import { uploadObservation, markCurrentUploadAsSeen, checkForUploads } from "../../utility/uploadHelpers";
import { useInternetStatus } from "../../utility/customHooks";

type Props = {
  successfulUploads: number,
  numPendingUploads: number
}

const UploadStatus = ( { successfulUploads, numPendingUploads }: Props ) => {
  // progress bar adapted from: https://blog.logrocket.com/how-to-build-a-progress-bar-with-react-native/
  let animation = useRef( new Animated.Value( 0 ) );
  const [progress, setProgress] = useState( 0 );
  const [isUploading, setIsUploading] = useState( false );
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
    } else if ( internet === true ) {
      return i18n.t( "post_to_inat_card.uploading_x_observations", { count: numPendingUploads } );
    } else {
      return i18n.t( "post_to_inat_card.x_observations_will_be_uploaded", { count: numPendingUploads } );
    }
  };

  useEffect( ( ) => {
    let isCurrent = true;
    let completedProgress = 0;
    const tick = 100 / numPendingUploads;

    const beginUpload = async ( observation ) => {
      const upload = await uploadObservation( observation );

      if ( upload === true ) {
        completedProgress += tick;
        setProgress( completedProgress );
        markCurrentUploadAsSeen( observation );
      }
    };

    const checkUploads = async ( ) => {
      const allUploads = await checkForUploads( );
      const pendingUploads = allUploads.filter( observation => observation.photo.uploadSucceeded === false );
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
  }, [numPendingUploads, isUploading] );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.center]}>
        <Image source={logos.iNatAppIcon} style={styles.iNatIcon} />
        <View>
          <Text style={styles.headerText}>{i18n.t( "post_to_inat_card.post_to_inaturalist" )}</Text>
          <View style={styles.row}>
            {internet !== null && <Text style={styles.text}>{setUploadText( )}</Text>}
            {successfulUploads > 0 && <Image source={icons.checklist} style={styles.checkmark} />}
          </View>
        </View>
      </View>
      {internet === true && (
        <View style={styles.progressBar}>
          {successfulUploads > 0
            ? <View style={[styles.absoluteFill, styles.fullWidth]} />
            : <Animated.View style={[styles.absoluteFill, { width }]} />}
        </View>
      )}
    </View>
  );
};

export default UploadStatus;
