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
  const [album, setAlbum] = useState( albumNames[0].label );

  const handleValueChange = useCallback( ( newAlbum ) => {
    setAlbum( newAlbum );
    updateAlbum( newAlbum !== "All" ? newAlbum : null );
  }, [updateAlbum] );

  const renderAlbumTitle = useMemo( () => (
    <Text style={styles.headerText} testID="cameraRollText">
      {album === "All"
        ? albumNames[0].label.toLocaleUpperCase()
        : album.toLocaleUpperCase()}
    </Text>
  ), [album, albumNames] );

  return (
    <Picker
      handleValueChange={handleValueChange}
      selectedValue={album}
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
