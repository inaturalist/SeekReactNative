import React, { useState, useRef } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/iNatStats";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import { dimensions } from "../../styles/global";

type Props = {
  photoList: Array<Object>
}

const HorizontalScroll = ( { photoList }: Props ) => {
  const flatList = useRef( null );
  const [scrollIndex, setScrollIndex] = useState( 0 );
  const [scrollOffset, setScrollOffset] = useState( 0 );

  const scrollRight = () => {
    const nextIndex = scrollIndex < 8 ? scrollIndex + 1 : 8;
    const nextOffset = scrollOffset + dimensions.width;

    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( {
        index: nextIndex, animated: true
      } );

      setScrollIndex( nextIndex );
      setScrollOffset( nextOffset );
    }
  };

  const scrollLeft = () => {
    const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;
    const prevOffset = scrollOffset - dimensions.width;

    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( {
        index: prevIndex, animated: true
      } );

      setScrollIndex( prevIndex );
      setScrollOffset( prevOffset );
    }
  };

  const calculateScrollIndex = ( e ) => {
    const { contentOffset } = e.nativeEvent;

    let nextIndex;
    let prevIndex;

    if ( contentOffset.x > scrollOffset ) {
      nextIndex = scrollIndex < 8 ? scrollIndex + 1 : 8;
      setScrollIndex( nextIndex );
      setScrollOffset( contentOffset.x );
    } else {
      prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;
      setScrollIndex( prevIndex );
      setScrollOffset( contentOffset.x );
    }
  };

  return (
    <View>
      <FlatList
        ref={flatList}
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
        onScrollEndDrag={( e ) => calculateScrollIndex( e )}
        pagingEnabled
        renderItem={( { item } ) => item}
        showsHorizontalScrollIndicator
      />
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
        accessible
        onPress={() => scrollLeft()}
        style={styles.leftArrow}
      >
        <Image source={icons.swipeLeft} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
        accessible
        onPress={() => scrollRight()}
        style={styles.rightArrow}
      >
        <Image source={icons.swipeRight} />
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalScroll;
