import React, { useRef, useState, useCallback } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { FlashList, ViewToken } from "@shopify/flash-list";
import { useRoute } from "@react-navigation/native";

import styles from "../../styles/uiComponents/horizontalScroll";
import i18n from "../../i18n";
import icons from "../../assets/icons";

interface Props {
  photoList: JSX.Element[];
}

const HorizontalScroll = ( { photoList }: Props ) => {
  const { name } = useRoute();
  const flashList = useRef<FlashList<JSX.Element>>( null );
  const viewConfigRef = useRef( {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  } );
  const length = photoList.length - 1;
  const [scrollIndex, setScrollIndex] = useState( 0 );

  const isStatsScreen = name === "iNatStats";
  const isSpeciesScreen = name === "Species";
  const isYearInReviewScreen = name === "SeekYearInReview";

  const nextIndex = scrollIndex < length ? scrollIndex + 1 : length;
  const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;

  const scroll = ( index: number ) => {
    if ( index < 0 || index >= photoList.length ) {
      return;
    }
    if ( flashList && flashList.current !== null ) {
      flashList.current?.scrollToIndex( { index, animated: true } );
    }
  };

  const scrollRight = () => scroll( nextIndex );
  const scrollLeft = () => scroll( prevIndex );

  const onViewRef = useRef( ( { changed }: { changed: ViewToken[]} ) => {
    const { index } = changed[0];
    if ( !index ) { return; }
    setScrollIndex( index );
  } );

  const renderPhoto = useCallback( ( { item }: { item: JSX.Element } ) => item, [] );

  const containerStyle = isYearInReviewScreen
    ? null
    : isStatsScreen
    ? styles.bigContainer
    : styles.smallContainer;
  const contentContainerStyle = ( !isYearInReviewScreen && !isStatsScreen ) ? styles.speciesPhotoContainer : {};

  return (
    <View style={containerStyle}>
      <FlashList
        testID="horizontal-scroll"
        ref={flashList}
        bounces={false}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        contentContainerStyle={contentContainerStyle}
        data={photoList}
        horizontal
        indicatorStyle="white"
        pagingEnabled
        renderItem={renderPhoto}
        showsHorizontalScrollIndicator={isStatsScreen}
      />
      {scrollIndex > 0 && (
        <TouchableOpacity
          testID="left-arrow"
          accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
          accessible
          onPress={scrollLeft}
          style={[
            styles.leftArrow,
            isSpeciesScreen && styles.speciesLeftArrow,
            isYearInReviewScreen && styles.yearInReviewArrow
          ]}
        >
          <Image source={icons.swipeRight} style={styles.rotate} />
        </TouchableOpacity>
      )}
      {scrollIndex < length && (
        <TouchableOpacity
          testID="right-arrow"
          accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
          accessible
          onPress={scrollRight}
          style={[
            styles.rightArrow,
            isSpeciesScreen && styles.speciesRightArrow,
            isYearInReviewScreen && styles.yearInReviewArrow
          ]}
        >
          <Image source={icons.swipeRight} style={styles.rotateRTL} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HorizontalScroll;
