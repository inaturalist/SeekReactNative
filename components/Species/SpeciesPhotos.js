// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/speciesPhotos";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { localizeAttributions } from "../../utility/photoHelpers";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import { useUserPhoto } from "../../utility/customHooks";

type Props = {
  +photos: Array<Object>,
  +seenTaxa: ?Object
};

const SpeciesPhotos = ( { photos, seenTaxa }: Props ) => {
  const userPhoto = useUserPhoto( seenTaxa );
  const [photoList, setPhotoList] = useState( [] );

  useEffect( () => {
    if ( photos.length === 0 ) {
      return;
    }

    const list = [];

    if ( userPhoto ) {
      list.push(
        <View key="user-image">
          <Image
            source={userPhoto}
            style={styles.image}
          />
        </View>
      );
    }

    photos.forEach( ( photo ) => {
      if ( photo.license_code && list.length < 9 ) {
        const image = (
          <View key={`image${photo.original_url}`}>
            <Image
              source={{ uri: photo.original_url }}
              style={styles.image}
            />
            <TouchableOpacity
              onPress={() => Alert.alert(
                i18n.t( "species_detail.license" ),
                localizeAttributions( photo.attribution, photo.license_code, "SpeciesDetail" )
              )}
              style={styles.ccButton}
            >
              <View style={styles.ccView}>
                <Text style={styles.ccButtonText}>
                  {i18n.t( "species_detail.cc" ).toLocaleUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
        list.push( image );
      }
    } );

    setPhotoList( list );
  }, [photos, userPhoto] );

  return (
    <View>
      {photoList.length === 0 ? (
        <View style={[styles.photoContainer, styles.fullWidth]}>
          <LoadingWheel color="white" />
        </View>
      ) : <HorizontalScroll photoList={photoList} screen="SpeciesPhotos" />}
    </View>
  );
};

export default SpeciesPhotos;
