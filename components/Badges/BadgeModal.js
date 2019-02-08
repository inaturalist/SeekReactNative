// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from "react-native";
import BackIcon from "react-native-vector-icons/AntDesign";

import i18n from "../../i18n";
import styles from "../../styles/badges/badgeModal";
import { colors } from "../../styles/global";
import badgeImages from "../../assets/badges";
import BannerHeader from "./BannerHeader";
import LargeProgressCircle from "./LargeProgressCircle";

const backIcon = ( <BackIcon name="closecircle" size={50} color={colors.white} /> );

type Props = {
  badges: Array<Object>,
  iconicSpeciesCount: number,
  toggleBadgeModal: Function
};

const BadgeModal = ( { badges, toggleBadgeModal, iconicSpeciesCount }: Props ) => {
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
          ? <Text style={styles.headerText}>{i18n.t( badge.name ).toLocaleUpperCase()}</Text>
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
    <View style={styles.outerContainer}>
    {console.log( badges, "badges in badge modal" )}
      <View style={styles.container}>
        <BannerHeader text={badges[0].iconicTaxonName.toLocaleUpperCase()} />
        <ScrollView horizontal>
          {badgeList}
        </ScrollView>
        <View style={styles.row}>
          {badges[0].earned ? (
            <Image
              source={badgeImages[badges[0].earnedIconName]}
              style={styles.smallImage}
            />
          ) : (
            <Image
              source={badgeImages[badges[0].unearnedIconName]}
              style={styles.smallImage}
            />
          )}
          {badges[1].earned ? (
            <Image
              source={badgeImages[badges[1].earnedIconName]}
              style={styles.smallImage}
            />
          ) : (
            <Image
              source={badgeImages[badges[1].unearnedIconName]}
              style={styles.smallImage}
            />
          )}
          {badges[2].earned ? (
            <Image
              source={badgeImages[badges[2].earnedIconName]}
              style={styles.smallImage}
            />
          ) : (
            <Image
              source={badgeImages[badges[2].unearnedIconName]}
              style={styles.smallImage}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => toggleBadgeModal()}>
        <Text>{backIcon}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BadgeModal;
