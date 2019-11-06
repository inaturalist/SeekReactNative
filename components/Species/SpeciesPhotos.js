// @flow
import React, { Component } from "react";
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
import { dimensions } from "../../styles/global";

type Props = {
  +photos: Array<Object>,
  +userPhoto: string
};

class SpeciesPhotos extends Component<Props> {
  constructor() {
    super();

    this.state = {
      scrollIndex: 0,
      scrollOffset: 0
    };
  }

  setIndex( scrollIndex, scrollOffset ) {
    this.setState( {
      scrollIndex,
      scrollOffset
    } );
  }

  scrollRight() {
    const { scrollIndex, scrollOffset } = this.state;
    const { photos } = this.props;

    const nextIndex = scrollIndex < photos.length - 1 ? scrollIndex + 1 : photos.length - 1;
    const nextOffset = scrollOffset + dimensions.width;

    if ( this.flatList ) {
      this.flatList.scrollToIndex( {
        index: nextIndex, animated: true
      } );
      this.setIndex( nextIndex, nextOffset );
    }
  }

  scrollLeft() {
    const { scrollIndex, scrollOffset } = this.state;

    const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;
    const prevOffset = scrollOffset - dimensions.width;

    if ( this.flatList ) {
      this.flatList.scrollToIndex( {
        index: prevIndex, animated: true
      } );
      this.setIndex( prevIndex, prevOffset );
    }
  }

  calculateScrollIndex( e ) {
    const { scrollOffset, scrollIndex } = this.state;
    const { contentOffset } = e.nativeEvent;

    let nextIndex;
    let prevIndex;

    if ( contentOffset.x > scrollOffset ) {
      nextIndex = scrollIndex < 8 ? scrollIndex + 1 : 8;
      this.setIndex( nextIndex, contentOffset.x );
    } else {
      prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;
      this.setIndex( prevIndex, contentOffset.x );
    }
  }

  render() {
    const { photos, userPhoto } = this.props;

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
          ref={( ref ) => { this.flatList = ref; }}
          bounces={false}
          contentContainerStyle={styles.photoContainer}
          data={photoList}
          getItemLayout={( data, index ) => (
            // skips measurement of dynamic content for faster loading
            {
              length: ( dimensions.width ),
              offset: ( dimensions.width ) * index,
              index
            }
          )}
          horizontal
          indicatorStyle="white"
          initialNumToRender={1}
          ListEmptyComponent={() => (
            <View style={[styles.photoContainer, styles.fullWidth]}>
              <LoadingWheel color="white" />
            </View>
          )}
          onScrollEndDrag={e => this.calculateScrollIndex( e )}
          pagingEnabled
          renderItem={( { item } ) => item}
        />
        <TouchableOpacity
          onPress={() => this.scrollLeft()}
          style={styles.leftArrow}
        >
          <Image source={icons.swipeLeft} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.scrollRight()}
          style={styles.rightArrow}
        >
          <Image source={icons.swipeRight} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SpeciesPhotos;
