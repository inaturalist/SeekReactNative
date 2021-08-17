// @flow

import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import type { Node } from "react";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/camera/arCameraHeader";
import icons from "../../../assets/icons";
import rankDict from "../../../utility/dictionaries/rankDict";
import { getTaxonCommonName } from "../../../utility/commonNamesHelpers";
import GreenRectangle from "../../UIComponents/GreenRectangle";
import { colors } from "../../../styles/global";
import { useFetchUserSettings } from "../../../utility/customHooks";
import { AppOrientationContext } from "../../UserContext";

type Props = {
  +ranks: Object
}

const ARCameraHeader = ( { ranks }: Props ): Node => {
  const { isLandscape } = useContext( AppOrientationContext );
  const rankToRender = Object.keys( ranks )[0] || null;
  const [commonName, setCommonName] = useState( null );
  const { scientificNames } = useFetchUserSettings( );
  const showScientificName = scientificNames || !commonName;

  let id = null;

  if ( rankToRender && !scientificNames ) {
    id = ranks[rankToRender][0].taxon_id;
  } else {
    id = null;
  }

  const rankList = ["kingdom", "phylum", "class", "order", "family", "genus", "species"];

  useEffect( () => {
    if ( id ) { // only update when id changes to avoid camera stutter on Android
      getTaxonCommonName( id ).then( ( name ) => {
        setCommonName( name );
      } );
    }
  }, [id] );

  const showPortraitModeDots = ( ) => {
    return (
      <View style={viewStyles.portraitDotsRow}>
        {rankList.map( ( rank, index ) => (
          <Image
            key={rank}
            source={rankToRender && rankList.includes( rankToRender, index )
              ? icons.greenDot
              : icons.whiteDot}
          />
        ) )}
      </View>
    );
  };

  const showLandscapeModeDots = ( ) => rankList.map( ( rank, index ) => (
    <View
      key={rank}
      style={[
      rankToRender && rankList.includes( rankToRender, index )
        ? viewStyles.landscapeDots
        : viewStyles.landscapeDotsGreen,
      index === 0 && viewStyles.noLeftMargin,
      index === 6 && viewStyles.noRightMargin
    ]}
    />
  ) );

  const setTaxonomicRankColor = ( ) => {
    if ( isLandscape ) {
      if ( rankToRender === "species" ) {
        return colors.seekGreen;
      } else {
        return colors.seekForestGreen;
      }
    }
    return null;
  };

  const setTaxonomicRankBubbleColor = ( ) => {
    if ( isLandscape ) {
      if ( rankToRender === "species" ) {
        return [viewStyles.landscapeHeader, viewStyles.landscapeHeaderSpecies];
      } else {
        return viewStyles.landscapeHeader;
      }
    }
    return null;
  };

  return (
    <View style={viewStyles.header}>
      {( ranks && rankToRender ) && (
        <View style={setTaxonomicRankBubbleColor( )}>
          <View style={viewStyles.greenButton}>
            <GreenRectangle
              text={i18n.t( rankDict[rankToRender] )}
              letterSpacing={0.94}
              color={isLandscape ? colors.white : colors.seekGreen}
              textColor={setTaxonomicRankColor( )}
            />
          </View>
          <Text style={[textStyles.predictions, showScientificName && textStyles.scientificName]}>
            {showScientificName ? ranks[rankToRender][0].name : commonName}
          </Text>
          <View style={[viewStyles.row, viewStyles.center]}>
            {isLandscape ? showLandscapeModeDots( ) : showPortraitModeDots( )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ARCameraHeader;
