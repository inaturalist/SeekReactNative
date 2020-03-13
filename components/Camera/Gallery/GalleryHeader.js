// @flow

import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "react-navigation-hooks";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/gallery";
import icons from "../../../assets/icons";
import AlbumPicker from "./AlbumPicker";
import { getAlbumNames } from "../../../utility/photoHelpers";

type Props = {
  updateAlbum: Function
}

const GalleryHeader = ( { updateAlbum }: Props ) => {
  const navigation = useNavigation();
  const [albumNames, setAlbumNames] = useState( [] );

  const fetchAlbumNames = async () => {
    const names = await getAlbumNames();
    setAlbumNames( names );
  };

  useEffect( () => { fetchAlbumNames(); }, [] );

  return (
    <View style={styles.header}>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => navigation.navigate( "Main" )}
        style={styles.backButton}
      >
        <Image source={icons.closeGreen} style={styles.buttonImage} />
      </TouchableOpacity>
      {albumNames.length > 0 && (
        <View style={[styles.center, styles.headerContainer]}>
          <AlbumPicker albumNames={albumNames} updateAlbum={updateAlbum} />
        </View>
      )}
    </View>
  );
};

export default GalleryHeader;
