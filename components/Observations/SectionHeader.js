// @flow

import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import Realm from "realm";

import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import realmConfig from "../../models/index";

type Props = {
  section: Object,
  sections: Object,
  toggleSection: Function
};

const SectionHeader = ( { section, sections, toggleSection }: Props ) => {
  const [badgeCount, setBadgeCount] = useState( 0 );
  const { id, data } = section;
  const open = sections.includes( id );

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

  const fetchBadgeCount = useCallback( () => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const count = realm.objects( "BadgeRealm" )
        .filtered( `iconicTaxonId == ${id} AND earned == true` ).length;

      setBadgeCount( count );
    } );
  }, [id] );

  useEffect( () => fetchBadgeCount(), [fetchBadgeCount] );

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
        {id !== 1 && (
          <>
            <View style={styles.marginSmall} />
            <Image source={badge} style={styles.badgeImage} />
            <View style={[styles.margin, open && styles.marginOpen]} />
          </>
        )}
        <View style={[styles.noMargin, id === 1 && styles.marginBadgeEmpty]} />
        <Image source={open ? icons.dropdownOpen : icons.dropdownClosed} />
      </View>
    </TouchableOpacity>
  );
};

export default SectionHeader;
