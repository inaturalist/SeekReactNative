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
import WhiteModal from "../UIComponents/WhiteModal";

type Props = {
  +badges: Array<Object>,
  +iconicSpeciesCount: ?number,
  +closeModal: Function
};

const BadgeModal = ( { badges, iconicSpeciesCount, closeModal }: Props ) => {
  const [dotIndex, setDotIndex] = useState( 0 );
  const [scrollOffset, setScrollOffset] = useState( 0 );
  const flatList = useRef( null );

  const length = badges.length - 1;
  const nextIndex = dotIndex < length ? dotIndex + 1 : length;
  const prevIndex = dotIndex > 0 ? dotIndex - 1 : 0;

  const calculateScrollIndex = ( e ) => {
    const { contentOffset } = e.nativeEvent;

    if ( contentOffset.x > scrollOffset ) {
      setDotIndex( nextIndex );
      setScrollOffset( contentOffset.x );
    } else if ( contentOffset.x < scrollOffset ) {
      setDotIndex( prevIndex );
      setScrollOffset( contentOffset.x );
    }
  };

  const scrollToIndex = ( index ) => {
    setDotIndex( index );
    if ( flatList && flatList.current ) {
      flatList.current.scrollToIndex( {
        index, animated: true
      } );
    }
  };

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
        data={badgeList}
        horizontal
        pagingEnabled
        renderItem={( { item } ) => item}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={( e ) => calculateScrollIndex( e )}
      />
      {dotIndex !== 0 && <Image source={icons.badgeSwipeRight} style={styles.leftArrow} />}
      {dotIndex !== 2 && <Image source={icons.badgeSwipeRight} style={styles.arrow} />}
      <View style={styles.marginLarge} />
      <View style={styles.row}>
        {[0, 1, 2].map( ( item, index ) => (
          <TouchableOpacity
            key={item}
            onPress={() => scrollToIndex( index )}
          >
            <Image
              source={badges[item].earned
                ? badgeImages[badges[item].earnedIconName]
                : badgeImages.badge_empty}
              style={styles.smallImage}
            />
            <Text style={[styles.bullets, index !== dotIndex && styles.transparent]}>&#8226;</Text>
          </TouchableOpacity>
        ) )}
      </View>
      <View style={styles.marginBottom} />
    </WhiteModal>
  );
};

export default BadgeModal;
