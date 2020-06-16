// @flow
import React, { useContext } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../UserContext";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import styles from "../../../styles/species/species";
import { useCommonName } from "../../../utility/customHooks";

type Props = {
  +about: ?string,
  +wikiUrl: ?string,
  +id: ?number
}

const About = ( {
  about,
  wikiUrl,
  id
}: Props ) => {
  const navigation = useNavigation();
  const { login } = useContext( UserContext );
  const commonName = useCommonName( id );

  return (
    <SpeciesDetailCard text="species_detail.about">
      <Text style={styles.text}>{about}</Text>
      {( login && id !== 43584 ) && (
        <Text
          onPress={() => navigation.navigate( "Wikipedia", { wikiUrl } )}
          style={styles.linkText}
        >
          {commonName}
        </Text>
      )}
    </SpeciesDetailCard>
  );
};

export default About;
