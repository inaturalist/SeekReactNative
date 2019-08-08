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
import LoadingWheel from "../LoadingWheel";
import icons from "../../assets/icons";

type Props = {
  navigation: any,
  photos: Array<Object>,
  userPhoto: string,
  route: string
};

const SpeciesPhotos = ( {
  photos,
  userPhoto,
  navigation,
  route
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
      <FlatList
        data={photoList}
        horizontal
        pagingEnabled
        bounces={false}
        indicatorStyle="white"
        initialNumToRender={1}
        renderItem={( { item } ) => item}
        contentContainerStyle={styles.photoContainer}
        ListEmptyComponent={() => (
          <View style={[styles.photoContainer, styles.fullWidth, styles.loading]}>
            <LoadingWheel color="white" />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          if ( route ) {
            navigation.navigate( route );
          } else {
            navigation.navigate( "Main" );
          }
        }}
        hitSlop={styles.touchable}
        style={styles.backButton}
      >
        <Image source={icons.backButton} />
      </TouchableOpacity>
      <Image source={icons.swipeLeft} style={styles.leftArrow} />
      <Image source={icons.swipeRight} style={styles.rightArrow} />
    </View>
  );
};

export default SpeciesPhotos;
