import React, { useCallback } from "react";
import { FlatList } from "react-native";

import styles from "../../../styles/uiComponents/speciesNearby/speciesNearbyList";
import SpeciesImageCell from "./SpeciesImageCell";
import EmptyList from "./EmptyList";
import SpeciesObservedCell from "./SpeciesObservedCell";

interface Taxon {
  taxon: {
    id: number;
    name: string;
    iconicTaxonId: number;
  };
  id: number;
  name: string;
  iconic_taxon_id: number;
  default_photo: {
    medium_url: string;
    license_code: string;
  };
  taxonPhotos: {
    photo: {
      medium_url: string;
      license_code: string;
    };
  }[];
  taxon_photos: {
    photo: {
      medium_url: string;
      license_code: string;
    };
  }[];
}
interface Props {
  taxa: Taxon[];
  observed?: boolean;
}

const SpeciesNearbyList = ( { taxa, observed }: Props ): Node => {
  const getItemLayout = useCallback( ( data: any, index: number ) => (
    // skips measurement of dynamic content for faster loading
    {
      length: ( 28 + 108 ),
      offset: ( 28 + 108 ) * index,
      index
    }
  ), [] );

  const extractKey = useCallback( ( taxon: Taxon, i: number ) => observed ? `observed-${i}` : `species-${taxon.id}`, [observed] );

  const renderEmptyList = useCallback( () => <EmptyList />, [] );

  const renderSpecies = useCallback( ( { item }: { item: Taxon } ) => {
    if ( observed ) {
      return <SpeciesObservedCell item={item} />;
    }
    return <SpeciesImageCell item={item} />;
  }, [observed] );

  return (
    <FlatList
      testID="species-nearby-list"
      alwaysBounceHorizontal
      bounces={taxa.length > 0}
      contentContainerStyle={taxa.length > 0 && styles.taxonList}
      data={taxa}
      getItemLayout={getItemLayout}
      horizontal
      initialNumToRender={3}
      keyExtractor={extractKey}
      ListEmptyComponent={renderEmptyList}
      renderItem={renderSpecies}
    />
  );
};

export default SpeciesNearbyList;
