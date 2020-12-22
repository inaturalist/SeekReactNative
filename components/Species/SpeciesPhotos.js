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
import { useUserPhoto, useSeenTaxa } from "../../utility/customHooks";

type Props = {
  +photos: Array<Object>,
  +id: number
};

const SpeciesPhotos = ( { photos, id }: Props ) => {
  const seenTaxa = useSeenTaxa( id );
  const userPhoto = useUserPhoto( seenTaxa );
  const [photoList, setPhotoList] = useState( [] );

  const renderPhoto = photo => {
    const showLicense = ( ) => Alert.alert(
      i18n.t( "species_detail.license" ),
      localizeAttributions( photo.attribution, photo.license_code, "SpeciesDetail" )
    );

    return (
      <View key={`image${photo.medium_url}`}>
        <Image source={{ uri: photo.medium_url }} style={styles.image} />
        <TouchableOpacity
          onPress={showLicense}
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
  };

  useEffect( ( ) => {
    // show user photo instead of loading wheel when internet down
    if ( photos.length === 0 && !userPhoto ) {
      return;
    }

    const list = [];

    if ( userPhoto ) {
      list.push(
        <View key="user-image">
          <Image source={userPhoto} style={styles.image} />
        </View>
      );
    }

    photos.forEach( ( photo ) => {
      if ( photo.license_code && list.length < 9 ) {
        list.push( renderPhoto( photo ) );
      }
    } );

    setPhotoList( list );
  }, [photos, userPhoto] );

  return (
    <>
      {photoList.length === 0 ? (
        <View style={[styles.photoContainer, styles.fullWidth]}>
          <LoadingWheel color="white" />
        </View>
      ) : <HorizontalScroll photoList={photoList} screen="SpeciesPhotos" />}
    </>
  );
};

export default SpeciesPhotos;
