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
  const [error, setError] = useState( false );

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

  useEffect( ( ) => {
    let errorState = setTimeout( ( ) => setError( true ), 1500 );

    if ( userPhoto || photos.length > 0 ) {
      // custom userPhoto hook takes a bit of time to fetch, so wrapping this in timeout
      clearTimeout( errorState );
    }

    return ( ) => {
      clearTimeout( errorState );
    };
  }, [photos, userPhoto] );

  const renderPhotoList = ( ) => {
    if ( error ) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{i18n.t( "species_detail.no_photos_found" )}</Text>
        </View>
      );
    } else if ( photoList.length === 0 ) {
      return (
        <View style={[styles.photoContainer, styles.fullWidth]}>
          <LoadingWheel color="white" />
        </View>
      );
    } else {
      return <HorizontalScroll photoList={photoList} screen="SpeciesPhotos" />;
    }
  };

  return renderPhotoList( );
};

export default SpeciesPhotos;
