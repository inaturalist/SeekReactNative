// @flow

import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View
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
  const [albumNames, setAlbumNames] = useState( [] );

  const fetchAlbumNames = async () => {
    const names = [{
      label: i18n.t( "gallery.camera_roll" ),
      value: "All"
    }];

    const albums = await CameraRoll.getAlbums( { assetType: "Photos" } );

    if ( albums && albums.length > 0 ) { // attempt to fix error on android
      albums.forEach( ( { count, title } ) => {
        if ( count > 0 && title !== "Screenshots" ) { // remove screenshots from gallery
          names.push( { label: title, value: title } );
        }
      } );
    }
    setAlbumNames( names );
  };

  useEffect( () => { fetchAlbumNames(); }, [] );

  return (
    <View style={[styles.header, styles.center]}>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => navigateToMainStack( navigate, "Home" )}
        style={styles.backButton}
      >
        <Image source={icons.closeWhite} tintColor={colors.seekForestGreen} style={styles.buttonImage} />
      </TouchableOpacity>
      {albumNames.length > 0 && (
        <View>
          <AlbumPicker albumNames={albumNames} updateAlbum={updateAlbum} />
        </View>
      )}
    </View>
  );
};

export default GalleryHeader;
