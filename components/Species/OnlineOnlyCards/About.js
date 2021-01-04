// @flow
import React, { useContext } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HTML from "react-native-render-html";

import i18n from "../../../i18n";
import { UserContext } from "../../UserContext";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import styles from "../../../styles/species/species";
import { useCommonName } from "../../../utility/customHooks";

type Props = {
  +about: ?string,
  +wikiUrl: ?string,
  +id: ?number,
  +scientificName: string
}

const About = ( {
  about,
  wikiUrl,
  id,
  scientificName
}: Props ) => {
  const navigation = useNavigation();
  const { login } = useContext( UserContext );
  const commonName = useCommonName( id );

  const html = about ? `${about}`.replace( /<b>/g, "" ) : null;

  // hide empty About section
  if ( !about && !login ) {
    return null;
  }

  return (
    <SpeciesDetailCard text="species_detail.about">
      {about && (
        <>
          <HTML
            baseFontStyle={styles.text}
            source={{ html }}
          />
          <Text style={styles.text}>{"\n("}{i18n.t( "species_detail.wikipedia" )}{")"}</Text>
        </>
      )}
      {( login && id !== 43584 ) && (
        <Text
          onPress={() => navigation.navigate( "Wikipedia", { wikiUrl, scientificName } )}
          style={styles.linkText}
        >
          {commonName || scientificName}
        </Text>
      )}
    </SpeciesDetailCard>
  );
};

export default About;
