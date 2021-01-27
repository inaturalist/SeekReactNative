// @flow

import React, { useCallback } from "react";
import { Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import icons from "../../../assets/icons";
import styles from "../../../styles/camera/galleryHeader";
type Props = {
  +updateAlbum: Function,
  +albumNames: Array
}

const placeholder = {};
const pickerStyles = { ...styles };

const AlbumPicker = ( { updateAlbum, albumNames }: Props ) => {
  const handleValueChange = useCallback( ( newAlbum ) => {
    updateAlbum( newAlbum !== "All" ? newAlbum : null );
  }, [updateAlbum] );

  const showIcon = useCallback( () => {
    if ( albumNames.length > 1 ) {
      return <Image testID="carot" source={icons.dropdownOpen} style={styles.carot} />;
    }
    return <></>;
  }, [albumNames] );

  return (
    <RNPickerSelect
      hideIcon
      Icon={showIcon}
      items={albumNames}
      onValueChange={handleValueChange}
      placeholder={placeholder}
      useNativeAndroidPickerStyle={false}
      disabled={albumNames.length <= 1}
      style={pickerStyles}
    />
  );
};

export default AlbumPicker;
