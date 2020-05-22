// @flow
import React, { useContext } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { UserContext } from "../../UserContext";
import SpeciesDetailCard from "../../UIComponents/SpeciesDetailCard";
import styles from "../../../styles/species/species";

type Props = {
  +about: ?string,
  +commonName: ?string,
  +wikiUrl: ?string,
  +id: ?number
}

const About = ( {
  about,
  commonName,
  wikiUrl,
  id
}: Props ) => {
  const navigation = useNavigation();
  const { login } = useContext( UserContext );

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
