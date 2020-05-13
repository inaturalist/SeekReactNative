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
  BackHandler
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Realm from "realm";
import Modal from "react-native-modal";
import { useSafeArea } from "react-native-safe-area-context";
import { getRoute } from "../../utility/helpers";
// import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

import realmConfig from "../../models";
import i18n from "../../i18n";
import styles from "../../styles/observations/observations";
import taxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCardHooks";
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
  const [hiddenSections, setHiddenSections] = useState( [] );

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

  // const getItemLayout = sectionListGetItemLayout( {
  //   getItemHeight: () => 80,
    // getSeparatorHeight: () => 18,
    // getSectionHeaderHeight: () => 42,
    // getSectionFooterHeight: () => 69,
  //   listHeaderHeight: 75 // GreenHeader height
  // } );

  // const scrollToLocation = () => {
  //   if ( sectionList.current ) {
  //     console.log( sectionList.current.scrollToLocation, "scroll to location" );
  //     sectionList.current.scrollToLocation( {
  //       animated: Platform.OS === "android",
  //       itemIndex: 0,
  //       sectionIndex: 3,
  //       viewOffset: 60
  //     } );
  //   }
  // };

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
    const updatedObs = observations.slice(); // this is needed to force a refresh of SectionList
    const idToHide = hiddenSections.indexOf( id );

    if ( idToHide !== -1 ) {
      hiddenSections.splice( idToHide, 1 );
    } else {
      hiddenSections.push( id );
    }

    setObservations( updatedObs );
  };

  const setEmptyState = () => setLoading( false );

  const fetchObservations = () => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const species = realm.objects( "ObservationRealm" );
      if ( species.length === 0 ) {
        setEmptyState();
      } else {
        const obs = createSectionList( realm, species );
        setObservations( obs );
        setLoading( false );
      }
    } ).catch( () => {
      // console.log( "Err: ", err )
    } );
  };

  const fetchRoute = async () => {
    const routeName = await getRoute();
    // don't fetch if user is toggling back and forth from SpeciesDetail screens
    if ( routeName !== "Observations" ) {
      setLoading( true );
      fetchObservations();
    }
  };

  useEffect( () => {
    const unsub = navigation.addListener( "focus", () => {
      fetchRoute();
    } );

    return unsub;
  } );

  const deleteObservation = async ( id ) => {
    await removeFromCollection( id );
    setObservations( [] );
    fetchObservations();
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenHeader header="observations.header" route="Home" />
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
            // getItemLayout={getItemLayout}
            keyExtractor={( item, index ) => item + index}
            ListHeaderComponent={() => <View style={styles.sectionSeparator} />}
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
        )}
      </View>
    </View>
  );
};

export default ObservationList;
