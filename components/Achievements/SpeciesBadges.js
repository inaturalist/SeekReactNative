// @flow

import React, { useState, useCallback } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";
import type { Node } from "react";

import i18n from "../../i18n";
import realmConfig from "../../models";
import BadgeModal from "../Modals/BadgeModal";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/achievements";

type Props = {
  +speciesBadges: Array<Object>
}

const SpeciesBadges = ( { speciesBadges }: Props ): Node => {
  const [showModal, setModal] = useState( false );
  const [iconicSpeciesCount, setIconicSpeciesCount] = useState( 0 );
  const [iconicTaxonBadges, setIconicTaxonBadges] = useState( [] );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const fetchBadgesByIconicId = ( taxaId: number ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).filtered( `iconicTaxonId == ${taxaId}` ).sorted( "index" );
        const collectedTaxa = realm.objects( "TaxonRealm" );
        const collection = collectedTaxa.filtered( `iconicTaxonId == ${taxaId}` ).length;

        setIconicTaxonBadges( badges );
        setIconicSpeciesCount( collection );
        openModal();
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  const renderSpeciesBadge = ( item ) => {
    if ( !item ) { return; }
    return (
      <TouchableOpacity
        onPress={() => fetchBadgesByIconicId( item.iconicTaxonId )}
        accessible
        accessibilityLabel={i18n.t( item.infoText )}
        key={item.iconicTaxonId}
      >
        <Image
          source={item.earned ? badgeImages[item.earnedIconName] : badgeImages.badge_empty}
          style={styles.badgeIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderNextFiveBadges = ( start, finish ) => (
    <View style={styles.gridRowWrap} key={start}>
      {speciesBadges.slice( start, finish ).map( ( item, index ) => renderSpeciesBadge( item ) )}
    </View>
  );

  const renderBadgesGrid = ( ) => {
    const numOfSets = Math.round( speciesBadges.length / 5 );
    const sets = [];

    for ( let i = 0; i < numOfSets; i += 1 ) {
      sets.push( i * 5 );
    }

    return sets.map( ( set, index ) => renderNextFiveBadges( sets[index], sets[index + 1] ) );
  };

  const renderBadgeModal = ( ) => (
    <Modal
      isVisible={showModal}
      onBackdropPress={closeModal}
      useNativeDriverForBackdrop
      useNativeDriver
    >
      <BadgeModal
        badges={iconicTaxonBadges}
        iconicSpeciesCount={iconicSpeciesCount}
        closeModal={closeModal}
      />
    </Modal>
  );

  return (
    <View>
      {iconicTaxonBadges.length > 0 && renderBadgeModal( )}
      {speciesBadges.length > 0 && renderBadgesGrid( )}
      <View style={styles.margin} />
    </View>
  );
};

export default SpeciesBadges;
