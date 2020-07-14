// @flow

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/modals/badgeModal";
import badgeImages from "../../assets/badges";
import BannerHeader from "../Achievements/BannerHeader";
import LargeProgressCircle from "../Achievements/LargeProgressCircle";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";
import WhiteModal from "../UIComponents/Modals/WhiteModal";

type Props = {
  +badges: Array<Object>,
  +iconicSpeciesCount: ?number,
  +closeModal: Function
};

const BadgeModal = ( { badges, iconicSpeciesCount, closeModal }: Props ) => {
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

  const scrollRight = () => scroll( nextIndex );
  const scrollLeft = () => scroll( prevIndex );

  const onViewRef = useRef( ( { changed } ) => {
    const { index } = changed[0];
    setScrollIndex( index );
  } );

  const badgeList = badges.map( ( badge ) => (
    <View
      key={`badge${badge.earnedIconName}`}
      style={styles.carousel}
    >
      {badge.earned ? (
        <Image source={badgeImages[badge.earnedIconName]} style={styles.image} />
      ) : (
        <ImageBackground
          imageStyle={styles.imageStyle}
          source={badgeImages.badge_empty}
          style={styles.image}
        >
          <LargeProgressCircle badge={badge} iconicSpeciesCount={iconicSpeciesCount} />
        </ImageBackground>
      )}
      <GreenText
        text={badge.earned
          ? badge.intlName
          : "badges.to_earn"}
        allowFontScaling={false}
      />
      <View style={styles.margin} />
      <Text allowFontScaling={false} style={styles.nameText}>
        {i18n.t( "badges.observe_species" )}
        {" "}
        {i18n.t( badge.infoText )}
      </Text>
    </View>
  ) );

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
        data={badgeList}
        horizontal
        pagingEnabled
        renderItem={( { item } ) => item}
        showsHorizontalScrollIndicator={false}
      />
      {scrollIndex > 0 && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
          accessible
          onPress={() => scrollLeft()}
          style={styles.leftArrow}
        >
          <Image source={icons.badgeSwipeRight} />
        </TouchableOpacity>
      )}
      {scrollIndex < 2 && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
          accessible
          onPress={() => scrollRight()}
          style={styles.arrow}
        >
          <Image source={icons.badgeSwipeRight} />
        </TouchableOpacity>
      )}
      <View style={styles.marginLarge} />
      <View style={styles.row}>
        {[0, 1, 2].map( ( item, index ) => (
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
        ) )}
      </View>
      <View style={styles.marginBottom} />
    </WhiteModal>
  );
};

export default BadgeModal;
