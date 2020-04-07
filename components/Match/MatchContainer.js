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

  let headerText;
  let text;
  let speciesText;

  const ancestorRank = {
    20: "genus",
    30: "family",
    40: "order",
    50: "class"
  };

  if ( seenDate ) {
    headerText = i18n.t( "results.resighted" ).toLocaleUpperCase();
    text = i18n.t( "results.date_observed", { seenDate } );
    speciesText = taxaName;
  } else if ( taxaName && match ) {
    headerText = i18n.t( "results.observed_species" ).toLocaleUpperCase();
    text = ( image.latitude && image.longitude ) ? i18n.t( "results.learn_more" ) : i18n.t( "results.learn_more_no_location" );
    speciesText = taxaName;
  } else if ( commonAncestor ) {
    headerText = i18n.t( "results.believe" ).toLocaleUpperCase();
    if ( rank === 20 ) {
      headerText += ` ${i18n.t( `results.${ancestorRank[rank]}` ).toLocaleUpperCase()}`;
    } else if ( rank <= 30 ) {
      headerText += ` ${i18n.t( `results.${ancestorRank[30]}` ).toLocaleUpperCase()}`;
    } else if ( rank <= 40 ) {
      headerText += ` ${i18n.t( `results.${ancestorRank[40]}` ).toLocaleUpperCase()}`;
    } else if ( rank <= 50 ) {
      headerText += ` ${i18n.t( `results.${ancestorRank[50]}` ).toLocaleUpperCase()}`;
    }
    text = i18n.t( "results.common_ancestor" );
    speciesText = commonAncestor;
  } else {
    headerText = i18n.t( "results.no_identification" ).toLocaleUpperCase();
    text = i18n.t( "results.sorry" );
  }

  return (
    <>
      <View style={styles.marginLarge} />
      <View style={styles.textContainer}>
        <Text style={[styles.headerText, { color: gradientColorLight }]}>{headerText}</Text>
        {speciesText && <Text style={styles.speciesText}>{speciesText}</Text>}
        <Text style={styles.text}>{text}</Text>
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
  );
};

export default MatchContainer;
