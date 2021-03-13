// @flow

import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Animated, Alert } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/uploadStatus";
import logos from "../../assets/logos";
import icons from "../../assets/icons";
import { createFakeUploadData, uploadObservation, markCurrentUploadAsSeen } from "../../utility/uploadHelpers";
import { useInternetStatus } from "../../utility/customHooks";

type Props = {
  uploads: number,
  pendingUploads: Array<Object>,
  numPendingUploads: number
}

const UploadStatus = ( { uploads, pendingUploads, numPendingUploads }: Props ) => {
  // progress bar adapted from: https://blog.logrocket.com/how-to-build-a-progress-bar-with-react-native/
  let animation = useRef( new Animated.Value( 0 ) );
  const successfulUploads = uploads;
  const [progress, setProgress] = useState( successfulUploads > 0 ? 100 : 0 );
  const internet = useInternetStatus( );

  const tick = 100 / numPendingUploads;

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
    } else if ( pendingUploads.length > 0 ) {
      if ( internet === true ) {
        return i18n.t( "post_to_inat_card.uploading_x_observations", { count: numPendingUploads } )
      } else {
        return i18n.t( "post_to_inat_card.x_observations_will_be_uploaded", { count: numPendingUploads } );
      }
    }
  };

  useEffect( ( ) => {
    let isCurrent = true;
    const beginUploads = async ( observation ) => {
      const upload = await uploadObservation( observation );
  
      if ( upload === true ) {
        if ( isCurrent ) {
          setProgress( progress + tick );
          markCurrentUploadAsSeen( observation );
        }
      }
    };
  
    pendingUploads.forEach( observation => beginUploads( observation ) );

    return ( ) => {
      isCurrent = false;
    }
  }, [pendingUploads, progress, tick] );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.center]}>
        <Image source={logos.iNatAppIcon} style={styles.iNatIcon} />
        <View>
          <Text style={styles.headerText}>{i18n.t( "post_to_inat_card.post_to_inaturalist" )}</Text>
          <View style={styles.row}>
            {internet !== null && <Text style={styles.text}>{setUploadText( )}</Text>}
            {progress === 100 && <Image source={icons.checklist} style={styles.checkmark} />}
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
