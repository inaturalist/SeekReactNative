// @flow
import React from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/speciesPhotos";

type Props = {
  photos: Array<Object>,
  userPhoto: string
};

const SpeciesPhotos = ( { photos, userPhoto }: Props ) => {
  const photoList = [];

  if ( userPhoto ) {
    photoList.push(
      <View key="user-image">
        <Image
          source={{ uri: userPhoto }}
          style={styles.image}
        />
      </View>
    );
  }

  photos.forEach( ( photo, i ) => {
    const image = (
      <View key={`image${photo.taxon_id}-${i}`}>
        <Image
          source={{ uri: photo.photo.original_url }}
          style={styles.image}
        />
        <View style={styles.photoOverlay}>
          <TouchableOpacity
            style={styles.ccButton}
            onPress={() => Alert.alert(
              "License",
              photo.photo.attribution
            )}
          >
            <Text style={styles.ccButtonText}>{i18n.t( "species_detail.cc" ).toLocaleUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    photoList.push( image );
  } );

  return (
    photoList
  );
};

export default SpeciesPhotos;
