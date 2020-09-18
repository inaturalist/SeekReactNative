// @flow

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CameraRoll from "@react-native-community/cameraroll";

import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import styles from "../../../styles/camera/gallery";
import icons from "../../../assets/icons";
import AlbumPicker from "./AlbumPicker";
import { navigateToMainStack } from "../../../utility/helpers";

type Props = {
  updateAlbum: Function
}

const GalleryHeader = ( { updateAlbum }: Props ) => {
  const { navigate } = useNavigation();

  const cameraRoll = useMemo( () => { return [{ label: i18n.t( "gallery.camera_roll" ), value: "All" }]; }, [] );
  const [albumNames, setAlbumNames] = useState( cameraRoll );

  const fetchAlbumNames = useCallback( async () => {
    try {
      const names = cameraRoll;
      const albums = await CameraRoll.getAlbums( { assetType: "Photos" } );

      if ( albums && albums.length > 0 ) { // attempt to fix error on android
        albums.forEach( ( { count, title } ) => {
          if ( count > 0 && title !== "Screenshots" ) { // remove screenshots from gallery
            names.push( { label: title, value: title } );
          }
        } );
      }

      if ( names.length > 1 ) {
        setAlbumNames( names );
      }
    } catch ( e ) {
      Alert.alert( `Error fetching photo albums: ${e}` );
    }
  }, [cameraRoll] );

  useEffect( () => {
    if ( albumNames.length === 1 ) {
      fetchAlbumNames();
    }
  }, [fetchAlbumNames, albumNames] );

  const handleBackNav = useCallback( () => navigateToMainStack( navigate, "Home" ), [navigate] );

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
