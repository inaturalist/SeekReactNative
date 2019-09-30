// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/badges/badgeModal";
import badgeImages from "../../assets/badges";
import BannerHeader from "../Achievements/BannerHeader";
import LargeProgressCircle from "../Achievements/LargeProgressCircle";
import icons from "../../assets/icons";

type Props = {
  badges: Array<Object>,
  iconicSpeciesCount: number,
  toggleBadgeModal: Function
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
            source={badgeImages[badge.unearnedIconName]}
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <LargeProgressCircle badge={badge} iconicSpeciesCount={iconicSpeciesCount} />
          </ImageBackground>
        )}
        {badge.earned
          ? <Text style={styles.headerText}>{i18n.t( badge.intlName ).toLocaleUpperCase()}</Text>
          : <Text style={styles.headerText}>{i18n.t( "badges.to_earn" ).toLocaleUpperCase()}</Text>
        }
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
    <SafeAreaView style={styles.safeView}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <BannerHeader
            text={i18n.t( badges[0].iconicTaxonName ).toLocaleUpperCase()}
            modal
          />
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={badgeList}
            renderItem={( { item } ) => item}
          />
          <Image source={icons.badgeSwipeRight} style={styles.arrow} />
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
        <TouchableOpacity style={styles.backButton} onPress={() => toggleBadgeModal()}>
          <Image source={icons.closeModal} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BadgeModal;
