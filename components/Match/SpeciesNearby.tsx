import React, { useState, useEffect } from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/match/speciesNearby";
import SpeciesNearbyList from "../UIComponents/SpeciesNearby/SpeciesNearbyList";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";
import TapToLoad from "../UIComponents/SpeciesNearby/TapToLoad";
import { fetchSpeciesNearby } from "../../utility/apiCalls";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly ancestorId: number | null | undefined;
  readonly image: {
    latitude: number;
    longitude: number;
  };
}

const SpeciesNearbyMatch = ( { ancestorId, image }: Props ) => {
  const [taxa, setTaxa] = useState( [] );
  const [loading, setLoading] = useState( false );
  const [loaded, setLoaded] = useState( false );

  useEffect( ( ) => {
    const params = {
      lat: image.latitude,
      lng: image.longitude,
      taxon_id: ancestorId
    };

    const fetchTaxa = async ( ) => {
      const results = await fetchSpeciesNearby( params );
      setTaxa( results );
      setLoaded( true );
    };

    if ( loading ) {
      fetchTaxa( );
    }
  }, [loading, image, ancestorId] );

  const startLoading = ( ) => setLoading( true );

  const renderSpecies = ( ) => {
    if ( loaded ) {
      return (
        <View style={[viewStyles.speciesNearbyContainer, viewStyles.center]}>
          <SpeciesNearbyList taxa={taxa} />
        </View>
      );
    } else if ( loading ) {
      return (
        <View style={[viewStyles.speciesNearbyContainer, viewStyles.center]}>
          <LoadingWheel color={colors.white} />
        </View>
      );
    }
    return <TapToLoad handlePress={startLoading} />;
  };

  return (
    <>
      <StyledText style={[baseTextStyles.highlightTeal, textStyles.headerText]}>
        {i18n.t( "results.nearby" ).toLocaleUpperCase( )}
      </StyledText>
      {renderSpecies( )}
    </>
  );
};

export default SpeciesNearbyMatch;
