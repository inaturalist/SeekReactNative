// @flow

import React, { useEffect } from "react";
import { View, Text } from "react-native";

import i18n from "../../i18n";

const UploadStatus = ( ) => {

  useEffect( ( ) => {
   // do stuff
  }, [] );

  const setUploadText = ( ) => {
    // if uploading, return i18n.t( "post_to_inat_card.uploading_x_observations", { count: 0 } )
    // else if no internet, return i18n.t( "post_to_inat_card.x_observations_will_be_uploaded", { count: 0 } )
    return i18n.t( "post_to_inat_card.x_observations_uploaded", { count: 0 } );
  };

  return (
    <>
      {/* <Image source={inatIcon} /> */}
      <View>
        <Text>{i18n.t( "post_to_inat_card.post_to_inaturalist" )}</Text>
        <Text>{setUploadText( )}</Text>
      </View>
      {/* https://blog.logrocket.com/how-to-build-a-progress-bar-with-react-native/ */}
      {/* <LoadingBar /> */}
    </>
  );
};

export default UploadStatus;
