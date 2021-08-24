// @flow

import React, { useState, useCallback } from "react";
import { View, Image, TouchableOpacity, LogBox } from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";
import type { Node } from "react";

import i18n from "../../i18n";
import realmConfig from "../../models";
import BadgeModal from "../Modals/BadgeModal";
import badgeImages from "../../assets/badges";
import { viewStyles, imageStyles } from "../../styles/badges/achievements";
import { createBadgeSetList } from "../../utility/badgeHelpers";
import BadgeList from "./BadgeList";
import { LOG } from "../../utility/debugHelpers";

type Props = {
  speciesBadges: Array<{
    iconicTaxonId: number,
    infoText: string,
    earned: boolean,
    earnedIconName: string
  }>
}

const SpeciesBadges = ( { speciesBadges }: Props ): Node => {
  // FlatList renders twice, which throws the unique key error
  // FlatList within a ScrollView also isn't ideal, but it's fine here
  // since these are tiny lists, not long lists that need a ton of performance
  // and using Views instead of FlatList here caused the UI for the entire app
  // to stutter in Android
  LogBox.ignoreLogs( ["Each child in a list", "VirtualizedLists should never be nested"] );
  const [showModal, setModal] = useState( false );
  const [iconicSpeciesCount, setIconicSpeciesCount] = useState( 0 );
  const [iconicTaxonBadges, setIconicTaxonBadges] = useState( [] );

  LOG.info( speciesBadges.length, ": number of species badges" );

  const sets = createBadgeSetList( speciesBadges );

  LOG.info( sets, ": sets of species badges" );

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
    LOG.info( item.earned, item.earnedIconName, item.iconicTaxonId, item.infoText, ": species badge item" );
    let imageSrc = badgeImages.badge_empty;

    if ( item && item.earned && item.earnedIconName ) {
      imageSrc = badgeImages[item.earnedIconName];
    }
    return (
      <TouchableOpacity
        onPress={() => fetchBadgesByIconicId( item.iconicTaxonId )}
        accessible
        accessibilityLabel={i18n.t( item.infoText )}
        key={item.iconicTaxonId}
      >
        <Image
          source={imageSrc}
          style={imageStyles.badgeIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderBadgeGrid = ( ) => sets.map( ( set, index ) => (
    <BadgeList
      data={speciesBadges.slice( sets[index], sets[index + 1] )}
      renderItem={renderSpeciesBadge}
    />
  ) );

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
