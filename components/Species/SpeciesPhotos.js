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
import icons from "../../assets/icons";

type Props = {
  photos: Array<Object>,
  userPhoto: string,
  navigation: any
};

const SpeciesPhotos = ( { photos, userPhoto, navigation }: Props ) => {
  const photoList = [];

  if ( userPhoto ) {
    photoList.push(
      <View key="user-image">
        <Image
          source={{ uri: userPhoto }}
          style={styles.image}
        />
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.backButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  photos.forEach( ( photo, i ) => {
    if ( i <= 7 ) {
      const image = (
        <View key={`image${photo.taxon_id}-${i}`}>
          <Image
            source={{ uri: photo.photo.original_url }}
            style={styles.image}
          />
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={icons.backButton} />
            </TouchableOpacity>
          </View>
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
    }
  } );

  return (
    photoList
  );
};

export default SpeciesPhotos;
