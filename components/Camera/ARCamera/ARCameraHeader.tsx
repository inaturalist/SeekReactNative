import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/camera/arCameraHeader";
import icons from "../../../assets/icons";
import rankDict from "../../../utility/dictionaries/rankDict";
import { getTaxonCommonName } from "../../../utility/commonNamesHelpers";
import GreenRectangle from "../../UIComponents/GreenRectangle";
import { colors } from "../../../styles/global";
import { useFetchUserSettings } from "../../../utility/customHooks/useFetchUserSettings";
import StyledText from "../../UIComponents/StyledText";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";
import { baseTextStyles } from "../../../styles/textStyles";

interface Prediction {
  name: string;
  taxon_id: number;
  rank_level: number;
  combined_score: number;
  ancestor_ids: number[];
}

interface Props {
  prediction: Prediction;
}

const ARCameraHeader = ( { prediction }: Props ) => {
  const { isLandscape } = useAppOrientation( );
  const rankToRender = prediction?.rank || null;
  const [commonName, setCommonName] = useState<string | void | null>( null );
  const settings = useFetchUserSettings( );
  const scientificNames = settings?.scientificNames;
  const showScientificName = scientificNames || !commonName;

  let id: number | null = null;

  if ( rankToRender && !scientificNames ) {
    id = prediction?.taxon_id;
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

  const scientificName = prediction?.name;
  return (
    <View style={viewStyles.header}>
      {( prediction && rankToRender ) && (
        <View testID="headerPrediction" style={setTaxonomicRankBubbleColor( )}>
          <View style={viewStyles.greenButton}>
            <GreenRectangle
              text={i18n.t( rankDict[rankToRender] )}
              letterSpacing={0.94}
              color={isLandscape ? colors.white : colors.seekGreen}
              textColor={setTaxonomicRankColor( )}
            />
          </View>
          <StyledText style={[baseTextStyles.prediction, textStyles.predictions, showScientificName && baseTextStyles.boldItalic]}>
            {showScientificName ? scientificName : commonName}
          </StyledText>
          <View style={[viewStyles.row, viewStyles.center]}>
            {isLandscape ? showLandscapeModeDots( ) : showPortraitModeDots( )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ARCameraHeader;
