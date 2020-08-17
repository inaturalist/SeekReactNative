// @flow

import React, { useState, useRef } from "react";
import {
  View,
  SectionList,
  Text
} from "react-native";
import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCard";
import SectionHeader from "./SectionHeader";
import SearchBar from "./SearchBar";

type Props = {
  fetchFilteredObservations: Function,
  observations: Array<Object>,
  searchText: string,
  openModal: Function,
  updateObs: Function
}

const ObsList = ( {
  fetchFilteredObservations,
  observations,
  searchText,
  openModal,
  updateObs
}: Props ) => {
  const sectionList = useRef( null );
  const [hiddenSections, setHiddenSections] = useState( [] ); // eslint-disable-line no-unused-vars
  const [itemScrolledId, setItemScrolledId] = useState( null );

  const updateItemScrolledId = ( id ) => setItemScrolledId( id );

  const toggleSection = ( id ) => {
    const updatedObs = observations.slice(); // this is needed to force a refresh of SectionList
    const idToHide = hiddenSections.indexOf( id );

    if ( idToHide !== -1 ) {
      hiddenSections.splice( idToHide, 1 );
    } else {
      hiddenSections.push( id );
    }

    updateObs( updatedObs );
  };

  const sectionIsHidden = ( id ) => hiddenSections.includes( id );

  const renderItem = ( item, section ) => {
    if ( sectionIsHidden( section.id ) ) {
      return null;
    }
    return (
      <ObservationCard
        item={item}
        itemScrolledId={itemScrolledId}
        openModal={openModal}
        updateItemScrolledId={updateItemScrolledId}
      />
    );
  };

  const renderSectionFooter = ( section ) => {
    const { id, data } = section;
    if ( sectionIsHidden( id ) && data.length === 0 ) {
      return <View style={styles.sectionSeparator} />;
    }

    if ( data.length === 0 ) {
      return (
        <Text style={[styles.text, styles.sectionSeparator]}>
          {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
        </Text>
      );
    }

    return null;
  };

  const renderSectionSeparator = () => <View style={styles.sectionWithDataSeparator} />;

  const renderItemSeparator = ( section ) => {
    if ( !sectionIsHidden( section.id ) ) {
      return <View style={styles.itemSeparator} />;
    }
    return null;
  };

  return (
    <SectionList
      ref={sectionList}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.flexGrow}
      sections={observations}
      initialNumToRender={5}
      stickySectionHeadersEnabled={false}
      keyExtractor={( item, index ) => item + index}
      ListHeaderComponent={() => <SearchBar fetchFilteredObservations={fetchFilteredObservations} searchText={searchText} />}
      renderSectionHeader={( { section } ) => (
        <SectionHeader
          section={section}
          open={!sectionIsHidden( section.id )}
          toggleSection={toggleSection}
        />
      )}
      renderItem={( { item, section } ) => renderItem( item, section )}
      ItemSeparatorComponent={( { section } ) => renderItemSeparator( section )}
      renderSectionFooter={( { section } ) => renderSectionFooter( section )}
      SectionSeparatorComponent={() => renderSectionSeparator()}
      ListFooterComponent={() => <View style={styles.padding} />}
      ListEmptyComponent={() => <EmptyState />}
    />
  );
};

export default ObsList;
