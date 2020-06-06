// @flow
import React from "react";
import { View, Text } from "react-native";

import SpeciesStats from "./SpeciesStats";
import SimilarSpecies from "./SimilarSpecies";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import INatObs from "./INatObs";
import Padding from "../../UIComponents/Padding";
import styles from "../../../styles/species/species";
import i18n from "../../../i18n";
import About from "./About";
import SeenDate from "./SeenDate";

type Props = {
  +stats: Object,
  +seenDate: ?string,
  +about: ?string,
  +commonName: ?string,
  +wikiUrl: ?string,
  +id: ?number,
  +region: Object,
  +ancestors: Array<Object>,
  +timesSeen: ?number,
  +fetchiNatData: Function,
  +error: ?string
}

const NoInternetError = ( {
  stats,
  seenDate,
  about,
  error,
  commonName,
  wikiUrl,
  id,
  region,
  ancestors,
  timesSeen,
  fetchiNatData
}: Props ) => {
  const showGreenButtons = Object.keys( stats ).map( ( stat => stats[stat] ) ).includes( true );

  return (
    <View style={styles.background}>
      {showGreenButtons && <SpeciesStats stats={stats} />}
      {seenDate && (
        <SeenDate
          showGreenButtons={showGreenButtons}
          seenDate={seenDate}
        />
      )}
      <About
        about={about}
        commonName={commonName}
        wikiUrl={wikiUrl}
        id={id}
      />
      {id !== 43584 ? (
        <>
          <SpeciesMap
            id={id}
            region={region}
            seenDate={seenDate}
          />
          <SpeciesTaxonomy ancestors={ancestors} />
          <INatObs
            error={error}
            id={id}
            region={region}
            timesSeen={timesSeen}
          />
          <SpeciesChart id={id} />
          <SimilarSpecies
            fetchiNatData={fetchiNatData}
            id={id}
          />
        </>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
          <Padding />
        </View>
      )}
    </View>
  );
};

export default NoInternetError;
