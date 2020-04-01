// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";

type Props = {
  section: Object,
  toggleSection: Function
};

const ObservationListHeader = ( { section, toggleSection }: Props ) => {
  const {
    id,
    data,
    badgeCount,
    open
  } = section;

  let badge;

  if ( badgeCount === 0 ) {
    badge = badges.badge_empty_small;
  } else if ( badgeCount === 1 ) {
    badge = badges.badge_bronze;
  } else if ( badgeCount === 2 ) {
    badge = badges.badge_silver;
  } else if ( badgeCount === 3 ) {
    badge = badges.badge_gold;
  }

  return (
    <TouchableOpacity
      onPress={() => toggleSection( id )}
      style={styles.headerRow}
    >
      <Text style={styles.secondHeaderText}>
        {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
      </Text>
      <View style={styles.row}>
        <Text style={styles.numberText}>{data.length}</Text>
        {badgeCount !== -1 && (
          <>
            <View style={styles.marginSmall} />
            <Image source={badge} style={styles.badgeImage} />
            <View style={[styles.margin, open && styles.marginOpen]} />
          </>
        )}
        <View style={[
          styles.noMargin,
          badgeCount === -1 && styles.marginBadgeEmpty]}
        />
        <Image source={open ? icons.dropdownOpen : icons.dropdownClosed} />
      </View>
    </TouchableOpacity>
  );
};

export default ObservationListHeader;
