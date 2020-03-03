// @flow
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

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
import UserContext from "../UserContext";

type Props = {
  +stats: Object,
  +seenDate: ?string,
  +about: ?string,
  +navigation: any,
  +commonName: ?string,
  +wikiUrl: ?string,
  +id:number,
  +region: Object,
  +ancestors: Array<Object>,
  +timesSeen: ?number,
  +observationsByMonth: Array<Object>,
  +fetchiNatData: Function,
  +error: ?string
}

const NoInternetError = ( {
  stats,
  seenDate,
  about,
  error,
  navigation,
  commonName,
  wikiUrl,
  id,
  region,
  ancestors,
  timesSeen,
  fetchiNatData,
  observationsByMonth
}: Props ) => {
  const showGreenButtons = Object.keys( stats ).map( ( stat => stats[stat] ) );

  console.log( about, "about string" );

  return (
    <>
      <View style={styles.secondTextContainer}>
        {showGreenButtons.includes( true ) ? <SpeciesStats stats={stats} /> : null}
        {seenDate ? (
          <View style={[
            styles.row,
            styles.rowMargin,
            showGreenButtons.includes( true ) && styles.marginSmall
          ]}
          >
            <Image source={icons.checklist} style={styles.checkmark} />
            <Text style={styles.text}>{i18n.t( "species_detail.seen_on", { date: seenDate } )}</Text>
          </View>
        ) : null}
        {about ? (
          <UserContext.Consumer>
            {user => (
              <>
                <View style={styles.headerMargins}>
                  <GreenText text="species_detail.about" />
                </View>
                <Text style={styles.text}>{about}</Text>
                {user.login && id !== 43584 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate( "Wikipedia", { wikiUrl } )}
                    style={styles.linkContainer}
                  >
                    <Text style={styles.linkText}>{commonName}</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            ) }
          </UserContext.Consumer>
        ) : null}
      </View>
      {id !== 43584 ? (
        <>
          <View style={styles.secondTextContainer}>
            {error === "location" ? null : (
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
            {observationsByMonth.length > 0
              ? <SpeciesChart data={observationsByMonth} />
              : null}
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

export default withNavigation( NoInternetError );
