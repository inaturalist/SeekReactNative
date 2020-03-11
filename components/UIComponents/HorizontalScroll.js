import React, { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/uiComponents/horizontalScroll";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import { dimensions } from "../../styles/global";

type Props = {
  photoList: Array<Object>,
  screen: string
}

const HorizontalScroll = ( { photoList, screen }: Props ) => {
  const [scrollIndex, setScrollIndex] = useState( 0 );
  const [scrollOffset, setScrollOffset] = useState( 0 );

  const flatList = useRef( null );
  const length = photoList.length - 1;
  const nextIndex = scrollIndex < length ? scrollIndex + 1 : length;
  const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;

  const scrollRight = () => {
    const nextOffset = scrollOffset + dimensions.width;

    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( {
        index: nextIndex, animated: true
      } );

      if ( nextIndex !== scrollIndex ) {
        setScrollIndex( nextIndex );
        setScrollOffset( nextOffset );
      }
    }
  };

  const scrollLeft = () => {
    const prevOffset = scrollOffset - dimensions.width;

    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( {
        index: prevIndex, animated: true
      } );

      if ( prevIndex !== scrollIndex ) {
        setScrollIndex( prevIndex );
        setScrollOffset( prevOffset );
      }
    }
  };

  const calculateScrollIndex = ( e ) => {
    const { contentOffset } = e.nativeEvent;

    if ( contentOffset.x > scrollOffset ) {
      setScrollIndex( nextIndex );
      setScrollOffset( contentOffset.x );
    } else if ( contentOffset.x < scrollOffset ) {
      setScrollIndex( prevIndex );
      setScrollOffset( contentOffset.x );
    }
  };

  return (
    <View>
      <FlatList
        ref={flatList}
        bounces={false}
        contentContainerStyle={screen === "SpeciesPhotos" ? styles.speciesPhotoContainer : styles.photoContainer}
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
        onScrollEndDrag={( e ) => calculateScrollIndex( e )}
        pagingEnabled
        renderItem={( { item } ) => item}
        showsHorizontalScrollIndicator={screen === "iNatStats"}
      />
      {scrollIndex !== 0 && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
          accessible
          onPress={() => scrollLeft()}
          style={[styles.leftArrow, screen === "SpeciesPhotos" && styles.speciesLeftArrow]}
        >
          <Image source={icons.swipeLeft} />
        </TouchableOpacity>
      )}
      {scrollIndex !== photoList.length - 1 && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
          accessible
          onPress={() => scrollRight()}
          style={[styles.rightArrow, screen === "SpeciesPhotos" && styles.speciesRightArrow]}
        >
          <Image source={icons.swipeRight} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HorizontalScroll;
