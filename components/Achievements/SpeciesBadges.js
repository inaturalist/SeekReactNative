// @flow

import React, { useState, useCallback } from "react";
import { View, Image, TouchableOpacity, FlatList } from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";
import type { Node } from "react";

import i18n from "../../i18n";
import realmConfig from "../../models";
import BadgeModal from "../Modals/BadgeModal";
import badgeImages from "../../assets/badges";
import { viewStyles, imageStyles } from "../../styles/badges/achievements";

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

  const renderSpeciesBadge = ( { item }: Object ) => {
    return (
      <TouchableOpacity
        onPress={() => fetchBadgesByIconicId( item.iconicTaxonId )}
        accessible
        accessibilityLabel={i18n.t( item.infoText )}
        key={item.iconicTaxonId}
      >
        <Image
          source={item.earned ? badgeImages[item.earnedIconName] : badgeImages.badge_empty}
          style={imageStyles.badgeIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderNextFiveBadges = ( start, finish ) => (
    <FlatList
      contentContainerStyle={viewStyles.center}
      numColumns={3}
      data={speciesBadges.slice( start, finish )}
      keyExtractor={( item, index ) => index.toString( )}
      renderItem={renderSpeciesBadge}
    />
  );

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
      {speciesBadges.length > 0 && renderNextFiveBadges( 0, 5 )}
      {speciesBadges.length > 0 && renderNextFiveBadges( 5, 10 )}
      <View style={viewStyles.margin} />
    </>
  );
};

export default SpeciesBadges;
