import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/species/speciesStats";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  readonly loading: boolean;
  readonly stats: {
    endangered: boolean;
  };
  readonly region: {
    latitude: number;
    longitude: number;
  };
  readonly id: number;
  readonly seenDate: string | null;
}

const SpeciesStats = ( { loading, stats, region, id, seenDate }: Props ) => {
  const [tagsToShow, setTagsToShow] = useState<string[]>( [] );

  const showAlert = ( type: string ) => {
    const title = `species_detail.${type}`;
    Alert.alert(
      i18n.t( title ),
      i18n.t( `species_detail.${type}_about` ),
      [{ text: i18n.t( "species_detail.got_it" ) }]
    );
  };

  useEffect( () => {
    let isFocused = true;

    const checkStats = () => {
      const params = {
        per_page: 1,
        lat: region.latitude,
        lng: region.longitude,
        radius: 50,
        taxon_id: id
      };

      inatjs.observations.search( params ).then( ( { results } ) => {
        if ( results.length > 0 ) {
          const taxonStats = results[0].taxon;
          if ( taxonStats ) {
            const { threatened, endemic, introduced, native } = taxonStats;

            const tags = {
              threatened,
              endemic,
              introduced,
              native,
              endangered: stats.endangered
            };

            const show = Object.keys( tags ).filter( t => tags[t] === true );

            if ( isFocused ) {
              setTagsToShow( show );
            }
          }
        }
      } ).catch( ( err: Error ) => console.log( err, "err fetching native threatened etc" ) );
    };

    if ( region.latitude && id && stats ) {
      checkStats();
    }
    return () => { isFocused = false; };
  }, [region, id, stats] );

  if ( loading || tagsToShow.length === 0 ) {
    return <View style={viewStyles.noTags} />;
  } else {
    return (
      <View style={[viewStyles.tagContainer, seenDate ? viewStyles.tagAndSeenDate : {}]}>
        {tagsToShow.map( tag => (
          <TouchableOpacity
            onPress={() => showAlert( tag )}
            style={viewStyles.tag}
            key={tag}
          >
            <StyledText style={[baseTextStyles.button, textStyles.tagText]}>{i18n.t( `species_detail.${tag}` ).toLocaleUpperCase()}</StyledText>
          </TouchableOpacity>
        ) )}
      </View>
    );
  }
};

export default SpeciesStats;
