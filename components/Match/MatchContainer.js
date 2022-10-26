// @flow

import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/match/match";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import SpeciesNearby from "./SpeciesNearby";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { renderHeaderText, renderText, setGradients } from "../../utility/matchHelpers";
import { useCommonName } from "../../utility/customHooks";
import { AppOrientationContext, ObservationContext } from "../UserContext";
import StyledText from "../UIComponents/StyledText";

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
  const { isLandscape } = useContext( AppOrientationContext );
  const { observation } = useContext( ObservationContext );
  const navigation = useNavigation();
  const taxon = observation && observation.taxon;
  const seenDate = taxon && taxon.seenDate;
  const id = taxon && taxon.taxaId ? taxon.taxaId : 0;
  const commonName = useCommonName( id );
  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";
  const showScientificName = !commonName || scientificNames;

  const { gradientLight } = setGradients( screenType );

  // android crashes a lot when using object destructuring
  const image = observation && observation.image;
  const taxaId = taxon && taxon.taxaId;
  const scientificName = taxon && taxon.scientificName;
  const rank = taxon && taxon.rank;

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

  const showSpeciesNearby = ( screenType === "commonAncestor" && rank < 60 ) && ( image && image.latitude );

  return (
    <View style={[styles.marginLarge, isLandscape && styles.marginLandscape]}>
      <View style={styles.textContainer}>
        <StyledText style={[styles.headerText, { color: gradientLight }]}>{headerText}</StyledText>
        {screenType !== "unidentified" && (
          <StyledText style={[styles.speciesText, showScientificName && styles.scientificName]}>
            {showScientificName ? scientificName : commonName}
          </StyledText>
        )}
        <StyledText style={styles.text}>{text}</StyledText>
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
            <StyledText style={[styles.linkText, styles.marginMedium]}>{i18n.t( "results.back" )}</StyledText>
          </TouchableOpacity>
        )}
        <PostToiNat color={gradientLight} taxaInfo={taxaInfo} />
      </View>
    </View>
  );
};

export default MatchContainer;
