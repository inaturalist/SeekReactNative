import React, { useState, useEffect, useCallback } from "react";
import { View, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Realm from "realm";
import Modal from "react-native-modal";

import { getRoute, StoredRoutes } from "../../utility/helpers";
import { getTaxonCommonName } from "../../utility/commonNamesHelpers";
import realmConfig from "../../models";
import styles from "../../styles/observations/observations";
import { createSectionList, removeFromCollection } from "../../utility/observationHelpers";
import DeleteModal from "../Modals/DeleteModal";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";
import ObsList from "./ObsList";
import ViewWithHeader from "../UIComponents/Screens/ViewWithHeader";
import { resetRouter } from "../../utility/navigationHelpers";

interface Observation {
  id: number;
  data: any[];
}

interface Taxon {
  id: number;
  iconicTaxonId?: number | undefined;
  preferredCommonName?: string | undefined;
  name: string;
  defaultPhoto?: {
    backupUri?: string;
    mediumUrl?: string;
    lastUpdated?: Date;
  };
}

interface Photo {
  uri: string;
}

interface ItemToDelete extends Taxon {
  photo: Photo;
}

const Observations = ( ) => {
  const navigation = useNavigation( );
  const [observations, setObservations] = useState<Observation[]>( [] );
  const [showModal, setModal] = useState<boolean>( false );
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>( null );
  const [loading, setLoading] = useState<boolean>( true );
  const [searchText, setSearchText] = useState<string>( "" );

  useFocusEffect(
    useCallback( ( ) => {
      const onBackPress = ( ) => {
        resetRouter( navigation );
        return true; // following custom Android back behavior template in React Navigation
      };

      const backHandler = BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => backHandler.remove();
    }, [navigation] )
  );

  const openModal = useCallback( ( photo: Photo, taxon: Taxon ) => {
    const { id, preferredCommonName, name, iconicTaxonId } = taxon;
    setItemToDelete( {
      id,
      photo,
      preferredCommonName,
      name,
      iconicTaxonId,
    } );
    setModal( true );
  }, [] );

  const closeModal = ( ) => setModal( false );

  const setupObsList = ( species: any, hideSections: boolean = false ) => {
    const obs = createSectionList( species, hideSections );
    setObservations( obs );
    setLoading( false );
  };

  const fetchCommonNames = ( realm: Realm, species: { taxon: { id: number  } }[] ) => {
    const commonNames: Promise<void>[] = [];

    species.forEach( ( { taxon } ) => {
      if ( !taxon ) {
        return;
      }
      const { id } = taxon;
      commonNames.push(
        getTaxonCommonName( id ).then( ( taxonName ) => {
          realm.write( ( ) => {
            taxon.preferredCommonName = taxonName;
          } );
        } )
      );
    } );

    // wait until all commonNames are fetched before setting up obsList
    Promise.all( commonNames ).then( ( ) => {
      setupObsList( species );
    } );
  };

  const fetchObservations = ( ) => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const species = realm.objects( "ObservationRealm" );

      if ( species.length === 0 ) {
        setLoading( false );
      } else {
        fetchCommonNames( realm, species );
      }
    } ).catch( ( ) => {
      // console.log( "Err: ", err )
    } );
  };

  const resetObservations = useCallback( ( ) => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const species = realm.objects( "ObservationRealm" );
      setupObsList( species );
    } ).catch( ( ) => {
        // console.log( "Err: ", err )
    } );
  }, [] );

  const fetchFilteredObservations = useCallback( ( text: string ) => {
    setSearchText( text );

    // otherwise hard to use search in languages with characters
    if ( text.length >= 1 ) {
      Realm.open( realmConfig ).then( ( realm ) => {
        const species = realm.objects( "ObservationRealm" ).filtered( `taxon.name CONTAINS[c] '${text}' OR taxon.preferredCommonName CONTAINS[c] '${text}'` );
        setupObsList( species, true );
      } ).catch( ( ) => {
        // console.log( "Err: ", err )
      } );
    } else {
      resetObservations( );
    }
  }, [resetObservations] );

  const fetchRoute = async ( ) => {
    const routeName = await getRoute( );
    // don't fetch if user is toggling back and forth from SpeciesDetail screens
    if ( routeName !== StoredRoutes.Observations ) {
      setSearchText( "" );
      setLoading( true );
      fetchObservations( );
    }
  };

  useEffect( ( ) => {
    const unsubscribe = navigation.addListener( "focus", ( ) => {
      fetchRoute( );
    } );

    return unsubscribe;
  } );

  const deleteObservation = async ( id: number ) => {
    await removeFromCollection( id );
    setObservations( [] );
    fetchObservations( );
  };

  const clearText = useCallback( ( ) => {
    setSearchText( "" );
    resetObservations( );
  }, [resetObservations] );

  const updateObs = useCallback( ( obs: Observation[] ) => setObservations( obs ), [] );

  return (
    <ViewWithHeader header="observations.header">
      <Modal
        isVisible={showModal}
        useNativeDriverForBackdrop
        useNativeDriver
        // the following two lines prevent flickering
        // while modal is closing
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
      >
        <DeleteModal
          deleteObservation={deleteObservation}
          itemToDelete={itemToDelete}
          closeModal={closeModal}
        />
      </Modal>
      <View style={styles.whiteContainer}>
        {loading
          ? <LoadingWheel color={colors.seekForestGreen} />
          : (
            <ObsList
              fetchFilteredObservations={fetchFilteredObservations}
              observations={observations}
              searchText={searchText}
              clearText={clearText}
              openModal={openModal}
              updateObs={updateObs}
            />
          )}
      </View>
    </ViewWithHeader>
  );
};

export default Observations;
