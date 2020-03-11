// @flow

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Platform,
  SectionList,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
// import { NavigationEvents } from "react-navigation";
import Realm from "realm";
import Modal from "react-native-modal";
import { DrawerContentComponentProps } from "react-navigation-drawer";

import i18n from "../../i18n";
import realmConfig from "../../models";
import styles from "../../styles/observations/observations";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCard";
import DeleteModal from "../Modals/DeleteModal";
import { createSectionList, removeFromCollection } from "../../utility/observationHelpers";

const Observations = ( { navigation }: DrawerContentComponentProps ) => {
  const sectionList = useRef( null );
  const [observations, setObservations] = useState( [] );
  const [showModal, setModal] = useState( false );
  const [itemToDelete, setItemToDelete] = useState( null );
  const [itemScrolledId, setItemScrolledId] = useState( null );

  const scrollToTop = () => {
    if ( sectionList && sectionList.current ) {
      sectionList.current.scrollToLocation( {
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 70,
        animated: Platform.OS === "android"
      } );
    }
  };

  const fetchObservations = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const obs = createSectionList( realm );
        setObservations( obs );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  };

  useEffect( () => {
    if ( observations.length === 0 ) {
      fetchObservations();
    }
    console.log( "updating observations" );
    // scrollToTop();
  } );

  const deleteObservation = async ( id: number ) => {
    await removeFromCollection( id );
    fetchObservations();
    // this.resetObservations();
    // this.fetchObservations();
  };

  const openModal = (
    id: number,
    photo: string,
    commonName: string,
    scientificName: string,
    iconicTaxonId: number
  ) => {
    setModal( true );
    setItemToDelete( {
      id,
      photo,
      commonName,
      scientificName,
      iconicTaxonId
    } );
  };

  const closeModal = () => {
    setModal( false );
  };

  const toggleSection = ( id ) => {
    const updatedObs = observations;
    const section = updatedObs.find( item => item.id === id );
    console.log( "toggling section", id, section );

    // $FlowFixMe
    if ( section.open === true ) {
      // $FlowFixMe
      section.open = false;
      setObservations( updatedObs );
    } else {
      // $FlowFixMe
      section.open = true;
      setObservations( updatedObs );
    }
  };

  let content;

  if ( observations.length > 0 ) {
    content = (
      <SectionList
        ref={sectionList}
        contentContainerStyle={styles.padding}
        initialNumToRender={6}
        keyExtractor={( item, index ) => item + index}
        renderItem={( { item, section } ) => {
          if ( section.open === true ) {
            return (
              <ObservationCard
                item={item}
                itemScrolledId={itemScrolledId}
                openModal={openModal}
                updateItemScrolledId={setItemScrolledId}
              />
            );
          }
          return null;
        }}
        renderSectionFooter={( {
          section: {
            id,
            data,
            open
          }
        } ) => {
          if ( data.length === 0 && open ) {
            return (
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
                </Text>
              </View>
            );
          }
          return null;
        }}
        renderSectionHeader={( {
          section: {
            id,
            data,
            badgeCount,
            open
          }
        } ) => {
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
                {badgeCount !== -1 ? (
                  <>
                    <View style={styles.marginSmall} />
                    <Image source={badge} style={styles.badgeImage} />
                    <View style={[styles.margin, open && styles.marginOpen]} />
                  </>
                ) : null}
                <View style={[
                  styles.noMargin,
                  badgeCount === -1 && styles.marginBadgeEmpty]}
                />
                <Image source={open ? icons.dropdownOpen : icons.dropdownClosed} />
              </View>
            </TouchableOpacity>
          );
        }}
        sections={observations}
        stickySectionHeadersEnabled={false}
      />
    );
  } else {
    content = <EmptyState screen="observations" />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* <NavigationEvents
        onWillBlur={() => {
          scrollToTop();
          resetObservations();
        }}
        onWillFocus={() => fetchObservations()}
      /> */}
      <GreenHeader header="observations.header" />
      <Modal isVisible={showModal}>
        <DeleteModal
          deleteObservation={deleteObservation}
          itemToDelete={itemToDelete}
          closeModal={closeModal}
        />
      </Modal>
      {content}
    </View>
  );
};

export default Observations;
