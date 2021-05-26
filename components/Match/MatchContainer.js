// @flow

import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/match/match";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import SpeciesNearby from "./SpeciesNearby";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { renderHeaderText, renderText, setGradients } from "../../utility/matchHelpers";
import { useCommonName } from "../../utility/customHooks";
import { ObservationContext } from "../UserContext";

type Props = {
  setNavigationPath: Function,
  screenType: string,
  scientificNames: boolean
}

const MatchContainer = ( {
  screenType,
  setNavigationPath,
  scientificNames
}: Props ): Node => {
  const { observation } = useContext( ObservationContext );
  const navigation = useNavigation();
  const { taxon } = observation;
  const { seenDate } = taxon;
  const id = taxon && taxon.taxaId ? taxon.taxaId : 0;
  const commonName = useCommonName( id );
  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";
  const showScientificName = !commonName || scientificNames;

  const { gradientLight } = setGradients( screenType );

  const { image } = observation;
  const { taxaId, scientificName, rank } = taxon;

  const taxaInfo = {
    // don't pass taxon data in when user has flagged as misidentification
    commonName: screenType === "unidentified" ? null : commonName,
    taxaId: screenType === "unidentified" ? null : taxaId,
    scientificName: screenType === "unidentified" ? null : scientificName
  };

  const headerText = renderHeaderText( screenType, rank );
  const text = renderText( screenType, seenDate, image );

  const handleGreenButtonPress = () => {
    if ( speciesIdentified ) {
      setNavigationPath( "Species" );
    } else {
      navigation.navigate( "Camera" );
    }
  };

  const setCameraPath = () => setNavigationPath( "Camera" );

  const greenButtonText = speciesIdentified ? "results.view_species" : "results.take_photo";

  const showSpeciesNearby = ( screenType === "commonAncestor" && rank < 60 ) && image.latitude;

  return (
    <View style={styles.marginLarge}>
      <View style={styles.textContainer}>
        <Text style={[styles.headerText, { color: gradientLight }]}>{headerText}</Text>
        {screenType !== "unidentified" && (
          <Text style={[styles.speciesText, showScientificName && styles.scientificName]}>
            {showScientificName ? scientificName : commonName}
          </Text>
        )}
        <Text style={styles.text}>{text}</Text>
        <View style={styles.marginMedium} />
        <GreenButton
          color={gradientLight}
          handlePress={handleGreenButtonPress}
          text={greenButtonText}
        />
      </View>
      <View style={styles.marginMedium} />
      {showSpeciesNearby && (
        <>
          <SpeciesNearby ancestorId={taxaId} image={image} />
          <View style={styles.marginMedium} />
        </>
      )}
      <View style={styles.textContainer}>
        {speciesIdentified && (
          <TouchableOpacity onPress={setCameraPath}>
            <Text style={[styles.linkText, styles.marginMedium]}>{i18n.t( "results.back" )}</Text>
          </TouchableOpacity>
        )}
        <PostToiNat color={gradientLight} taxaInfo={taxaInfo} />
      </View>
    </View>
  );
};

export default MatchContainer;
