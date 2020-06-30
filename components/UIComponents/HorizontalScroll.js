import React, { useRef, useState } from "react";
import { Image, FlatList, TouchableOpacity } from "react-native";

import styles from "../../styles/uiComponents/horizontalScroll";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import { dimensions } from "../../styles/global";

type Props = {
  photoList: Array<Object>,
  screen: string
}

const HorizontalScroll = ( { photoList, screen }: Props ) => {
  const flatList = useRef( null );
  const viewConfigRef = useRef( {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  } );
  const length = photoList.length - 1;
  const { width } = dimensions;
  const [scrollIndex, setScrollIndex] = useState( 0 );

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
    setScrollIndex( index );
  } );

  return (
    <>
      <FlatList
        ref={flatList}
        bounces={false}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        contentContainerStyle={screen === "SpeciesPhotos" ? styles.speciesPhotoContainer : styles.photoContainer}
        data={photoList}
        getItemLayout={( data, index ) => (
          // skips measurement of dynamic content for faster loading
          {
            length: ( width ),
            offset: ( width ) * index,
            index
          }
        )}
        horizontal
        indicatorStyle="white"
        initialNumToRender={1}
        pagingEnabled
        renderItem={( { item } ) => item}
        showsHorizontalScrollIndicator={screen === "iNatStats"}
      />
      {scrollIndex > 0 && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
          accessible
          onPress={() => scrollLeft()}
          style={[styles.leftArrow, screen === "SpeciesPhotos" && styles.speciesLeftArrow]}
        >
          <Image source={icons.swipeRight} style={styles.rotate} />
        </TouchableOpacity>
      )}
      {scrollIndex < length && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
          accessible
          onPress={() => scrollRight()}
          style={[styles.rightArrow, screen === "SpeciesPhotos" && styles.speciesRightArrow]}
        >
          <Image source={icons.swipeRight} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default HorizontalScroll;
