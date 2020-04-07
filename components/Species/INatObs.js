// @flow
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import inatjs from "inaturalistjs";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/species/iNatObs";
import logos from "../../assets/logos";
import GreenText from "../UIComponents/GreenText";
import createUserAgent from "../../utility/userAgent";
import { localizeNumber } from "../../utility/helpers";

type Props = {
  +id: ?number,
  +region: Object,
  +timesSeen: ?number,
  +error: ?string
};

const INatObs = ( {
  id,
  region,
  timesSeen,
  error
}: Props ) => {
  const navigation = useNavigation();
  const [nearbySpeciesCount, setNearbySpeciesCount] = useState( null );

  const fetchNearbySpeciesCount = useCallback( () => {
    const params = {
      lat: region.latitude,
      lng: region.longitude,
      radius: 50,
      taxon_id: id
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.speciesCounts( params, options ).then( ( { results } ) => {
      setNearbySpeciesCount( results.length > 0 ? results[0].count : 0 );
    } ).catch( ( err ) => {
      console.log( err, "error fetching species count" );
    } );
  }, [region, id] );

  useEffect( () => {
    fetchNearbySpeciesCount();
  }, [region, fetchNearbySpeciesCount] );

  return (
    <View>
      <View style={styles.headerMargins}>
        <GreenText text="species_detail.inat_obs" />
      </View>
      <View style={[styles.center, styles.row]}>
        <TouchableOpacity
          onPress={() => navigation.navigate( "iNatStats" )}
        >
          <Image source={logos.bird} style={styles.bird} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {error !== "location" && (
            <>
              <Text style={styles.secondHeaderText}>
                {i18n.t( "species_detail.near" )}
              </Text>
              <Text style={styles.number}>
                {localizeNumber( nearbySpeciesCount )}
              </Text>
            </>
          )}
          <Text style={[styles.secondHeaderText, !error && styles.margin]}>
            {i18n.t( "species_detail.worldwide" )}
          </Text>
          <Text style={styles.number}>
            {localizeNumber( timesSeen )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default INatObs;
