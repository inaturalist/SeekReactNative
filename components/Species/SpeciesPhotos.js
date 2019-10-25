// @flow
import React from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/speciesPhotos";
import LoadingWheel from "../UIComponents/LoadingWheel";
import icons from "../../assets/icons";

type Props = {
  +photos: Array<Object>,
  +userPhoto: string
};

const SpeciesPhotos = ( {
  photos,
  userPhoto
}: Props ) => {
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
        <TouchableOpacity
          onPress={() => Alert.alert(
            i18n.t( "species_detail.license" ),
            photo.photo.attribution
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
    photoList.push( image );
  } );

  return (
    <View>
      <FlatList
        bounces={false}
        contentContainerStyle={styles.photoContainer}
        data={photoList}
        horizontal
        indicatorStyle="white"
        initialNumToRender={1}
        ListEmptyComponent={() => (
          <View style={[styles.photoContainer, styles.fullWidth]}>
            <LoadingWheel color="white" />
          </View>
        )}
        pagingEnabled
        renderItem={( { item } ) => item}
      />
      <Image source={icons.swipeLeft} style={styles.leftArrow} />
      <Image source={icons.swipeRight} style={styles.rightArrow} />
    </View>
  );
};

export default SpeciesPhotos;
