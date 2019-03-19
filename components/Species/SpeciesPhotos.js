// @flow
import React from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/species/speciesPhotos";
import LoadingWheel from "../LoadingWheel";
import icons from "../../assets/icons";

type Props = {
  navigation: any,
  photos: Array<Object>,
  userPhoto: string,
  loading: boolean
};

const SpeciesPhotos = ( {
  photos,
  userPhoto,
  loading,
  navigation
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
        <View style={styles.photoOverlay}>
          <TouchableOpacity
            style={styles.ccButton}
            onPress={() => Alert.alert(
              i18n.t( "species_detail.license" ),
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
    <View>
      {loading ? (
        <View style={[styles.photoContainer, styles.loading]}>
          <LoadingWheel color="white" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          scrollEventThrottle
          pagingEnabled
          nestedScrollEnabled
          indicatorStyle="white"
          contentContainerStyle={styles.photoContainer}
        >
          {( photos.length > 0 || userPhoto ) && !loading
            ? photoList
            : null}
        </ScrollView>
      )}
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={styles.touchable}
        >
          <Image source={icons.backButton} />
        </TouchableOpacity>
      </View>
      <Image source={icons.swipeLeft} style={styles.leftArrow} />
      <Image source={icons.swipeRight} style={styles.rightArrow} />
    </View>
  );
};

export default SpeciesPhotos;
