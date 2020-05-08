// @flow

import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";
import {
  View,
  SectionList,
  Text,
  BackHandler,
  Platform
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Realm from "realm";
import Modal from "react-native-modal";
import { useSafeArea } from "react-native-safe-area-context";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

import realmConfig from "../../models";
import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCard";
import { createSectionList, removeFromCollection } from "../../utility/observationHelpers";
import SectionHeader from "./SectionHeader";
import DeleteModal from "../Modals/DeleteModal";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";
import GreenHeader from "../UIComponents/GreenHeader";

const ObservationList = () => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const sectionList = useRef( null );
  const [itemScrolledId, setItemScrolledId] = useState( null );
  const [observations, setObservations] = useState( [] );
  const [showModal, setModal] = useState( false );
  const [itemToDelete, setItemToDelete] = useState( null );
  const [loading, setLoading] = useState( true );
  const [sections, setSections] = useState( Object.keys( taxaIds ) );

  useFocusEffect(
    useCallback( () => {
      const onBackPress = () => {
        navigation.navigate( "Home" );
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return () => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [navigation] )
  );

  const getItemLayout = sectionListGetItemLayout( {
    getItemHeight: () => 80,
    getSeparatorHeight: () => 18,
    getSectionHeaderHeight: () => 42,
    getSectionFooterHeight: () => 69,
    listHeaderHeight: 75 // GreenHeader height
  } );

  const scrollToLocation = () => {
    if ( sectionList.current ) {
      console.log( sectionList.current.scrollToLocation, "scroll to location" );
      sectionList.current.scrollToLocation( {
        animated: Platform.OS === "android",
        itemIndex: 0,
        sectionIndex: 3,
        viewOffset: 60
      } );
    }
  };

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

  const updateItemScrolledId = ( id ) => setItemScrolledId( id );

  const toggleSection = ( id ) => {
    // scrollToLocation();
    const idToHide = sections.indexOf( id );

    if ( idToHide !== -1 ) {
      sections.splice( idToHide, 1 );
    } else {
      sections.push( id );
    }

    const updatedObs = observations.slice();

    setObservations( updatedObs );
  };

  const fetchObservations = () => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const obs = createSectionList( realm );
      setObservations( obs );
      setLoading( false );
    } ).catch( () => {
      // console.log( "Err: ", err )
    } );
  };

  useEffect( () => {
    const unsub = navigation.addListener( "focus", () => {
      setLoading( true );
      fetchObservations();
    } );

    return unsub;
  } );

  const deleteObservation = async ( id ) => {
    await removeFromCollection( id );
    setObservations( [] );
    fetchObservations();
  };

  const renderItem = ( item, section ) => {
    if ( sections.includes( section.id ) ) {
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
  };

  const renderFooter = ( section ) => {
    const { id, data } = section;
    if ( data.length === 0 && sections.includes( id ) ) {
      return (
        <Text style={styles.text}>
          {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
        </Text>
      );
    }
    return null;
  };

  const renderSectionSeparator = ( section ) => {
    if ( sections.includes( section.id ) ) {
      return <View style={styles.sectionSeparator} />;
    }
    return null;
  };

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
        {loading ? (
          <View style={[styles.center, styles.flexGrow]}>
            <LoadingWheel color={colors.darkGray} />
          </View>
        ) : (
          <SectionList
            ref={sectionList}
            contentContainerStyle={styles.flexGrow}
            sections={observations}
            initialNumToRender={5}
            stickySectionHeadersEnabled={false}
            getItemLayout={getItemLayout}
            keyExtractor={( item, index ) => item + index}
            ListHeaderComponent={() => <View style={styles.top} />}
            renderSectionHeader={( { section } ) => (
              <SectionHeader
                section={section}
                sections={sections}
                toggleSection={toggleSection}
              />
            )}
            renderItem={( { item, section } ) => renderItem( item, section )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderSectionFooter={( { section } ) => renderFooter( section )}
            SectionSeparatorComponent={( { section } ) => renderSectionSeparator( section )}
            ListFooterComponent={() => <View style={styles.padding} />}
            ListEmptyComponent={() => <EmptyState />}
          />
        )}
      </View>
    </View>
  );
};

export default ObservationList;
