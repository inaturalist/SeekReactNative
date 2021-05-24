// @flow

import React, { useState, useEffect, useCallback } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import { viewStyles, imageStyles } from "../../../styles/camera/gallery";
import icons from "../../../assets/icons";
import AlbumPicker from "./AlbumPicker";
import { fetchAlbums } from "../../../utility/cameraRollHelpers";
import { resetRouter } from "../../../utility/navigationHelpers";

type Props = {
  updateAlbum: ( ?string ) => mixed
}

const cameraRoll = [{
  label: i18n.t( "gallery.photo_library" ).toLocaleUpperCase( ),
  value: "All"
}];

const GalleryHeader = ( { updateAlbum }: Props ): Node => {
  const navigation = useNavigation( );

  const [albumNames, setAlbumNames] = useState( cameraRoll );

  const fetch = async ( ) => setAlbumNames( await fetchAlbums( cameraRoll ) );

  useEffect( ( ) => {
    if ( albumNames.length === 1 ) {
      fetch( );
    }
  }, [albumNames] );

  const handleBackNav = useCallback( ( ) => resetRouter( navigation ), [navigation] );

  return (
    <View style={[viewStyles.header, viewStyles.center]}>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={handleBackNav}
        style={viewStyles.backButton}
      >
        {/* $FlowFixMe */}
        <Image
          source={icons.closeWhite}
          tintColor={colors.seekForestGreen}
          style={imageStyles.buttonImage}
        />
      </TouchableOpacity>
      <AlbumPicker albumNames={albumNames} updateAlbum={updateAlbum} />
    </View>
  );
};

export default GalleryHeader;
