// @flow

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SectionList,
  Text,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Realm from "realm";
import Modal from "react-native-modal";
import { useSafeArea } from "react-native-safe-area-context";

import realmConfig from "../../models";
import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCard";
import { createSectionList, removeFromCollection } from "../../utility/observationHelpers";
import ObservationListHeader from "./ObservationListHeader";
import DeleteModal from "../Modals/DeleteModal";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";
import BottomSpacer from "../UIComponents/BottomSpacer";
import GreenHeader from "../UIComponents/GreenHeader";

const ObservationList = () => {
  const insets = useSafeArea();
  const sectionList = useRef( null );
  const navigation = useNavigation();
  const [itemScrolledId, setItemScrolledId] = useState( null );
  const [observations, setObservations] = useState( [] );
  const [showModal, setModal] = useState( false );
  const [itemToDelete, setItemToDelete] = useState( null );
  const [loading, setLoading] = useState( true );

  const openModal = ( id, photo, commonName, scientificName, iconicTaxonId ) => {
    setItemToDelete( {
      id,
      photo,
      commonName,
      scientificName,
      iconicTaxonId
    } );
    setModal( true );
  };
  const closeModal = () => setModal( false );

  const useScrollToTop = () => {
    const scrollToTop = () => {
      if ( sectionList && sectionList.current !== null ) {
        sectionList.current.scrollToLocation( {
          sectionIndex: 0,
          itemIndex: 0,
          viewOffset: 70,
          animated: Platform.OS === "android"
        } );
      }
    };

    useEffect( () => {
      navigation.addListener( "focus", () => {
        scrollToTop();
      } );
    } );
  };

  useScrollToTop();

  const updateItemScrolledId = ( id ) => setItemScrolledId( id );

  const toggleSection = ( id ) => {
    const updatedObs = observations.slice();
    const section = updatedObs.find( item => item.id === id );

    // $FlowFixMe
    if ( section.open === true ) {
      // $FlowFixMe
      section.open = false;
    } else {
      // $FlowFixMe
      section.open = true;
    }

    setObservations( updatedObs );
  };

  const fetchObservations = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const obs = createSectionList( realm );
        setObservations( obs );
        setLoading( false );
      } ).catch( () => {
        // console.log( "Err: ", err )
      } );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      setLoading( true );
      fetchObservations();
    } );
  } );

  const deleteObservation = async ( id ) => {
    await removeFromCollection( id );
    setObservations( [] );
    fetchObservations();
  };

  let content;

  if ( loading ) {
    content = (
      <View style={styles.loadingWheel}>
        <LoadingWheel color={colors.darkGray} />
      </View>
    );
  } else if ( observations.length > 0 ) {
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
                updateItemScrolledId={updateItemScrolledId}
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
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
                  </Text>
                </View>
                {id === 1 && <BottomSpacer />}
              </>
            );
          }
          return null;
        }}
        renderSectionHeader={( { section } ) => (
          <ObservationListHeader section={section} toggleSection={toggleSection} />
        )}
        sections={observations}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => <EmptyState screen="observations" />}
      />
    );
  // } else {
  //   content = <EmptyState screen="observations" />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenHeader
        header="observations.header"
        route="Home"
      />
      <Modal isVisible={showModal}>
        <DeleteModal
          deleteObservation={deleteObservation}
          itemToDelete={itemToDelete}
          closeModal={closeModal}
        />
      </Modal>
      <View style={styles.whiteContainer}>
        {content}
      </View>
    </View>
  );
};

export default ObservationList;
