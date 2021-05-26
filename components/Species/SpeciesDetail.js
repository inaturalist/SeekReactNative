// @flow

import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback
} from "react";
import { ScrollView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import inatjs from "inaturalistjs";
import Realm from "realm";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import i18n from "../../i18n";
import realmConfig from "../../models/index";
import { viewStyles } from "../../styles/species/species";
import { getSpeciesId, checkForInternet, handleServerError } from "../../utility/helpers";
import OnlineSpeciesContainer from "./OnlineSpeciesContainer";
import createUserAgent from "../../utility/userAgent";
import SpeciesHeader from "./SpeciesHeader";
import OfflineSpeciesContainer from "./OfflineSpeciesContainer";

const SpeciesDetail = ( ): Node => {
  const scrollView = useRef( null );
  const navigation = useNavigation( );
  const { params } = useRoute( );

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "ERROR":
        return { ...state, error: "internet" };
      case "NO_ERROR":
        return { ...state, error: null };
      case "SET_ID":
        return { ...state, id: action.id };
      case "SET_TAXON_DETAILS":
        return {
          ...state,
          taxon: action.taxon,
          photos: action.photos,
          details: action.details
        };
      case "TAXA_SEEN":
        return {
          ...state,
          seenTaxa: action.seen,
          taxon: {
            scientificName: action.seen.taxon.name,
            iconicTaxonId: action.seen.taxon.iconicTaxonId
          }
        };
      case "TAXA_NOT_SEEN":
        return { ...state, seenTaxa: null };
      case "RESET_SCREEN":
        return {
          id: null,
          photos: [],
          taxon: {},
          details: {},
          error: null,
          seenTaxa: null,
          selectedText: false
        };
      case "CLEAR_SELECTION":
        return {
          ...state,
          selectedText: false
        };
      case "HIGHLIGHT_SELECTION":
        return {
          ...state,
          selectedText: true
        };
      default:
        throw new Error( );
    }
  }, {
    id: null,
    photos: [],
    taxon: {},
    details: {},
    error: null,
    seenTaxa: null,
    selectedText: false
  } );

  const {
    taxon,
    id,
    photos,
    details,
    error,
    seenTaxa,
    selectedText
  } = state;

  const clearSelectedText = ( ) => dispatch( { type:"CLEAR_SELECTION" } );
  const highlightSelectedText = useCallback( ( ) => dispatch( { type: "HIGHLIGHT_SELECTION" } ), [] );

  const setId = useCallback( async ( ) => {
    const i = await getSpeciesId( );
    dispatch( { type: "SET_ID", id: i } );
  }, [] );

  const checkIfSpeciesSeen = useCallback( ( ) => {
    if ( id === null ) {
      return;
    }
    Realm.open( realmConfig ).then( ( realm ) => {
      const observations = realm.objects( "ObservationRealm" );
      const seen = observations.filtered( `taxon.id == ${id}` )[0];

      if ( seen ) {
        dispatch( { type: "TAXA_SEEN", seen } );
      }
    } ).catch( ( e ) => console.log( "[DEBUG] Failed to open realm, error: ", e ) );
  }, [id] );

  const createTaxonomyList = ( ancestors, scientificName ) => {
    const taxonomyList = [];
    const ranks = ["kingdom", "phylum", "class", "order", "family", "genus"];
    ancestors.forEach( ( ancestor ) => {
      if ( ranks.includes( ancestor.rank ) ) {
        taxonomyList.push( ancestor );
      }
    } );

    taxonomyList.push( {
      rank: "species",
      name: scientificName || null
    } );

    return taxonomyList;
  };

  const checkInternetConnection = useCallback( ( ) => {
    checkForInternet( ).then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        dispatch( { type: "ERROR" } );
      } else {
        dispatch( { type: "NO_ERROR" } );
      }
    } );
  }, [] );

  const fetchTaxonDetails = useCallback( ( ) => {
    const localeParams = { locale: i18n.currentLocale( ) };
    const options = { user_agent: createUserAgent( ) };

    inatjs.taxa.fetch( id, localeParams, options ).then( ( response ) => {
      const taxa = response.results[0];
      const scientificName = taxa.name;
      const conservationStatus = taxa.taxon_photos[0].taxon.conservation_status;

      const photosWithLicense = taxa.taxon_photos.map( ( p ) => p.photo ).filter( p => p.license_code );

      dispatch( {
        type: "SET_TAXON_DETAILS",
        taxon: {
          scientificName,
          iconicTaxonId: taxa.iconic_taxon_id
        },
        photos: photosWithLicense,
        details: {
          wikiUrl: taxa.wikipedia_url,
          about: taxa.wikipedia_summary && taxa.wikipedia_summary,
          timesSeen: taxa.observations_count,
          ancestors: createTaxonomyList( taxa.ancestors, scientificName ),
          stats: {
            endangered: ( conservationStatus && conservationStatus.status_name === "endangered" ) || false
          }
        }
      } );
    } ).catch( ( err ) => {
      const errorType = handleServerError( err );
      checkInternetConnection( );
     } );
  }, [id, checkInternetConnection] );

  const fetchDetails = useCallback( ( ) => {
    fetchTaxonDetails( );
    checkIfSpeciesSeen( );
  }, [fetchTaxonDetails, checkIfSpeciesSeen] );

  const fetchiNatData = useCallback( ( ) => {
    setId( );

    // reset seenTaxa if refreshing screen from Similar Species
    if ( seenTaxa ) {
      dispatch( { type: "TAXA_NOT_SEEN" } );
    }

    const scrollToTop = ( ) => {
      if ( scrollView.current ) {
        scrollView.current.scrollTo( {
          x: 0, y: 0, animated: Platform.OS === "android"
        } );
      }
    };

    if ( Platform.OS === "android" ) {
      setTimeout( ( ) => scrollToTop( ), 1 );
      // hacky but this fixes scroll not getting to top of screen
    } else {
      scrollToTop( );
    }
  }, [setId, seenTaxa] );

  useEffect( ( ) => {
    let isCurrent = true;
    if ( id !== null && isCurrent ) {
      fetchDetails( );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [id, fetchDetails] );

  useEffect( ( ) => {
    let isCurrent = true;
    if ( error === "internet" && isCurrent ) {
      // only fetch the data needed to fill in the rest of the screen
      fetchDetails( );
    }
    return ( ) => {
      isCurrent = false;
    };
  }, [error, fetchDetails] );

  useEffect( ( ) => {
    // would be nice to stop refetch when a user goes to range map and back
    // and also wikipedia and back or iNat obs and back
    navigation.addListener( "focus", ( ) => {
      dispatch( { type: "RESET_SCREEN" } );
      fetchiNatData( );
    } );
  }, [navigation, fetchiNatData] );

  if ( !id ) {
    return null;
  }

  const predictions = params ? params.image : null;
  console.log( params, "params" );

  return (
    <SafeAreaView style={viewStyles.greenBanner} edges={["top"]}>
      <ScrollView
        ref={scrollView}
        contentContainerStyle={viewStyles.background}
        onScrollBeginDrag={clearSelectedText}
      >
        <SpeciesHeader
          id={id}
          taxon={taxon}
          photos={photos}
          selectedText={selectedText}
          highlightSelectedText={highlightSelectedText}
        />
        {error && (
          <OfflineSpeciesContainer
            checkForInternet={checkInternetConnection}
            details={details}
            id={id}
            predictions={predictions}
          />
        )}
        {( Object.keys( taxon ).length > 0 && !error ) && (
          <OnlineSpeciesContainer
            details={details}
            scientificName={taxon.scientificName}
            id={id}
            predictions={predictions}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpeciesDetail;
