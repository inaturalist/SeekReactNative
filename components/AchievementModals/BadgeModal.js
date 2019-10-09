// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/badges/badgeModal";
import badgeImages from "../../assets/badges";
import BannerHeader from "../Achievements/BannerHeader";
import LargeProgressCircle from "../Achievements/LargeProgressCircle";
import icons from "../../assets/icons";
import BackButton from "../UIComponents/ModalBackButton";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +badges: Array<Object>,
  +iconicSpeciesCount: number,
  +toggleBadgeModal: Function
};

const BadgeModal = ( { badges, iconicSpeciesCount, toggleBadgeModal }: Props ) => {
  const badgeList = [];

  badges.forEach( ( badge, i ) => {
    const badgeInfo = (
      <View
        key={`badge${badge}${i}`}
        style={styles.carousel}
      >
        {badge.earned ? (
          <Image source={badgeImages[badge.earnedIconName]} style={styles.image} />
        ) : (
          <ImageBackground
            imageStyle={styles.imageStyle}
            source={badgeImages[badge.unearnedIconName]}
            style={styles.image}
          >
            <LargeProgressCircle badge={badge} iconicSpeciesCount={iconicSpeciesCount} />
          </ImageBackground>
        )}
        <GreenText text={badge.earned
          ? i18n.t( badge.intlName ).toLocaleUpperCase()
          : i18n.t( "badges.to_earn" ).toLocaleUpperCase()}
        />
        <View style={styles.margin} />
        <Text style={styles.nameText}>
          {i18n.t( "badges.observe_species" )}
          {" "}
          {i18n.t( badge.infoText )}
        </Text>
      </View>
    );
    badgeList.push( badgeInfo );
  } );

  return (
    <React.Fragment>
      <View style={styles.innerContainer}>
        <BannerHeader
          modal
          text={i18n.t( badges[0].iconicTaxonName ).toLocaleUpperCase()}
        />
        <FlatList
          data={badgeList}
          horizontal
          pagingEnabled
          renderItem={( { item } ) => item}
          showsHorizontalScrollIndicator={false}
        />
        <Image source={icons.badgeSwipeRight} style={styles.arrow} />
        <View style={styles.marginLarge} />
        <View style={styles.row}>
          {[0, 1, 2].map( item => (
            <View key={item}>
              <Image
                source={badges[item].earned
                  ? badgeImages[badges[item].earnedIconName]
                  : badgeImages[badges[item].unearnedIconName]}
                style={styles.smallImage}
              />
            </View>
          ) )}
        </View>
      </View>
      <BackButton toggleModal={toggleBadgeModal} />
    </React.Fragment>
  );
};

export default BadgeModal;
