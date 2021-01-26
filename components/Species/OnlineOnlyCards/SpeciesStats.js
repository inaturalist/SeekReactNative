// @flow
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../../i18n";
import styles from "../../../styles/species/speciesStats";
import createUserAgent from "../../../utility/userAgent";

type Props = {
  +stats: Object,
  +region: Object,
  +id: number,
  +seenDate: ?string
};

const SpeciesStats = ( { stats, region, id, seenDate }: Props ) => {
  const [tagsToShow, setTagsToShow] = useState( [] );

  const showAlert = ( type ) => {
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

      const options = { user_agent: createUserAgent() };

      inatjs.observations.search( params, options ).then( ( { results } ) => {
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
      } ).catch( ( err ) => console.log( err, "err fetching native threatened etc" ) );
    };

    if ( region.latitude && id && stats ) {
      checkStats();
    }
    return () => { isFocused = false; };
  }, [region, id, stats] );

  if ( tagsToShow.length === 0 ) {
    return <View style={styles.noTags} />;
  } else {
    return (
      <View style={[styles.tagContainer, seenDate && styles.tagAndSeenDate]}>
        {tagsToShow.map( tag => (
          <TouchableOpacity
            onPress={() => showAlert( tag )}
            style={styles.tag}
            key={tag}
          >
            <Text style={styles.tagText}>{i18n.t( `species_detail.${tag}` ).toLocaleUpperCase()}</Text>
          </TouchableOpacity>
        ) )}
      </View>
    );
  }
};

export default SpeciesStats;
