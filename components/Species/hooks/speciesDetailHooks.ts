import { useState, useEffect } from "react";
import Realm from "realm";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import realmConfig from "../../../models";

const useSpeciesSeen = ( id: number ) => {
  const [seenTaxa, setSeenTaxa] = useState<any>( );

  useEffect( ( ) => {
    const fetchSpeciesSeen = async ( ) => {
      if ( id === null ) { return; }
      const realm = await Realm.open( realmConfig );
      const observations = realm.objects( "ObservationRealm" );
      const seen = observations.filtered( `taxon.id == ${id}` )[0];

      if ( seen ) {
        setSeenTaxa( seen );
      }
    };

    fetchSpeciesSeen( );
  }, [id] );

  return seenTaxa;
};

const createTaxonomyList = ( ancestors: any[], scientificName: string ) => {
  const taxonomyList: any[] = [];
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

const useTaxonDetails = ( id: number ) => {
  const [taxonDetails, setTaxonDetails] = useState<any>( null );

  useEffect( ( ) => {
    const fetchTaxonDetails = async ( ) => {
      const localeParams = { locale: i18n.locale };

      try {
        const response = await inatjs.taxa.fetch( id, localeParams );
        const taxa = response.results[0];
        const scientificName = taxa.name;
        const conservationStatus = taxa.taxon_photos[0]?.taxon.conservation_status;

        const photosWithLicense = taxa.taxon_photos.map( ( p ) => p.photo ).filter( p => p.license_code );

        setTaxonDetails( {
          taxon: {
            id: taxa.id,
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
      } catch ( e ) {
        console.log( e, "couldn't fetch taxon details" );
      }
    };
    fetchTaxonDetails( );
  }, [id] );

  return taxonDetails;
};

export {
  useSpeciesSeen,
  useTaxonDetails
};
