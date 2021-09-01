// @flow

import React, { useRef, useState, useCallback } from "react";
import { Image, FlatList, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/uiComponents/horizontalScroll";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import { dimensions } from "../../styles/global";

type Props = {
  photoList: Array<Object>
}

const HorizontalScroll = ( { photoList }: Props ): Node => {
  const { name } = useRoute();
  const flatList = useRef( null );
  const viewConfigRef = useRef( {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  } );
  const length = photoList.length - 1;
  const { width } = dimensions;
  const [scrollIndex, setScrollIndex] = useState( 0 );

  const isStatsScreen = name === "iNatStats";
  const isSpeciesScreen = name === "Species";

  const nextIndex = scrollIndex < length ? scrollIndex + 1 : length;
  const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;

  const scroll = ( index ) => {
    if ( index < 0 || index >= photoList.length ) {
      return;
    }
    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( { index, animated: true } );
    }
  };

  const scrollRight = () => scroll( nextIndex );
  const scrollLeft = () => scroll( prevIndex );

  const onViewRef = useRef( ( { changed } ) => {
    const { index } = changed[0];
    if ( !index ) { return; }
    setScrollIndex( index );
  } );

  const renderPhoto = useCallback( ( { item } ) => item, [] );

  // skips measurement of dynamic content for faster loading
  const getItemLayout = useCallback( ( data, index ) => ( {
    length: ( width ),
    offset: ( width ) * index,
    index
  } ), [width] );

  return (
    <>
      <FlatList
        ref={flatList}
        bounces={false}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        contentContainerStyle={isStatsScreen ? styles.photoContainer : styles.speciesPhotoContainer}
        data={photoList}
        getItemLayout={getItemLayout}
        horizontal
        indicatorStyle="white"
        initialNumToRender={1}
        pagingEnabled
        renderItem={renderPhoto}
        showsHorizontalScrollIndicator={isStatsScreen}
      />
      {scrollIndex > 0 && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
          accessible
          onPress={scrollLeft}
          style={[styles.leftArrow, isSpeciesScreen && styles.speciesLeftArrow]}
        >
          <Image source={icons.swipeRight} style={styles.rotate} />
        </TouchableOpacity>
      )}
      {scrollIndex < length && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
          accessible
          onPress={scrollRight}
          style={[styles.rightArrow, isSpeciesScreen && styles.speciesRightArrow]}
        >
          <Image source={icons.swipeRight} style={styles.rotateRTL} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default HorizontalScroll;
