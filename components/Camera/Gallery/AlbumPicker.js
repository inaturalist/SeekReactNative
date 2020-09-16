import React, { useState, useMemo, useCallback } from "react";
import { Text, Image, View } from "react-native";

import icons from "../../../assets/icons";
import styles from "../../../styles/camera/gallery";
import Picker from "../../UIComponents/Picker";
type Props = {
  +updateAlbum: Function,
  +albumNames: Array
}

const AlbumPicker = ( { updateAlbum, albumNames }: Props ) => {
  const cameraRoll = albumNames[0].label;
  const [album, setAlbum] = useState( cameraRoll );

  const handleValueChange = useCallback( ( newAlbum ) => {
    setAlbum( newAlbum );
    updateAlbum( newAlbum !== "All" ? newAlbum : null );
  }, [updateAlbum] );

  const renderAlbumTitle = useMemo( () => (
    <Text style={styles.headerText} testID="cameraRollText">
      {album.toLocaleUpperCase()}
    </Text>
  ), [album] );

  return (
    <Picker
      handleValueChange={handleValueChange}
      itemList={albumNames}
      disabled={albumNames.length <= 1}
    >
      <View style={[styles.row, styles.center, styles.padding]}>
        {renderAlbumTitle}
        {albumNames.length > 1 && <Image testID="carot" source={icons.dropdownOpen} style={styles.margin} />}
      </View>
    </Picker>
  );
};

export default AlbumPicker;
