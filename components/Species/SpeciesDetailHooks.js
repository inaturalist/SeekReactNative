// @flow

import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback
} from "react";
import { ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import inatjs from "inaturalistjs";
import Realm from "realm";
import { useSafeArea } from "react-native-safe-area-context";

import i18n from "../../i18n";
import realmConfig from "../../models/index";
import styles from "../../styles/species/species";
import SpeciesError from "./SpeciesError";
import Spacer from "../UIComponents/TopSpacer";
import { getSpeciesId, getRoute, checkForInternet } from "../../utility/helpers";
import NoInternetError from "./OnlineOnlyCards/NoInternetError";
import createUserAgent from "../../utility/userAgent";
import SpeciesHeader from "./SpeciesHeader";

const SpeciesDetail = () => {
  const insets = useSafeArea();
  const scrollView = useRef( null );
  const navigation = useNavigation();

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    console.log( action.type );
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
          wikiUrl: action.wikiUrl,
          about: action.about,
          timesSeen: action.timesSeen,
          ancestors: action.ancestors,
          stats: action.stats
        };
      case "TAXA_SEEN":
        return {
          ...state,
          seenTaxa: action.seen,
          taxon: { // is this correct?
            scientificName: action.seen.taxon.name,
            iconicTaxonId: action.seen.taxon.iconicTaxonId
          }
        };
      case "RESET_SCREEN":
        return {
          ...state,
          id: null,
          photos: [],
          taxon: {},
          about: null,
          timesSeen: null,
          error: null,
          stats: {},
          ancestors: [],
          wikiUrl: null
        };
      default:
        throw new Error();
    }
  }, {
    id: null,
    photos: [],
    taxon: {
      scientificName: null,
      iconicTaxonId: null
    },
    about: null,
    timesSeen: null,
    error: null,
    seenTaxa: null,
    stats: {},
    ancestors: [],
    wikiUrl: null
  } );

  const {
    about,
    taxon,
    id,
    photos,
    seenDate,
    timesSeen,
    error,
    seenTaxa,
    ancestors,
    stats,
    wikiUrl
  } = state;

  const setupScreen = async () => {
    const i = await getSpeciesId();
    dispatch( { type: "SET_ID", id: i } );
  };

  const checkIfSpeciesSeen = useCallback( () => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const observations = realm.objects( "ObservationRealm" );
      const seen = observations.filtered( `taxon.id == ${id}` )[0];

      if ( seen ) {
        dispatch( { type: "TAXA_SEEN", seen } );
      }
    } ).catch( ( e ) => console.log( "[DEBUG] Failed to open realm, error: ", e ) );
  }, [id] );

  const checkInternetConnection = () => {
    checkForInternet().then( ( internet ) => {
      if ( internet === "none" || internet === "unknown" ) {
        dispatch( { type: "INTERNET_ERROR" } );
      } else {
        dispatch( { type: "NO_ERROR" } );
      }
    } );
  };

  const fetchTaxonDetails = useCallback( () => {
    const params = { locale: i18n.currentLocale() };
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( id, params, options ).then( ( response ) => {
      const taxa = response.results[0];
      const commonName = taxa.preferred_common_name;
      const scientificName = taxa.name;
      const conservationStatus = taxa.taxon_photos[0].taxon.conservation_status;
      const ancestors = [];
      const ranks = ["kingdom", "phylum", "class", "order", "family", "genus"];
      taxa.ancestors.forEach( ( ancestor ) => {
        if ( ranks.includes( ancestor.rank ) ) {
          ancestors.push( ancestor );
        }
      } );

      ancestors.push( {
        rank: "species",
        name: scientificName || null,
        preferred_common_name: commonName || null
      } );

      stats.endangered = ( conservationStatus && conservationStatus.status_name === "endangered" ) || false;

      dispatch( {
        type: "SET_TAXON_DETAILS",
        taxon: {
          scientificName,
          iconicTaxonId: taxa.iconic_taxon_id
        },
        photos: taxa.taxon_photos.map( ( p ) => p.photo ),
        wikiUrl: taxa.wikipedia_url,
        about: taxa.wikipedia_summary
          ? i18n.t( "species_detail.wikipedia", {
            about: taxa.wikipedia_summary.replace( /<[^>]+>/g, "" ).replace( "&amp", "&" )
          } )
          : null,
        timesSeen: taxa.observations_count,
        ancestors,
        stats
      } );
    } ).catch( () => checkInternetConnection() );
  }, [id, stats] );

  const scrollToTop = () => {
    if ( scrollView.current ) {
      scrollView.current.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  };

  const fetchiNatData = useCallback( () => {
    setupScreen();

    if ( Platform.OS === "android" ) {
      setTimeout( () => scrollToTop(), 1 );
      // hacky but this fixes scroll not getting to top of screen
    } else {
      scrollToTop();
    }
  }, [] );

  useEffect( () => {
    if ( id !== null ) {
      checkIfSpeciesSeen();
      fetchTaxonDetails();
    }
  }, [id, checkIfSpeciesSeen, fetchTaxonDetails] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      fetchiNatData();
    } );
    navigation.addListener( "blur", () => {
      dispatch( { type: "RESET_SCREEN" } );
    } );
  }, [navigation, fetchiNatData] );

  // console.log( "state update" );

  return (
    <ScrollView
      ref={scrollView}
      contentContainerStyle={[
        styles.footerMargin,
        styles.background,
        styles.greenBanner,
        { paddingTop: insets.top }
      ]}
    >
      <Spacer />
      <SpeciesHeader
        id={id}
        taxon={taxon}
        seenTaxa={seenTaxa}
        photos={photos}
      />
      {error === "internet"
        ? <SpeciesError seenDate={seenDate} updateScreen={updateScreen} />
        : (
          <NoInternetError
            about={about}
            ancestors={ancestors}
            error={error}
            fetchiNatData={fetchiNatData}
            id={id}
            seenTaxa={seenTaxa}
            stats={stats}
            timesSeen={timesSeen}
            wikiUrl={wikiUrl}
          />
        )}
    </ScrollView>
  );
};

export default SpeciesDetail;