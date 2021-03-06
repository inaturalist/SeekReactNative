// @flow
import React, { useContext } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HTML from "react-native-render-html";
import type { Node } from "react";

import i18n from "../../../i18n";
import { UserContext } from "../../UserContext";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import { textStyles } from "../../../styles/species/species";
import { useCommonName } from "../../../utility/customHooks";

type Props = {
  +about: ?string,
  +wikiUrl: ?string,
  +id: number,
  +scientificName: ?string
}

const About = ( {
  about,
  wikiUrl,
  id,
  scientificName
}: Props ): Node => {
  const navigation = useNavigation();
  const { login } = useContext( UserContext );
  const commonName = useCommonName( id );

  const html = about ? `${about}`.replace( /<b>/g, "" ) : null;

  const navToWikipediaView = () => navigation.navigate( "Wikipedia", { wikiUrl, scientificName } );

  // hide empty About section
  if ( !about && !login ) {
    return null;
  }

  return (
    <SpeciesDetailCard text="species_detail.about">
      {about && (
        <>
          <HTML
            baseFontStyle={textStyles.text}
            source={{ html }}
          />
          <Text style={textStyles.text}>{"\n("}{i18n.t( "species_detail.wikipedia" )}{")"}</Text>
        </>
      )}
      {( login && id !== 43584 ) && (
        <Text
          onPress={navToWikipediaView}
          style={textStyles.linkText}
        >
          {commonName || scientificName}
        </Text>
      )}
    </SpeciesDetailCard>
  );
};

export default About;
