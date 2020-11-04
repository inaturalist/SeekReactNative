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
import SocialSharing from "./SocialSharing";

type Props = {
  image: Object,
  taxon: Object,
  seenDate: ?string,
  match: boolean,
  setNavigationPath: Function,
  gradientLight: string,
  speciesText: ?string
}

const MatchContainer = ( {
  taxon,
  seenDate,
  match,
  setNavigationPath,
  gradientLight,
  image,
  speciesText
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

  const renderHeaderText = () => {
    let headerText;

    if ( seenDate ) {
      headerText = "results.resighted";
    } else if ( taxaName && match ) {
      headerText = "results.observed_species";
    } else if ( commonAncestor ) {
      if ( rank === 20 ) {
        headerText = "results.genus";
      } else if ( rank <= 30 ) {
        headerText = "results.family";
      } else if ( rank <= 40 ) {
        headerText = "results.order";
      } else if ( rank <= 50 ) {
        headerText = "results.class";
      } else {
        headerText = "results.believe";
      }
    } else {
      headerText = "results.no_identification";
    }
    return i18n.t( headerText ).toLocaleUpperCase();
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
    <View style={styles.marginLarge}>
      <View style={styles.textContainer}>
        <Text style={[styles.headerText, { color: gradientLight }]}>{renderHeaderText()}</Text>
        {speciesText && <Text style={styles.speciesText}>{speciesText}</Text>}
        <Text style={styles.text}>{renderText()}</Text>
        <View style={styles.marginMedium} />
        <GreenButton
          color={gradientLight}
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
      {/* experimenting with social sharing button */}
      <View style={styles.marginMedium} />
      <View style={styles.textContainer}>
        <SocialSharing
          image={image}
          gradientLight={gradientLight}
        />
      </View>
       {/* end experiment */}
      <View style={styles.marginMedium} />
      {( commonAncestor && rank < 60 ) && (
        <>
          <SpeciesNearby ancestorId={taxaId} image={image} />
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
          color={gradientLight}
          taxaInfo={{
            preferredCommonName: taxaName || commonAncestor,
            taxaId,
            scientificName,
            image
          }}
        />
      </View>
    </View>
  );
};

export default MatchContainer;
