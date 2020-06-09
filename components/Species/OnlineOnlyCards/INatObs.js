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

import i18n from "../../../i18n";
import styles from "../../../styles/species/iNatObs";
import logos from "../../../assets/logos";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import createUserAgent from "../../../utility/userAgent";
import { localizeNumber } from "../../../utility/helpers";
import { useTruncatedUserCoords } from "../../../utility/customHooks";

type Props = {
  +id: ?number,
  +timesSeen: ?number,
  +error: ?string
};

const INatObs = ( {
  id,
  timesSeen,
  error
}: Props ) => {
  const navigation = useNavigation();
  const coords = useTruncatedUserCoords();
  const [nearbySpeciesCount, setNearbySpeciesCount] = useState( null );

  const fetchNearbySpeciesCount = useCallback( () => {
    const params = {
      lat: coords.latitude,
      lng: coords.longitude,
      radius: 50,
      taxon_id: id
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.speciesCounts( params, options ).then( ( { results } ) => {
      setNearbySpeciesCount( results.length > 0 ? results[0].count : 0 );
    } ).catch( () => setNearbySpeciesCount( 0 ) );
  }, [coords, id] );

  useEffect( () => {
    if ( coords && coords.latitude !== null ) {
      fetchNearbySpeciesCount();
    }
  }, [coords, fetchNearbySpeciesCount] );

  const renderObs = () => {
    let obs = null;

    if ( timesSeen && nearbySpeciesCount ) {
      obs = (
        <SpeciesDetailCard text="species_detail.inat_obs">
          <View style={[styles.center, styles.row]}>
            <TouchableOpacity onPress={() => navigation.navigate( "iNatStats" )}>
              <Image source={logos.bird} style={styles.bird} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              {( error !== "location" && coords.latitude ) && (
                <>
                  <Text style={styles.secondHeaderText}>
                    {i18n.t( "species_detail.near" )}
                  </Text>
                  <Text style={styles.number}>
                    {localizeNumber( nearbySpeciesCount )}
                  </Text>
                </>
              )}
              <Text style={[
                styles.secondHeaderText,
                ( !error && coords.latitude ) && styles.margin
              ]}
              >
                {i18n.t( "species_detail.worldwide" )}
              </Text>
              <Text style={styles.number}>
                {localizeNumber( timesSeen )}
              </Text>
            </View>
          </View>
        </SpeciesDetailCard>
      );
    }
    return obs;
  };

  return renderObs();
};

export default INatObs;
