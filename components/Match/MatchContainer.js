// @flow

import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/match/match";
import PostToiNat from "./PostToiNat";
import i18n from "../../i18n";
import SpeciesNearby from "./SpeciesNearby";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { renderHeaderText, renderText, setGradients } from "../../utility/matchHelpers";

type Props = {
  params: Object,
  setNavigationPath: Function,
  speciesText: ?string,
  screenType: string
}

const MatchContainer = ( {
  screenType,
  params,
  setNavigationPath,
  speciesText
}: Props ): React.Node => {
  const navigation = useNavigation();
  const { taxon, image, seenDate } = params;
  const speciesIdentified = screenType === "resighted" || screenType === "newSpecies";

  const { gradientLight } = setGradients( screenType );

  const { taxaId, scientificName, rank } = taxon;

  const taxaInfo = {
    // don't pass taxon data in when user has flagged as misidentification
    commonName: screenType === "unidentified" ? null : speciesText,
    taxaId: screenType === "unidentified" ? null : taxaId,
    scientificName: screenType === "unidentified" ? null : scientificName,
    image
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
        {speciesText && <Text style={styles.speciesText}>{speciesText}</Text>}
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
