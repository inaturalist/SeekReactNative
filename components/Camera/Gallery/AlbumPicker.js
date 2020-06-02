import React, { useState } from "react";
import {
  Text,
  Image,
  View
} from "react-native";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/camera/gallery";
import Picker from "../../UIComponents/Picker";

type Props = {
  +updateAlbum: Function,
  +albumNames: Array
}

const AlbumPicker = ( { updateAlbum, albumNames }: Props ) => {
  const [album, setAlbum] = useState( albumNames[0].label );

  const handleValueChange = ( newAlbum ) => {
    setAlbum( newAlbum );
    updateAlbum( newAlbum !== "All" ? newAlbum : null );
  };

  return (
    <Picker
      handleValueChange={handleValueChange}
      selectedValue={album}
      icon={<Image source={icons.dropdownOpen} style={styles.margin} />}
      itemList={albumNames}
    >
      <View style={[styles.row, styles.center]}>
        <Text style={styles.headerText}>
          {album === "All"
            ? i18n.t( "gallery.camera_roll" ).toLocaleUpperCase()
            : album.toLocaleUpperCase()}
        </Text>
        <Image source={icons.dropdownOpen} style={styles.margin} />
      </View>
    </Picker>
  );
};

export default AlbumPicker;
