import React, { useState, useRef, useReducer } from "react";
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
  const flatList = useRef( null );
  const length = photoList.length - 1;
  const { width } = dimensions;

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    console.log( action.index, "action index" );
    console.log( action.offset, "action offset and width: ", width );
    switch ( action.type ) {
      case "UPDATE_INDEX":
        return { scrollIndex: action.index, scrollOffset: action.offset };
      default:
        throw new Error();
    }
  }, {
    scrollIndex: 0,
    scrollOffset: 0,
    loading: false
  } );

  const { scrollIndex, scrollOffset } = state;

  const nextIndex = scrollIndex < length ? scrollIndex + 1 : length;
  const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;

  const nextOffset = scrollOffset + width;
  const prevOffset = scrollOffset - width;

  const scroll = ( index, offset ) => {
    if ( index < 0 || index >= photoList.length ) {
      return;
    }
    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( { index, animated: true } );

      if ( index !== scrollIndex ) {
        dispatch( { type: "UPDATE_INDEX", index, offset } );
        // setScrollIndex( index );
        // setScrollOffset( offset );
      }
    }
  };

  const scrollRight = () => scroll( nextIndex, nextOffset );
  const scrollLeft = () => scroll( prevIndex, prevOffset );

  const calculateScrollIndex = ( e ) => {
    const { contentOffset } = e.nativeEvent;

    console.log( scrollIndex, "scroll index in calculate" );
    if ( contentOffset.x > scrollOffset ) {
      dispatch( { type: "UPDATE_INDEX", index: nextIndex, offset: contentOffset.x } );
    } else if ( contentOffset.x < scrollOffset ) {
      dispatch( { type: "UPDATE_INDEX", index: prevIndex, offset: contentOffset.x } );
    }
  };

  // console.log( scrollIndex, scrollOffset, "index and offset" );

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
            length: ( width ),
            offset: ( width ) * index,
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
    </View>
  );
};

export default HorizontalScroll;
