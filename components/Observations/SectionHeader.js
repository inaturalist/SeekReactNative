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
import styles from "../../styles/observations/sectionHeader";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import realmConfig from "../../models/index";

type Props = {
  section: Object,
  // hiddenSections: Object,
  toggleSection: Function
};

const SectionHeader = ( { section, toggleSection }: Props ) => {
  const [badgeCount, setBadgeCount] = useState( 0 );
  const { id, data, open } = section;
  // const open = !hiddenSections.includes( id );

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
      style={[styles.header, styles.row]}
    >
      <Text allowFontScaling={false} style={styles.headerText}>
        {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
      </Text>
      <View style={styles.row}>
        <Text style={styles.numberText} allowFontScaling={false}>{data.length}</Text>
        {id !== 1 && <Image source={badge} style={[styles.badge, badgeCount === 0 && styles.empty]} />}
        <Image
          source={!open ? icons.dropdownClosed : icons.dropdownOpen}
          style={!open ? styles.margin : styles.marginOpen}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SectionHeader;
