import Realm from "realm";
import inatjs from "inaturalistjs";

import realmConfig from "../models/index";
import { getPreviousAndNextMonth } from "../utility/helpers";

const SET_TAXA = "seek/species_nearby/SET_TAXA";
const SET_LOADING = "seek/species_nearby/SET_LOADING";

export default function reducer( state = {
  taxa: [],
  latitude: 0.0,
  longitude: 0.0,
  loading: false
}, action ) {
  const newState = Object.assign( { }, state );
  switch ( action.type ) {
    case SET_TAXA:
      newState.taxa = action.taxa;
      newState.loading = false;
      break;
    case SET_LOADING:
      newState.loading = action.loading;
      break;
    default:
      // nothing
  }
  return newState;
}

export const setTaxa = taxa => ( {
  type: SET_TAXA,
  taxa
} );

export const setLoading = loading => ( {
  type: SET_LOADING,
  loading
} );

export const fetchTaxa = ( lat, lng ) => {
  console.log( "fetch taxa being called" );
  return ( dispatch ) => {
    dispatch( setLoading( true ) );

    const params = {
      verifiable: true,
      photos: true,
      per_page: 9,
      lat,
      lng,
      radius: 50,
      threatened: false,
      oauth_application_id: "2,3",
      hrank: "species",
      include_only_vision_taxa: true,
      not_in_list_id: 945029,
      month: getPreviousAndNextMonth()
    };

    // if ( taxonIds[taxaType] ) {
    //   params.taxon_id = taxonIds[taxaType];
    // }

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const existingTaxonIds = realm.objects( "TaxonRealm" ).map( t => t.id );
        params.without_taxon_id = existingTaxonIds.join( "," );
        inatjs.observations.speciesCounts( params ).then( ( response ) => {
          const taxa = response.results.map( r => r.taxon );
          dispatch( setTaxa( taxa ) );
        } ).catch( () => {
          // error: `Unable to load challenges: ${err.message}`
        } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
        inatjs.observations.speciesCounts( params ).then( ( response ) => {
          const taxa = response.results.map( r => r.taxon );
          dispatch( setTaxa( taxa ) );
        } ).catch( () => {
          // error: `Unable to load challenges: ${err.message}`
        } );
      } );
  };
};
