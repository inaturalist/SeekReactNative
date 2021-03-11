// @flow

import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/uploadStatus";
import logos from "../../assets/logos";
import { useInterval, useInternetStatus } from "../../utility/customHooks";
import icons from "../../assets/icons";

type Props = {
  uploads: number
}

const UploadStatus = ( { uploads }: Props ) => {
  // progress bar adapted from: https://blog.logrocket.com/how-to-build-a-progress-bar-with-react-native/
  let animation = useRef( new Animated.Value( 0 ) );
  const successfulUploads = uploads;
  const [progress, setProgress] = useState( successfulUploads > 0 ? 100 : 0 );
  const internet = useInternetStatus( );

  useInterval( ( ) => {
    if ( progress < 100 ) {
      setProgress( progress + 5 );
    }
  }, 1000 );

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
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  } );

  const setUploadText = ( ) => {
    if ( !internet ) {
      return i18n.t( "post_to_inat_card.x_observations_will_be_uploaded", { count: 0 } );
    }
    // if uploading, return i18n.t( "post_to_inat_card.uploading_x_observations", { count: 0 } )
    return i18n.t( "post_to_inat_card.x_observations_uploaded", { count: successfulUploads } );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.center]}>
        <Image source={logos.iNatAppIcon} style={styles.iNatIcon} />
        <View>
          <Text style={styles.headerText}>{i18n.t( "post_to_inat_card.post_to_inaturalist" )}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>{setUploadText( )}</Text>
            <Image source={icons.checklist} style={styles.checkmark} />
          </View>
        </View>
      </View>
      <View style={styles.progressBar}>
        {successfulUploads > 0
          ? <View style={[styles.absoluteFill, styles.fullWidth]} />
          : <Animated.View style={[styles.absoluteFill, { width }]} />}
      </View>
    </View>
  );
};

export default UploadStatus;
