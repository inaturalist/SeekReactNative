// @flow
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import SpeciesStats from "./SpeciesStats";
import SimilarSpecies from "./SimilarSpecies";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import SpeciesTaxonomy from "./SpeciesTaxonomy";
import INatObs from "./INatObs";
import Padding from "../UIComponents/Padding";
import GreenText from "../UIComponents/GreenText";
import styles from "../../styles/species/species";
import icons from "../../assets/icons";
import i18n from "../../i18n";
import { UserContext } from "../UserContext";

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
  const navigation = useNavigation();
  const showGreenButtons = Object.keys( stats ).map( ( stat => stats[stat] ) );

  return (
    <>
      <View style={styles.secondTextContainer}>
        {showGreenButtons.includes( true ) && <SpeciesStats stats={stats} />}
        {seenDate && (
          <View style={[
            styles.row,
            styles.rowMargin,
            showGreenButtons.includes( true ) && styles.marginSmall
          ]}
          >
            <Image source={icons.checklist} style={styles.checkmark} />
            <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
          </View>
        )}
        {about && (
          <UserContext.Consumer>
            {user => (
              <>
                <View style={styles.headerMargins}>
                  <GreenText text="species_detail.about" />
                </View>
                <Text style={styles.text}>{about}</Text>
                {( user.login && id !== 43584 ) && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate( "Wikipedia", { wikiUrl } )}
                    style={styles.linkContainer}
                  >
                    <Text style={styles.linkText}>{commonName}</Text>
                  </TouchableOpacity>
                )}
              </>
            ) }
          </UserContext.Consumer>
        )}
      </View>
      {id !== 43584 ? (
        <>
          <View style={styles.secondTextContainer}>
            {error !== "location" && (
              <SpeciesMap
                id={id}
                region={region}
                seenDate={seenDate}
              />
            )}
            <SpeciesTaxonomy ancestors={ancestors} />
            <INatObs
              error={error}
              id={id}
              region={region}
              timesSeen={timesSeen}
            />
            {id && <SpeciesChart id={id} />}
          </View>
          <SimilarSpecies
            fetchiNatData={fetchiNatData}
            id={id}
          />
          <View style={styles.bottomPadding} />
        </>
      ) : (
        <View style={styles.secondTextContainer}>
          <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
          <Padding />
        </View>
      )}
    </>
  );
};

export default NoInternetError;
