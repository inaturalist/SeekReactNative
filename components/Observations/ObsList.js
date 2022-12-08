// @flow

import React, { useState, useRef, useMemo } from "react";
import { View, Keyboard } from "react-native";
import { FlashList } from "@shopify/flash-list";
import type { Node } from "react";

import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCard";
import SectionHeader from "./SectionHeader";
import SearchBar from "./SearchBar";
import SearchEmpty from "./SearchEmpty";
import StyledText from "../UIComponents/StyledText";

type Props = {
  fetchFilteredObservations: Function,
  observations: Array<Object>,
  searchText: string,
  openModal: Function,
  updateObs: Function,
  clearText: Function
}

const ObsList = ( {
  fetchFilteredObservations,
  observations,
  searchText,
  openModal,
  updateObs,
  clearText
}: Props ): Node => {
  const sectionList = useRef( null );
  const [hiddenSections, setHiddenSections] = useState( [] ); // eslint-disable-line no-unused-vars
  const [itemScrolledId, setItemScrolledId] = useState( null );
  const [hasAnimated, setHasAnimated] = useState( false );

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

  let convertedData = [];
  observations.map( ( section ) => {
    const { data, id } = section;
    // Push header data
    convertedData.push( { type: "header", id, dataLength: data.length } );
    // Push observation data
    if ( !sectionIsHidden( id ) ) {
      const idData = data.map( ( item, index ) => {
        if ( index === 0 && id === 47126 ) {
          item.toAnimate = true;
        }
        item.sectionId = id;
        if ( index === data.length - 1 ) {
          item.isLast = true;
        }
        return item;
      } );
      convertedData = convertedData.concat( ...idData );
    }
    // Push footer data
    if ( sectionIsHidden( id ) && data.length === 0 ) {
      convertedData.push( { type: "footerHidden" } );
    } else if ( data.length === 0 ) {
      convertedData.push( { type: "footerEmpty", id } );
    } else {
      convertedData.push( { type: "footer" } );
    }
  } );

  const renderItem = ( item ) => {
    return (
      <>
        <ObservationCard
          item={item}
          itemScrolledId={itemScrolledId}
          openModal={openModal}
          updateItemScrolledId={updateItemScrolledId}
          toAnimate={item.toAnimate}
          hasAnimated={hasAnimated}
          setHasAnimated={setHasAnimated}
        />
        {item.isLast && (
          <View style={styles.bottomOfSectionPadding} />
        )}
      </>
    );
  };

  const renderListFooter = () => <View style={styles.padding} />;

  const renderListEmpty = () => {
    if ( searchText.length > 0 ) {
      return <SearchEmpty clearText={clearText} />;
    } else {
      return <EmptyState />;
    }
  };

  const renderHeader = useMemo(
    () => (
      <SearchBar
        fetchFilteredObservations={fetchFilteredObservations}
        searchText={searchText}
        clearText={clearText}
      />
    ),
    [fetchFilteredObservations, searchText, clearText]
  );

  const dismissKeyboard = () => Keyboard.dismiss();

  const extractKey = ( item, index ) => item + index;

  return (
    <FlashList
      testID="observations-list"
      ref={sectionList}
      estimatedItemSize={24}
      keyboardDismissMode="on-drag"
      onScroll={dismissKeyboard}
      scrollEventThrottle={1}
      data={convertedData}
      initialNumToRender={5}
      stickySectionHeadersEnabled={false}
      keyExtractor={extractKey}
      ListHeaderComponent={renderHeader}
      renderItem={( { item } ) => {
        if ( item.type === "header" ) {
          // Render header
          return (
            <SectionHeader
              id={item.id}
              dataLength={item.dataLength}
              open={!sectionIsHidden( item.id )}
              toggleSection={toggleSection}
            />
          );
        } if ( item.type === "footerHidden" ) {
          // Render footer for hidden section
          return <View style={styles.hiddenSectionSeparator} />;
        } if ( item.type === "footerEmpty" ) {
          // Render footer for hidden section
          const iconicTaxon = taxaIds[item.id].split( "." )[1];
          return (
            <StyledText style={[styles.text, styles.emptyText]}>
              {i18n.t( `observations.not_seen_${iconicTaxon}` )}
            </StyledText>
          );
        } if ( item.type === "footer" ) {
          // Render footer
          return <View style={styles.sectionWithDataSeparator} />;
        } else {
          // Render item
          return renderItem( item );
        }
      }}
      getItemType={( item ) => {
        if ( item.hasOwnProperty( "type" ) ) {
          return item.type;
        }
        return "observation";
      }}
      ListFooterComponent={renderListFooter}
      ListEmptyComponent={renderListEmpty}
      removeClippedSubviews
    />
  );
};

export default ObsList;
