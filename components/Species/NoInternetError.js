// @flow
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

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

type Props = {
  +stats: Array,
  +seenDate: Date,
  +about: string,
  +isLoggedIn: boolean,
  +navigation: any,
  +commonName: string,
  +wikiUrl: string,
  +id: Number,
  +region: Object,
  +ancestors: Array,
  +timesSeen: Number,
  +observationsByMonth: Array,
  +fetchiNatData: Function
}

const NoInternetError = ( {
  stats,
  seenDate,
  about,
  isLoggedIn,
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

  return (
    <React.Fragment>
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
          <View>
            <View style={styles.headerMargins}>
              <GreenText text={i18n.t( "species_detail.about" ).toLocaleUpperCase()} />
            </View>
            <Text style={styles.text}>{about}</Text>
            {isLoggedIn ? (
              <TouchableOpacity
                onPress={() => navigation.navigate( "Wikipedia", { wikiUrl } )}
                style={styles.linkContainer}
              >
                <Text style={styles.linkText}>{commonName}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        {id !== 43584 ? (
          <View>
            <SpeciesMap
              id={id}
              isLoggedIn={isLoggedIn}
              navigation={navigation}
              region={region}
              seenDate={seenDate}
            />
            <SpeciesTaxonomy ancestors={ancestors} />
            <INatObs
              id={id}
              navigation={navigation}
              region={region}
              timesSeen={timesSeen}
            />
            {observationsByMonth.length > 0
              ? <SpeciesChart data={observationsByMonth} />
              : null}
          </View>
        ) : null}
        {id === 43584 ? (
          <View>
            <Text style={styles.humanText}>{i18n.t( "species_detail.you" )}</Text>
            <Padding />
          </View>
        ) : null}
      </View>
      {id !== 43584 ? (
        <View>
          <SimilarSpecies
            fetchiNatData={fetchiNatData}
            id={id}
          />
          <View style={styles.bottomPadding} />
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default NoInternetError;
