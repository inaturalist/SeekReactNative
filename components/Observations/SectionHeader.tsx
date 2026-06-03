import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import Realm from "realm";

import badges from "../../assets/badges";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import realmConfig from "../../models/index";
import { colors } from "../../styles/global";
import styles from "../../styles/observations/sectionHeader";
import { baseTextStyles } from "../../styles/textStyles";
import { iconicTaxaNamesById } from "../../utility/dictionaries/taxonomyDicts";
import StyledText from "../UIComponents/StyledText";

interface Props {
  id: number;
  dataLength: number;
  open: boolean;
  toggleSection: ( id: number ) => void;
}

const SectionHeader = ( { id, dataLength, open, toggleSection }: Props ) => {
  const [badgeCount, setBadgeCount] = useState( 0 );

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
      <StyledText allowFontScaling={false} style={[baseTextStyles.header, styles.headerText]}>
        {i18n.t( iconicTaxaNamesById[id] ).toLocaleUpperCase()}
      </StyledText>
      <View style={styles.row}>
        <StyledText style={[baseTextStyles.sectionNumber]} allowFontScaling={false}>{dataLength}</StyledText>
        {id !== 1 && (
          <Image
            source={noBadge ? badges.badge_empty_small : badge}
            style={[styles.badge, noBadge && styles.empty, tint && { tintColor: tint }]}
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
