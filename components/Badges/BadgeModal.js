// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
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
  toggleBadgeModal: Function
};

const BadgeModal = ( { badges, toggleBadgeModal }: Props ) => (
  <View style={styles.outerContainer}>
  {console.log( badges, "badges in badge modal" )}
    <View style={styles.container}>
      <BannerHeader text={badges[0].iconicTaxonName.toLocaleUpperCase()} />
      {badges[0].earned ? (
        <Image source={badgeImages[badges[0].earnedIconName]} style={styles.image} />
      ) : (
        <ImageBackground
          source={badgeImages[badges[0].unearnedIconName]}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <LargeProgressCircle badge={badges[0]} />
        </ImageBackground>
      )}
      <Text style={styles.headerText}>{i18n.t( "badges.to_earn" ).toLocaleUpperCase()}</Text>
      <Text style={styles.nameText}>
        {i18n.t( "badges.observe_species" )}
        {" "}
        {i18n.t( badges[0].infoText )}
      </Text>
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

export default BadgeModal;
