// @flow

import React, { useState, useEffect, useCallback } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import styles from "../../../styles/camera/gallery";
import icons from "../../../assets/icons";
import AlbumPicker from "./AlbumPicker";
import { navigateToMainStack } from "../../../utility/helpers";
import { fetchAlbums } from "../../../utility/cameraRollHelpers";

type Props = {
  updateAlbum: ( ?string ) => mixed
}

const cameraRoll = [{
  label: i18n.t( "gallery.camera_roll" ).toLocaleUpperCase( ),
  value: "All"
}];

const GalleryHeader = ( { updateAlbum }: Props ) => {
  const { navigate } = useNavigation( );

  const [albumNames, setAlbumNames] = useState( cameraRoll );

  const fetch = async ( ) => setAlbumNames( await fetchAlbums( cameraRoll ) );

  useEffect( ( ) => {
    if ( albumNames.length === 1 ) {
      fetch( );
    }
  }, [albumNames] );

  const handleBackNav = useCallback( ( ) => navigateToMainStack( navigate, "Home" ), [navigate] );

  return (
    <View style={[styles.header, styles.center]}>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={handleBackNav}
        style={styles.backButton}
      >
        {/* $FlowFixMe */}
        <Image
          source={icons.closeWhite}
          tintColor={colors.seekForestGreen}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      <AlbumPicker albumNames={albumNames} updateAlbum={updateAlbum} />
    </View>
  );
};

export default GalleryHeader;
