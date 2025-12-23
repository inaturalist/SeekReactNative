import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import inatjs from "inaturalistjs";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../../styles/species/iNatObs";
import logos from "../../../assets/logos";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import { localizeNumber } from "../../../utility/helpers";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  readonly id: number | null;
  readonly timesSeen: number | null;
  readonly region: {
    latitude: number;
    longitude: number;
  };
}

const INatObs = ( { id, timesSeen, region }: Props ) => {
  const navigation = useNavigation();
  const [nearbySpeciesCount, setNearbySpeciesCount] = useState( null );

  useEffect( () => {
    let isFocused = true;

    const fetchNearbySpeciesCount = () => {
      const params = {
        lat: region.latitude,
        lng: region.longitude,
        radius: 50,
        taxon_id: id,
      };

      // TODO: iNat API TS ?
      inatjs.observations.speciesCounts( params ).then( ( { results } ) => {
        if ( isFocused ) {
          setNearbySpeciesCount( results.length > 0 ? results[0].count : 0 );
        }
      } ).catch( () => {
        if ( isFocused ) {
          setNearbySpeciesCount( 0 );
        }
      } );
    };

    if ( region && region.latitude !== null ) {
      fetchNearbySpeciesCount();
    }
    return () => { isFocused = false; };
  }, [region, id] );

  // TODO: navigation TS
  const navToINatStats = () => navigation.navigate( "iNatStats" );

  const renderObs = () => {
    let obs = null;

    if ( timesSeen && nearbySpeciesCount ) {
      obs = (
        <SpeciesDetailCard text="species_detail.inat_obs">
          <View style={[viewStyles.center, viewStyles.row]}>
            <TouchableOpacity onPress={navToINatStats}>
              <Image source={logos.bird} style={imageStyles.bird} />
            </TouchableOpacity>
            <View style={viewStyles.textContainer}>
              {region.latitude && (
                <>
                  <StyledText style={baseTextStyles.emptyState}>
                    {i18n.t( "species_detail.near" )}
                  </StyledText>
                  <StyledText style={[baseTextStyles.number, textStyles.number]}>
                    {localizeNumber( nearbySpeciesCount )}
                  </StyledText>
                </>
              )}
              <StyledText style={[
                baseTextStyles.emptyState,
                region.latitude && viewStyles.margin,
              ]}
              >
                {i18n.t( "species_detail.worldwide" )}
              </StyledText>
              <StyledText style={[baseTextStyles.number, textStyles.number]}>
                {localizeNumber( timesSeen )}
              </StyledText>
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
