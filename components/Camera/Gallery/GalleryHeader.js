// @flow

import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
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
  const navigation = useNavigation();
  const [albumNames, setAlbumNames] = useState( [] );

  const fetchAlbumNames = useCallback( async () => {
    try {
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
    } catch ( e ) {
      Alert.alert( `Error fetching photo albums: ${e}` );
    }
  }, [] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      if ( albumNames.length === 0 ) {
        fetchAlbumNames();
      }
    } );
  }, [navigation, albumNames, fetchAlbumNames] );

  return (
    <View style={[styles.header, styles.center]}>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => navigateToMainStack( navigation.navigate, "Home" )}
        style={styles.backButton}
      >
        {/* $FlowFixMe */}
        <Image
          source={icons.closeWhite}
          tintColor={colors.seekForestGreen}
          style={styles.buttonImage}
        />
      </TouchableOpacity>
      {albumNames.length > 1 ? (
        <View>
          {/* view is used to make sure back button is still touchable */}
          <AlbumPicker albumNames={albumNames} updateAlbum={updateAlbum} />
        </View>
      ) : (
        <Text style={styles.headerText} testID="cameraRollText">
          {i18n.t( "gallery.camera_roll" ).toLocaleUpperCase()}
        </Text>
      )}
    </View>
  );
};

export default GalleryHeader;
