// @flow

import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import styles from "../../styles/modals/badgeModal";
import badgeImages from "../../assets/badges";
import BannerHeader from "../UIComponents/BannerHeader";
import LargeProgressCircle from "../UIComponents/LargeProgressCircle";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";
import WhiteModal from "../UIComponents/Modals/WhiteModal";

type Props = {
  badges: Array<Object>,
  iconicSpeciesCount: number,
  closeModal: Function
};

const BadgeModal = ( { badges, iconicSpeciesCount, closeModal }: Props ): Node => {
  const flatList = useRef( null );
  const [scrollIndex, setScrollIndex] = useState( 0 );
  const viewConfigRef = useRef( {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  } );

  const length = badges.length - 1;
  const nextIndex = scrollIndex < length ? scrollIndex + 1 : length;
  const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;

  const scroll = ( index ) => {
    if ( flatList && flatList.current !== null ) {
      flatList.current.scrollToIndex( { index, animated: true } );
    }
  };

  const scrollRight = ( ) => scroll( nextIndex );
  const scrollLeft = ( ) => scroll( prevIndex );

  const onViewRef = useRef( ( { changed } ) => {
    const { index } = changed[0];
    if ( index === null || index === undefined ) {
      return;
    }
    setScrollIndex( index );
  } );

  const renderLeftArrow = ( ) => (
    <TouchableOpacity
      accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
      accessible
      onPress={scrollLeft}
      style={styles.leftArrow}
    >
      <Image source={icons.badgeSwipeRight} />
    </TouchableOpacity>
  );

  const renderRightArrow = ( ) => (
    <TouchableOpacity
      accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
      accessible
      onPress={scrollRight}
      style={styles.arrow}
    >
      <Image source={icons.badgeSwipeRight} />
    </TouchableOpacity>
  );

  const renderBulletsAndSmallImages = ( ) => [0, 1, 2].map( ( item, index ) => (
    <TouchableOpacity
      key={item}
      onPress={() => scroll( index )}
    >
      <Image
        source={badges[item].earned
          ? badgeImages[badges[item].earnedIconName]
          : badgeImages.badge_empty}
        style={styles.smallImage}
      />
      <Text style={[styles.bullets, index !== scrollIndex && styles.transparent]}>
        &#8226;
      </Text>
    </TouchableOpacity>
  ) );

  const renderBadge = ( { item } ) => (
    <View
      key={`badge${item.earnedIconName}`}
      style={styles.carousel}
    >
      {item.earned ? (
        <Image source={badgeImages[item.earnedIconName]} style={styles.image} />
      ) : (
        <ImageBackground
          imageStyle={styles.imageStyle}
          source={badgeImages.badge_empty}
          style={styles.image}
        >
          <LargeProgressCircle badge={item} iconicSpeciesCount={iconicSpeciesCount} />
        </ImageBackground>
      )}
      <GreenText
        text={item.earned
          ? item.intlName
          : "badges.to_earn"}
        allowFontScaling={false}
      />
      <View style={styles.margin} />
      <Text allowFontScaling={false} style={styles.nameText}>
        {i18n.t( "badges.observe_species" )}
        {" "}
        {i18n.t( item.infoText )}
      </Text>
    </View>
  );

  const extractKey = useCallback( ( item, index ) => `${item}${index}`, [] );

  return (
    <WhiteModal closeModal={closeModal}>
      <BannerHeader
        modal
        text={i18n.t( badges[0].iconicTaxonName ).toLocaleUpperCase()}
      />
      <FlatList
        ref={flatList}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        data={badges}
        keyExtractor={extractKey}
        horizontal
        pagingEnabled
        renderItem={renderBadge}
        showsHorizontalScrollIndicator={false}
      />
      {scrollIndex > 0 && renderLeftArrow( )}
      {scrollIndex < 2 && renderRightArrow( )}
      <View style={styles.marginLarge} />
      <View style={styles.row}>
        {renderBulletsAndSmallImages( )}
      </View>
      <View style={styles.marginBottom} />
    </WhiteModal>
  );
};

export default BadgeModal;
