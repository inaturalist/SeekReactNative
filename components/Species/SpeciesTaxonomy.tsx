import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";

import { capitalizeNames } from "../../utility/helpers";
import { getTaxonCommonName } from "../../utility/commonNamesHelpers";
import { viewStyles, textStyles } from "../../styles/species/speciesTaxonomy";
import icons from "../../assets/icons";
import SpeciesDetailCard from "../UIComponents/SpeciesDetailCard";
import i18n from "../../i18n";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Taxon {
  rank: string;
  name: string;
  preferred_common_name: string | void | null;
}
interface Props {
  readonly ancestors?: Taxon[];
  readonly predictions: {
    taxon_id: number;
    rank: number;
    name: string;
  }[];
  readonly id: number;
}

const SpeciesTaxonomy = ( { ancestors, predictions, id }: Props ) => {
  const [taxonomyList, setTaxonomyList] = useState<Taxon[]>( [] );

  let marginLeft = 0;

  useEffect( ( ) => {
    const rankNames = ["kingdom", "phylum", "class", "order", "family", "genus", "species"];
    let ranks = [70, 60, 50, 40, 30, 20, 10];

    const createAncestors = ( ) => {
      const predictionAncestors: Promise<Taxon>[] = [];

      if ( !predictions ) {
        return;
      }

      predictions.forEach( ( ancestor ) => {
        if ( !ranks.includes( ancestor.rank ) ) {
          return;
        }

        predictionAncestors.push(
          getTaxonCommonName( ancestor.taxon_id )
            .then( ( name ) => {
              const rankIndex = ranks.indexOf( ancestor.rank );

              const taxon = {
                rank: rankNames[rankIndex],
                name: ancestor.name,
                preferred_common_name: name
              };

              return taxon;
            } )
        );
      } );

      Promise.all( predictionAncestors ).then( ( result ) => {
        setTaxonomyList( result );
      } );
    };

    if ( predictions && predictions.length > 0 ) {
      createAncestors( );
    }
  }, [predictions] );

  useEffect( ( ) => {
    if ( ( ancestors && ancestors.length > 0 ) ) {
      const species = ancestors.filter( ( a ) => a.rank === "species" );
      getTaxonCommonName( id ).then( ( name ) => {
        species[0].preferred_common_name = name || null;
        setTaxonomyList( ancestors );
      } );
    }
  }, [ancestors, id] );

  return (
    <SpeciesDetailCard text="species_detail.taxonomy" hide={taxonomyList.length === 0}>
      {taxonomyList.length > 0 && taxonomyList.map( ( ancestor, index ) => {
        marginLeft += 15;

        return (
          <View
            key={`taxon-${ancestor.rank}`}
            style={[{ marginLeft }, viewStyles.row, index !== 0 && viewStyles.marginTop]}
          >
            <Image source={icons.greenDot} style={viewStyles.bullet} />
            <View>
              <StyledText style={[
                baseTextStyles.bodyBold,
                ancestor.rank === "species" && baseTextStyles.boldItalic
              ]}>
                {ancestor.rank !== "species" && `${capitalizeNames( i18n.t( `camera.${ancestor.rank}` ) ) || ""} `}
                {ancestor.name}
              </StyledText>
              <StyledText style={[
                baseTextStyles.body,
                textStyles.taxonomyText,
                !ancestor.preferred_common_name && baseTextStyles.italic
              ]}>
                {ancestor.preferred_common_name
                  ? capitalizeNames( ancestor.preferred_common_name )
                  : ancestor.name}
              </StyledText>
            </View>
          </View>
        );
      } )}
    </SpeciesDetailCard>
  );
};

export default SpeciesTaxonomy;
