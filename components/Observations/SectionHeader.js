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
import { colors } from "../../styles/global";
import styles from "../../styles/observations/sectionHeader";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import realmConfig from "../../models/index";

type Props = {
  section: Object,
  open: boolean,
  toggleSection: Function
};

const SectionHeader = ( { section, open, toggleSection }: Props ) => {
  const [badgeCount, setBadgeCount] = useState( 0 );
  const { id, data } = section;

  const noBadge = badgeCount === 0;
  const badge = badges.badge_gold;
  let tint;

  if ( badgeCount === 1 ) {
    tint = colors.bronze;
  } else if ( badgeCount === 2 ) {
    tint = colors.silver;
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
        {id !== 1 && ( // $FlowFixMe
          <Image
            source={noBadge ? badges.badge_empty_small : badge}
            style={[styles.badge, noBadge && styles.empty, tint && { tintColor: tint }]}
            tintColor={tint}
          />
        )}
        <Image
          source={icons.dropdownOpen}
          style={!open ? styles.margin : styles.marginOpen}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SectionHeader;
