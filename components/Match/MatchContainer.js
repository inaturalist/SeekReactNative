// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/match/match";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import SpeciesNearby from "./SpeciesNearby";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { ScientificNamesContext } from "../UserContext";

type Props = {
  image: Object,
  taxon: Object,
  userImage: string,
  seenDate: ?string,
  match: boolean,
  setNavigationPath: Function,
  gradientColorLight: string
}

const MatchContainer = ( {
  taxon,
  seenDate,
  match,
  setNavigationPath,
  gradientColorLight,
  image,
  userImage
}: Props ) => {
  const navigation = useNavigation();
  const speciesIdentified = seenDate || match;

  const {
    taxaName,
    taxaId,
    scientificName,
    commonAncestor,
    rank
  } = taxon;

  const ancestorRank = {
    20: "genus",
    30: "family",
    40: "order",
    50: "class"
  };

  const renderSpeciesText = ( { scientificNames } ) => {
    let speciesText;

    if ( seenDate ) {
      speciesText = !scientificNames ? taxaName : scientificName;
    } else if ( taxaName && match ) {
      speciesText = !scientificNames ? taxaName : scientificName;
    } else if ( commonAncestor ) {
      speciesText = !scientificNames ? commonAncestor : scientificName;
    }

    return speciesText;
  };

  const renderHeaderText = () => {
    let headerText;

    if ( seenDate ) {
      headerText = i18n.t( "results.resighted" );
    } else if ( taxaName && match ) {
      headerText = i18n.t( "results.observed_species" );
    } else if ( commonAncestor ) {
      headerText = i18n.t( "results.believe" );
      if ( rank === 20 ) {
        headerText += ` ${i18n.t( `results.${ancestorRank[rank]}` )}`;
      } else if ( rank <= 30 ) {
        headerText += ` ${i18n.t( `results.${ancestorRank[30]}` )}`;
      } else if ( rank <= 40 ) {
        headerText += ` ${i18n.t( `results.${ancestorRank[40]}` )}`;
      } else if ( rank <= 50 ) {
        headerText += ` ${i18n.t( `results.${ancestorRank[50]}` )}`;
      }
    } else {
      headerText = i18n.t( "results.no_identification" );
    }
    return headerText.toLocaleUpperCase();
  };

  const renderText = () => {
    let text;

    if ( seenDate ) {
      text = i18n.t( "results.date_observed", { seenDate } );
    } else if ( taxaName && match ) {
      text = ( image.latitude ) ? i18n.t( "results.learn_more" ) : i18n.t( "results.learn_more_no_location" );
    } else if ( commonAncestor ) {
      text = i18n.t( "results.common_ancestor" );
    } else {
      text = i18n.t( "results.sorry" );
    }

    return text;
  };

  return (
    <ScientificNamesContext.Consumer>
      {names => (
        <>
          <View style={styles.marginLarge} />
          <View style={styles.textContainer}>
            <Text style={[styles.headerText, { color: gradientColorLight }]}>
              {renderHeaderText()}
            </Text>
            {( renderSpeciesText( names ) )
              && <Text style={styles.speciesText}>{renderSpeciesText( names )}</Text>}
            <Text style={styles.text}>{renderText()}</Text>
          </View>
          <View style={styles.marginMedium} />
          <View style={styles.textContainer}>
            <GreenButton
              color={gradientColorLight}
              handlePress={() => {
                if ( speciesIdentified ) {
                  setNavigationPath( "Species" );
                } else {
                  navigation.navigate( "Camera" );
                }
              }}
              text={speciesIdentified ? "results.view_species" : "results.take_photo"}
            />
          </View>
          <View style={styles.marginMedium} />
          {( commonAncestor && rank !== ( 60 || 70 ) ) && (
            <>
              <SpeciesNearby
                ancestorId={taxaId}
                lat={image.latitude}
                lng={image.longitude}
              />
              <View style={styles.marginMedium} />
            </>
          )}
          <View style={styles.textContainer}>
            {speciesIdentified && (
              <TouchableOpacity
                onPress={() => setNavigationPath( "Camera" )}
                style={styles.link}
              >
                <Text style={[styles.linkText, styles.marginMedium]}>{i18n.t( "results.back" )}</Text>
              </TouchableOpacity>
            )}
            <PostToiNat
              color={gradientColorLight}
              taxaInfo={{
                preferredCommonName: taxaName || commonAncestor,
                taxaId,
                userImage,
                scientificName,
                image
              }}
            />
          </View>
        </>
      ) }
    </ScientificNamesContext.Consumer>
  );
};

export default MatchContainer;
