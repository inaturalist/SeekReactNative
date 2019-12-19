import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import GalleryManager from "react-native-gallery-manager";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/camera/gallery";

type Props = {
  +updateAlbum: Function
}

const getAlbumNames = ( setAlbumNames ) => {
  const albumNames = [{
    label: i18n.t( "gallery.camera_roll" ),
    value: "All"
  }];

  GalleryManager.getAlbums().then( ( results ) => {
    const { albums } = results;
    if ( albums && albums.length > 0 ) { // attempt to fix error on android
      albums.forEach( ( album ) => {
        const { assetCount, title } = album;

        if ( assetCount > 0 && title !== "Screenshots" ) { // remove screenshots from gallery
          albumNames.push( {
            label: title,
            value: title
          } );
        }
      } );
    }

    setAlbumNames( albumNames );
  } ).catch( ( e ) => {
    console.log( e, "e" );
    setAlbumNames( albumNames );
  } );
};

const AlbumPicker = ( { updateAlbum }: Props ) => {
  const [album, setAlbum] = useState( i18n.t( "gallery.camera_roll" ).toLocaleUpperCase() );
  const [albumNames, setAlbumNames] = useState( [] );

  useEffect( () => {
    getAlbumNames( setAlbumNames );
  }, [] );

  return (
    <RNPickerSelect
      hideIcon
      Icon={() => <Image source={icons.dropdownOpen} style={styles.margin} />}
      items={albumNames}
      onValueChange={( value ) => {
        setAlbum( value );
        updateAlbum( value );
      }}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
      value={album}
    >
      <View style={styles.row}>
        <Text style={styles.headerText}>
          {album === "All"
            ? i18n.t( "gallery.camera_roll" ).toLocaleUpperCase()
            : album.toLocaleUpperCase()}
        </Text>
        <Image source={icons.dropdownOpen} style={styles.margin} />
      </View>
    </RNPickerSelect>
  );
};

export default AlbumPicker;
