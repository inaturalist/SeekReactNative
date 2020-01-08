import React, { useState } from "react";
import {
  Text,
  Image,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/camera/gallery";

type Props = {
  +updateAlbum: Function,
  +albumNames: Array
}

const AlbumPicker = ( { updateAlbum, albumNames }: Props ) => {
  const [album, setAlbum] = useState( i18n.t( "gallery.camera_roll" ).toLocaleUpperCase() );

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
