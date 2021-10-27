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
import { viewStyles, imageStyles } from "../../styles/badges/achievements";
import { createBadgeSetList } from "../../utility/badgeHelpers";
import BadgeContainer from "./BadgeContainer";

type Props = {
  speciesBadges: Array<{
    iconicTaxonId: number,
    infoText: string,
    earned: boolean,
    earnedIconName: string
  }>
}

const SpeciesBadges = ( { speciesBadges }: Props ): Node => {
  const [showModal, setModal] = useState( false );
  const [iconicSpeciesCount, setIconicSpeciesCount] = useState( 0 );
  const [iconicTaxonBadges, setIconicTaxonBadges] = useState( [] );

  const sets = createBadgeSetList( speciesBadges );

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

  const renderSpeciesBadge = ( item: Object ) => {
    let imageSrc = badgeImages.badge_empty;

    if ( item && item.earned && item.earnedIconName ) {
      imageSrc = badgeImages[item.earnedIconName];
    }
    return (
      <TouchableOpacity
        onPress={() => fetchBadgesByIconicId( item.iconicTaxonId )}
        accessible
        accessibilityLabel={i18n.t( item.infoText )}
      >
        <Image
          source={imageSrc}
          style={imageStyles.badgeIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderBadgeGrid = ( ) => sets.map( ( set, index ) => {
    const setOfFive = speciesBadges.slice( sets[index], sets[index + 1] );

    return (
      <View key={`badge-grid-${sets[index]}`}>
        <BadgeContainer
          data={setOfFive}
          renderItem={renderSpeciesBadge}
        />
      </View>
    );
  } );

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
    <>
      {iconicTaxonBadges.length > 0 && renderBadgeModal( )}
      {renderBadgeGrid( )}
      <View style={viewStyles.margin} />
    </>
  );
};

export default SpeciesBadges;
